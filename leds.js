// 11 -> GP0
// 12 -> GP1
// 13 -> GP2
// 15 -> GP3
// 16 -> GP4
// 18 -> GP5
// 22 -> GP6
// 7  -> GP7

var fs     = require('fs');
var gpio = require('rpi-gpio');
var _ = require('underscore');

var GPIO_PATH = '/sys/class/gpio';

var RED = 11;
var YELLOW = 12;
var GREEN = 13;

var leds = [
	{pin: RED, value: false},
	{pin: YELLOW, value: false},
	{pin: GREEN, value: false}
];

function init(complete) {
	leds.forEach(function(led) {
  		gpio.setup(led.pin, gpio.DIR_OUT, function() {
  			setListener(led.pin);
    		led.ready = true;
    		if(_.any(leds, function(led) { return !led.ready; })) return;

    		if(complete) complete();
  		});
	});
}

function getLed(pin) {
	return _.find(leds, function(l) { return l.pin === pin; });
}

function set(pin, value) {
	var led = getLed(pin);
	if(!led) return;

	led.value = !!value;

	gpio.write(led.pin, led.value);
}

function setListener(pin) {
	var path = GPIO_PATH + '/gpio' + gpio.MODE_RPI(pin) + '/value';
    fs.watch(path, function() {
    	fs.readFile(path, function(err, data) {
    		var led = getLed(pin);
			if(!led) return;

			var newValue = parseInt(data);
			if(led.value !== newValue) {
				led.value = newValue;
				console.log('Pin ' + pin + ' changed to ' + newValue);
			}
    	});
    });
}

exports.RED = RED;
exports.YELLOW = YELLOW;
exports.GREEN = GREEN;
exports.leds = leds;
exports.init = init;
exports.set = set;