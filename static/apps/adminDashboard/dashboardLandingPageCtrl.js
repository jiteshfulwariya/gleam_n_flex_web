angular.module('controllers', [])
.controller('dashboardLandingCtrl', ['$scope', '$state', 'networkCall', function($scope, $state, networkCall) {
	console.log("dashboardLandingCtrl");

	$scope.logout = function() {
		var dataPromis = networkCall.logoutRequest();
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
				localStorage.removeItem('auth');
				window.location.href = '/';
			} else {
				console.log(result.validation);
			}
		});
	}

}]);
