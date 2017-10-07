angular.module('services', [])
	.factory('networkCall', function($http) {

		var postRequestLogin = function(username, password) {
			return $http.post('/login/view/', { username: username , password:password  }).then(function(result) {
				return result.data;
			});
		};

		return {
			postRequestLogin:postRequestLogin
		};

	});
