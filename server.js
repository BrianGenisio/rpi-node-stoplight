var leds = require('./leds');
var http = require('http');
var connect = require('connect');

var routes = {
	'GET:/api/leds': getLEDs,
	'POST:/api/leds': updateLED
}

function getLEDs(req, resp) {
	resp.end(JSON.stringify(leds.leds));
}

function updateLED(req, resp) {
	var led = req.body;
	leds.set(led.pin, led.value);
	resp.end(JSON.stringify(leds.leds));
}

leds.init(startServer);




var app = connect()
  .use(connect.static('public'))
  .use(connect.urlencoded())
  .use(connect.json())
  .use(dataService);

function dataService(req, resp, next) {
	var route = req.method + ":" + req.url;
	if(!routes[route]) return next();

	routes[route](req, resp);
}

function startServer() {
	http.createServer(app).listen(3000);
}
