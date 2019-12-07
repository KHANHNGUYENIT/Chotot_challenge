const constants = require('../../constants/common');
const https = require('https');
const CATEGORY = 5000;
const LIMIT = 20;
const OFSET = 0;
const DISTANCE = 10; //default 10km

exports.item = (req, res, next) => {
  let cg = req.param('cg') || CATEGORY;
  let limit = req.param('limit') || LIMIT;
  let ofset = req.param('o') || OFSET;
  let distance = req.param('distance') || DISTANCE;
  let sort_distance= req.param('sort') || false;
  let keyword = req.param('keysearch');
  if(keyword) {
    keyword='&q='+ encodeURIComponent(keyword);
  }
  else keyword='';

  let options = {
    host: constants.API_HOST,
    path: '/v1/public/ad-listing?app_id=android&cg=' + cg + '&limit=' + limit + '&o=' + ofset+keyword,
    port: 443,
    method: 'GET'
  }

  let request = https.request(options, function (response) {
    let body = ""
    response.on('data', function (data) {
      body += data;
    });
    response.on('end', function () {
      let parseBody=JSON.parse(body);
      if(parseBody.ads.length > 0) {
        parseBody.ads.forEach((item)=>{
          item.distance = (Math.random() * distance).toFixed(1);
        })
      }
      if(Boolean(sort_distance)) {
        parseBody.ads.sort((a,b)=>{
          return  a.distance>b.distance;
        })
      }
      res.send(parseBody);
    });
  });
  request.on('error', function (e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
}

exports.item_detail = (req, res, next) => {
  let ad_list_id = req.param('list_id');
  let options = {
    host: constants.API_HOST,
    path: '/v1/public/ad-listing/'+ad_list_id+'?app_id=android',
    port: 443,
    method: 'GET'
  }
  let request = https.request(options, function (response) {
    let body = ""
    response.on('data', function (data) {
      body += data;
    });
    response.on('end', function () {
      let parseBody=JSON.parse(body);
      res.send(parseBody);
    });
  });
  request.on('error', function (e) {
    console.log('Problem with request: ' + e.message);
  });
  request.end();
}