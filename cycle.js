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

var INTERVAL = 80;

var RED = 11;
var YELLOW = 12;
var GREEN = 13;

var leds = [
{pin: RED, value: false},
{pin: YELLOW, value: false},
{pin: GREEN, value: false}
];

leds.forEach(function(led) {
  gpio.setup(led.pin, gpio.DIR_OUT, function() {
    led.ready = true;
    start();
  });
});

var current = 0;

function start() {
  if(_.any(leds, function(led) { return !led.ready; })) return;

  setInterval(toggle,INTERVAL);  
}

function toggle() {
  var led = leds[current % leds.length];
  led.value = !led.value;

  gpio.write(led.pin, led.value);
  current++;
}

