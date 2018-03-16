	
const mainModule = angular.module('UsvaHomeApp', ['sensorsService', 'relaysService', 'ngRadialGauge']);
    
mainModule.controller('sensorsController', ['$scope','$http','Sensors', function($scope, $http, Sensors) {

	$scope.loading = true;

	// GET =====================================================================
	// when landing on the page, get all sensors and show them
	// use the service to get all the todos
	const getAll = function() {
		Sensors.getAll()
			.success(function(data) {
				data.forEach(function(sensor) {
					$scope[sensor.name] = sensor;
				})
				$scope.sensors = data;
				$scope.loading = false;
			});
	}
	getAll();
	
	const updateGaugeValues = function() {
		Sensors.getAll()
			.success(function(data) {
				for ( var i = 0; i < data.length; i++ ) {
					$scope.sensors[i].value = data[i].value;
				}
				$scope.loading = false;
			});
	}
	
	var poll = function() {
        setInterval(function() {
            updateGaugeValues();
        }, 2000);
    };     
	poll();
	
}]);
		
mainModule.controller('relaysController', ['$scope','$http','Relays', function($scope, $http, Relays) {

	$scope.loading = true;
	
	// GET =====================================================================
	// when landing on the page, get all relays and show them
	// use the service to get all the todos
	Relays.getAll()
		.success(function(data) {
			$scope.relays = data;
			$scope.loading = false;
		});
	
	$scope.put = function(relayid, value) {
		    
        Relays.put(relayid, value);
		    
	};
	
}]);
