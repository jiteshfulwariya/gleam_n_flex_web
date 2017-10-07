angular.module('controllers', [])
.controller('customerDashboardCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("customerDashboardCtrl");

	$scope.init = function(){
		$scope.getMyDetails();
	}

	$timeout($scope.init);

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

	$scope.getMyDetails = function(){
		var dataPromis = networkCall.getMyDetailsRequest();
		dataPromis.then(function(result) {
			if(result.status){
				$scope.myDetails = result.data;
				console.log('$scope.myDetails', $scope.myDetails);
			}else{
				console.log(result.validation);
			}
		})
	}
}]);
