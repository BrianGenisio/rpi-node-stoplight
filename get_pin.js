// 11 -> GP0
// 12 -> GP1
// 13 -> GP2
// 15 -> GP3
// 16 -> GP4
// 18 -> GP5
// 22 -> GP6
// 7  -> GP7

var gpio = require('rpi-gpio');

var OUTPUT_PIN = parseInt(process.argv[2], 10);

gpio.read(OUTPUT_PIN, function(err, value) {
	if(err) throw err;

	console.log("Pin " + OUTPUT_PIN + ": " + value);
});
