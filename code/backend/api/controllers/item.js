const constants = require('../../constants/common');
const https = require('https');
const CATEGORY = 5000;
const LIMIT = 20;
const OFSET = 0;
const DISTANCE = 10; //default 10km

exports.item = (req, res, next) => {
  var cg = req.param('cg') || CATEGORY;
  var limit = req.param('limit') || CATEGORY;
  var ofset = req.param('o') || OFSET;
  var distance = req.param('distance') || DISTANCE;

  var options = {
    host: constants.API_HOST,
    path: '/v1/public/ad-listing?app_id=android&cg=' + cg + '&limit=' + limit + '&o=' + ofset,
    port: 443,
    method: 'GET'
  }

  var request = https.request(options, function (response) {
    var body = ""
    response.on('data', function (data) {
      body += data;
    });
    response.on('end', function () {
      var parseBody=JSON.parse(body);
      if(parseBody.ads.length > 0) {
        parseBody.ads.forEach((item)=>{
          item.distance = (Math.random() * distance).toFixed(1);
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