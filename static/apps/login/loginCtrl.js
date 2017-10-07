angular.module('controllers')
	.controller('loginCtrl', ['$scope', 'networkCall', '$state', '$location', function($scope, networkCall, $state, $location) {
		console.log("loginCtrl");
		$scope.login = function() {
			// if ($scope.user_name != null || $scope.user_name != undefined && $scope.password != null || $scope.password != undefined) {
				var dataPromis = networkCall.postRequestLogin($scope.user_name, $scope.password);
				dataPromis.then(function(result) {
					if (result.status) {
						console.log(result);
						localStorage.setItem('auth', true);
						window.location.href = document.URL.split('#!')[0] + result.redirectUrl;
					} else {
						console.log(result.validation);
					}
				});
			// } else {
			// 	$scope.sendRequestLoading = false;
			// }
		}
	}]);
