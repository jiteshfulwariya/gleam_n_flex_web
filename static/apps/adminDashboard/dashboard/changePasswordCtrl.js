angular.module('controllers')
.controller('changePasswordCtrl', ['$scope', 'networkCall', '$state', '$timeout', '$stateParams', function($scope, networkCall, $state, $timeout, $stateParams) {
	console.log("changePasswordCtrl");

	$scope.changePassword = function() {
		var dataPromis = networkCall.changePasswordRequest($scope.password, $scope.confirm_password);
		dataPromis.then(function(result) {
			if (result.status) {
				window.location.href = '/';
				console.log(result);
				console.log('Admin Password changed Successfully');
				$scope.password = null;
				$scope.confirm_password = null;
			} else {
				console.log(result.validation);
			}
		});
	}
}]);
