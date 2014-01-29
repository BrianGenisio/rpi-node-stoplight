// 11 -> GP0
// 12 -> GP1
// 13 -> GP2
// 15 -> GP3
// 16 -> GP4
// 18 -> GP5
// 22 -> GP6
// 7  -> GP7

var gpio = require('rpi-gpio');
var _ = require('underscore');

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
    		led.ready = true;
    		if(_.any(leds, function(led) { return !led.ready; })) return;

    		if(complete) complete();
  		});
	});
}

function set(pin, value) {
	var led = _.find(leds, function(l) { return l.pin === pin; });
	if(!led) return;

	led.value = !!value;

	gpio.write(led.pin, led.value);
}

exports.RED = RED;
exports.YELLOW = YELLOW;
exports.GREEN = GREEN;
exports.leds = leds;
exports.init = init;
exports.set = set;