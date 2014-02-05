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

	$scope.ledUpdated = function(led) {
		stopLightService.setLED(led.pin, led.value);
	};

});