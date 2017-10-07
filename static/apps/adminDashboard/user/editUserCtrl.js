angular.module('controllers')
.controller('editUserCtrl', ['$scope', '$state', '$timeout', '$stateParams', 'networkCall', function($scope, $state, $timeout, $stateParams, networkCall) {
	console.log("editUserCtrl");

	$scope.init = function () {
		console.log($stateParams.id);
		if($stateParams.id){
			$scope.getCustomerDetailsForEdit($stateParams.id);
		}else{
			$state.go('dashboard');
		}
	};
	$timeout($scope.init);

	$scope.getCustomerDetailsForEdit = function(id) {
		// console.log(id);
		var dataPromis = networkCall.getCustomerDetailsRequest(id);
		dataPromis.then(function(result){
			if(result.status){
				// console.log(result);
				$scope.UserDetails = result.data;
				console.log('$scope.UserDetails', $scope.UserDetails);
			}else{
				console.log(result);
			}
		})
	};
	$scope.editUser = function(UserDetails) {
		console.log('UserDetails', UserDetails);
		var dataPromis = networkCall.editCustomerDetailsByIdRequest(UserDetails);
		dataPromis.then(function(result){
			if(result.status){
				console.log(result);
				$state.go('dashboard');
				// $scope.UserDetails = null;
				// console.log('$scope.UserDetails', $scope.UserDetails);
			}else{
				console.log(result);
			}
		})
	};
}]);
