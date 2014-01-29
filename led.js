// 11 -> GP0
// 12 -> GP1
// 13 -> GP2
// 15 -> GP3
// 16 -> GP4
// 18 -> GP5
// 22 -> GP6
// 7  -> GP7

var gpio = require('rpi-gpio');

console.log('params: ', process.argv);

var OUTPUT_PIN = parseInt(process.argv[2], 10);
var value = !!parseInt(process.argv[3], 10);


console.log('Setting ' + OUTPUT_PIN + ' to ' + value);

gpio.setup(OUTPUT_PIN, gpio.DIR_OUT, write);

function write() {
  gpio.write(OUTPUT_PIN, value, function(err) {
    if(err) throw err;
    gpio.destroy(function() {
      return process.exit(0);
    });
  });
}
