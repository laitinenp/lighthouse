angular.module('relaysService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Relays', ['$http',function($http) {
		return {
		    getAll : function() {
				return $http.get('/api/relays/');
			},
			get : function(relayid) {
				return $http.get('/api/relays/' + relayid);
			},
			put : function(relayid, newValue) {
				var data = { value: newValue }
				return $http.put('/api/relays/' + relayid, data);
			}
		}
	}]);