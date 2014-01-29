var leds = require('./leds');
var INTERVAL = 80;

leds.init(function() {
  setInterval(toggle,INTERVAL);
});

var current = 0;

function toggle() {
  var led = leds.leds[current % leds.leds.length];
  leds.set(led.pin, !led.value);

  current++;
}

