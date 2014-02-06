var app = angular.module("StopLight", []);

app.factory('stopLightService', function($http) {

	var leds = [];

	$http.get('/api/leds').success(function(values) {
		leds.push.apply(leds, values);
	});

	function setLED(pin, value) {
		$http.post('/api/leds', {pin: pin, value: value});
	}

	return {
		leds: leds,
		setLED: setLED
	};

});

app.controller('StopLightCtrl', function($scope, stopLightService) {

	$scope.leds = stopLightService.leds;

	$scope.toggle = function(led) {
		led.value = !led.value;
		stopLightService.setLED(led.pin, led.value);
	};

	$scope.cycle = function() {
		$scope.cycleCount = 0;
		cycleUpdate();
	};

	function cycleUpdate() {
		if($scope.cycleCount > 100) return;
		
		var led = $scope.leds[$scope.cycleCount++ % $scope.leds.length];
		$scope.toggle(led);

		setTimeout(cycleUpdate, 100);
	}

});