const https = require('https');
const hostName='gateway.chotot.com';
const postApi = 443;
exports.item = (req, res, next)=>{
    var options = {
        host : process.env.API_HOST || hostName ,
        path : '/v1/public/ad-listing?app_id=android&cg=5000&limit=20&o=0',
        port : process.env.API_PORT ||postApi,
        method : 'GET'
      }
    
      var request = https.request(options, function(response){
        var body = ""
        response.on('data', function(data) {
          body += data;
        });
        response.on('end', function() {
          res.send(JSON.parse(body));
          console.log(body);
        });
      });
      request.on('error', function(e) {
        console.log('Problem with request: ' + e.message);
      });
      request.end();
}