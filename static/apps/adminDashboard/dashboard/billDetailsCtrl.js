angular.module('controllers')
.controller('billDetailsCtrl', ['$scope', '$state', '$timeout', '$stateParams', 'networkCall', function($scope, $state, $timeout, $stateParams, networkCall) {
	console.log("billDetailsCtrl");

	$timeout(function(){
		$scope.getBillDetails();
	});

	$scope.getBillDetails = function() {
		var dataPromis = networkCall.getBillDetailsRequest($stateParams.id);
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.billDetails = result.data;
				console.log('$scope.billDetails', $scope.billDetails);
			} else {
				console.log(result.validation);
			}
		});
	}

}]);
