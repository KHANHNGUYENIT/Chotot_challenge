const constants = require('../../constants/common');
const https = require('https');
const LIMIT = 20;
const OFFSET = 0;
const DISTANCE = 10; //default 10km

exports.item = (req, res, next) => {
  let cg = req.param('cg');
  let limit = req.param('limit') || LIMIT;
  let offset = req.param('o') || OFFSET;
  let distance = req.param('distance') || DISTANCE;
  let sort_distance= req.param('sort') || false;
  let keyword = req.param('keysearch');
  let is_shop = req.param('is_shop');

  if(is_shop){
    is_shop = '&f=c';
  }
  else is_shop = ''
  if(cg)
    cg = '&cg='+cg;
  else
    cg = '';
  if(keyword) {
    keyword='&q='+ encodeURIComponent(keyword);
  }
  else keyword='';

  let options = {
    host: constants.API_HOST,
    path: '/v1/public/ad-listing?app_id=android'+ cg + '&limit=' + limit + '&o=' + offset+keyword+is_shop,
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
      let check_tag= cg.includes('&cg=5') || false;
      if(parseBody.ads.length > 0) {
        parseBody.ads.forEach((item)=>{
          if(check_tag) // chi do dien tu
            item.tag_rate_New ='Mới ' + ((Math.random() *6) +4).toFixed(0) +'0%'
          item.distance = (Math.random() * distance).toFixed(1);
        })
      }
      if(Boolean(sort_distance)) {
        parseBody.ads= parseBody.ads.sort(function(a,b){
          return  (a.distance> b.distance)?1:(a.distance < b.distance)?-1:0;
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