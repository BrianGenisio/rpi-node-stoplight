var leds = require('./leds');
var http = require('http');
var connect = require('connect');

var app = connect()
  .use(connect.static('public'));


function startServer() {
	console.log('listening on 3000...');
	http.createServer(app).listen(3000);
}

leds.init(startServer);
