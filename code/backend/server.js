const http = require('http');
const app = require('./app');
const constants = require('./constants/common');
const port = constants.PORT || 8080;

const server = http.createServer(app);

process.setMaxListeners(0);
server.listen(port,() => console.log(`Listening on port ${port}`));