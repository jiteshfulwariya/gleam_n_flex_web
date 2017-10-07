angular.module('controllers')
.controller('addUserCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("addUserCtrl");

	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	$scope.initializeBillDetails = function () {
		$scope.billDetails = {
			bill_no: null,
			op_no: null,
			token: null,
			patient_name: null,
			consultant: null,
			perticulars: null,
			qty: null,
			patient_age: null,
			mobile_no: null,
			gender: null,
			payment_type: null
		}
	}

	$timeout(function(){
		$scope.initializeBillDetails();
	});

	$scope.addBill = function() {
		console.log('Bill', $scope.billDetails);
		var dataPromis = networkCall.addBillRequest($scope.billDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
				$scope.initializeBillDetails();
				$state.go('dashboard');
			}else {
				console.log(result.validation);
			}
		});
	}

}]);
