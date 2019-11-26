const https = require('https');

exports.item = (req, res, next)=>{
    var options = {
        host : 'gateway.chotot.com',
        path : '/v1/public/ad-listing?app_id=android&cg=5000&limit=20&o=0',
        port : 443,
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