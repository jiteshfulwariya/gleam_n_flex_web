angular.module('controllers')
.controller('changeUserPasswordCtrl', ['$scope', 'networkCall', '$state', '$timeout', '$stateParams', function($scope, networkCall, $state, $timeout, $stateParams) {
	console.log("changeUserPasswordCtrl");

	$scope.init = function () {
		console.log($stateParams.id);
		if($stateParams.id){
			$scope.getCustomerDetails($stateParams.id);
		}else{
			$state.go('dashboard');
		}
	};
	$timeout($scope.init);

	$scope.changeUserPassword = function() {
		var dataPromis = networkCall.changeUserPasswordRequest($scope.new_password, $scope.confirm_password, $scope.userDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				$state.go('dashboard');
				console.log(result.data);
				console.log("Password changed Successfully");
				$scope.new_password = null;
				$scope.confirm_password = null;
			} else {
				console.log(result.validation);
			}
		});
	}

	$scope.getCustomerDetails = function(id) {
		var dataPromis = networkCall.getCustomerDetailsRequest(id);
		dataPromis.then(function(result){
			if (result.status) {
				$scope.userDetails = result.data;
				console.log('$scope.userDetails',$scope.userDetails);
			}else{
				console.log(result.validation);
			}
		})
	}


}]);
