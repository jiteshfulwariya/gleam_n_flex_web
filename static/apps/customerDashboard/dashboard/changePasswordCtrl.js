angular.module('controllers')
.controller('changeCustomerPasswordCtrl', ['$scope', 'networkCall', '$state', '$timeout', '$stateParams', function($scope, networkCall, $state, $timeout, $stateParams) {
	console.log("changeCustomerPasswordCtrl");

	$scope.changePassword = function() {
		var dataPromis = networkCall.changePasswordRequest($scope.password, $scope.confirm_password);
		dataPromis.then(function(result) {
			if (result.status) {
				window.location.href = '/';
				console.log(result);
				$scope.password = null;
				$scope.confirm_password = null;
			} else {
				console.log(result.validation);
			}
		});
	}
}]);
