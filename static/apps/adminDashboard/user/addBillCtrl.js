angular.module('controllers')
.controller('addBillCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("addBillCtrl");

	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	$scope.initializeBillDetails = function () {
		// 	$scope.billDetails = {
		// 	bill_no: '859',
		// 	op_no: '58746',
		// 	token: 'asds78',
		// 	patient_name: 'Test Patient',
		// 	consultant: 'Test Consultant',
		// 	particulars: null,
		// 	qty: '25',
		// 	patient_age: '25',
		// 	mobile_no: '7896541230',
		// 	gender: '1',
		// 	payment_type: '1'
		// }

		$scope.billDetails = {
			bill_no: null,
			op_no: null,
			token: null,
			amount: null,
			patient_name: null,
			consultant: null,
			particulars: null,
			dob: null,
			qty: null,
			patient_age: null,
			mobile_no: null,
			gender: null,
			payment_type: null
		}

	}

	$scope.init = function(){
		$scope.choicesId();
	}

	$timeout(function(){
		$scope.initializeBillDetails();
		$scope.init();
	});

	$scope.addBill = function() {

		$scope.billDetails.dob = new Date($scope.billDetails.dob).getTime();
		console.log('Bill', $scope.billDetails);
		var dataPromis = networkCall.addBillRequest($scope.billDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
				$scope.initializeBillDetails();
				$state.go('dashboard');
			}else {
				console.log(result.validation);
				Notification.error(result.validation);

			}
		});
	}

	$scope.choicesId = function(){
		console.log("choicesId");
		var dataPromis = networkCall.getPaymentChoicesRequest();
		dataPromis.then(function(result){
			if(result.status){
				$scope.choicesList = result.data;
				console.log("choicesList",result.data);
				console.log(result.validation);
			}else{
				console.log(result.validation);
				Notification.error(result.validation);
			}
		});

};



}]);
