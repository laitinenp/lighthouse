angular.module('sensorsService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Sensors', ['$http',function($http) {
		return {
		    getAll : function() {
				return $http.get('/api/sensors/');
			},
			get : function(sensorid) {
				return $http.get('/api/sensors/' + sensorid);
			}
		}
	}]);