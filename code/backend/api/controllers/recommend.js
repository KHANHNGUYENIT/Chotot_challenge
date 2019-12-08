const constants = require('../../constants/common');
const https = require('https');
const http = require('http');

exports.detail = (req, res, next) => {
    let userId = req.param('user_id');
    let jsonData = {
        ads: []
    };
    if (userId) {
        var request = require("request");
        var options = {
            method: 'POST',
            url: 'http://118.69.225.72:27017/recommend',
            headers:
            {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: { userID: userId },
            json: true
        };

        request(options, function (error, response, parseBody) {
            if (error) throw new Error(error);
            if (parseBody.recommended_items.length > 0) {
                getListDetailByListIdAds(parseBody.recommended_items).then(temp_ads => {
                    if (temp_ads)
                        jsonData.ads = temp_ads;
                    if (jsonData.ads.length > 0) {
                        jsonData.ads.forEach((item) => {
                            if (item.cateogry.toString()[0] == '5') // chi do dien tu
                                item.tag_rate_New = 'Mới ' + ((Math.random() * 6) + 4).toFixed(0) + '0%'
                            item.distance = (Math.random() * distance).toFixed(1);
                        })
                    }
                    res.send(jsonData);
                }).catch(error => {
                    console.log(error); // Error: Oh dear! It's broken!
                    res.send(jsonData);
                });
            }

        });

    }
    else
        res.send(jsonData);
}

async function getListDetailByListIdAds(list_ads_id) {
    let result = [];
    let count = 5;
    async function run() {
        list_ads_id.forEach((ads_id) => {
            if (count > 0) {
               await getDatabyAdsListId(ads_id, function (tempAds) {
                    if (tempAds.message) {
                        count = count--;
                        result.push(tempAds);
                    }
                });
            }
        });
    }
    await run();
    return result
}

async function getDatabyAdsListId(ad_list_id, callback) {
    if (ad_list_id == undefined || ad_list_id == null)
        return null;

    let options = {
        host: constants.API_HOST,
        path: '/v1/public/ad-listing/' + ad_list_id + '?app_id=android',
        port: 443,
        method: 'GET'
    }

    let request = https.request(options, function (response) {
        let body = ""
        response.on('data', function (data) {
            body += data;
        });
        response.on('end', function () {
            let parseBody = JSON.parse(body);
            callback(parseBody)
        });
    });
    request.on('error', function (e) {
        console.log('Problem with request ad_list_id= ' + ad_list_id + ' error:' + e.message);
    });
    request.end();
}
