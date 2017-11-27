angular.module('controllers')
.controller('addCustomerCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("addCustomerCtrl");

	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	$scope.initializeCustomerDetails = function () {
		// 	$scope.customerDetails = {
		// 	customer_name: null,
		// 	dob: null,
		// 	age: null,
		// 	address: null,
		// 	email: null,
		// 	mobile_no: null,
		// 	preferred_time_to_call: null,
		// 	profession: null,
		// 	how_you_know: null,
		// 	reason_to_visit_us: null,
		// 	updates: null,
		// 	reason_to_visit_parlour: null,
		// 	medical_history: null,
			// skin_care_method: null
		// }

		$scope.customerDetails = {
			customer_name: 'test customer',
			dob: null,
			age: null,
			address: null,
			email: 'abc@gmail.com',
			mobile_no: null,
			preferred_time_to_call: null,
			profession: null,
			how_you_know: null,
			reason_to_visit_us: null,
			updates: null,
			reason_to_visit_parlour: null,
			medical_history: null,
			skin_care_method: null,
			taken_isotrethnoier_medicine: null,
			allergic_to_medicine: null
		}


		// $scope.customerDetails = {
		// 	customer_name: 'test customer',
		// 	dob: '58746',
		// 	age: 'asds78',
		// 	address: 'Test Patient',
		// 	email: 'nikhil123@gmail.com',
		// 	mobile_no: '7896541230',
		// 	preferred_time_to_call: "12:30",
		// 	profession: '25',
		// 	how_you_know: '25',
		// 	reason_to_visit_us: '7896541230',
		// 	updates: '1',
		// 	reason_to_visit_parlour: '1',
		// 	medical_history: '1',
		// 	skin_care_method: '2'
		// }

	}

	$scope.init = function(){
		$scope.choicesId();
	}

	$timeout(function(){
		$scope.initializeCustomerDetails();
		$scope.init();
	});

	$scope.addCustomer = function() {

		$scope.customerDetails.dob = new Date($scope.customerDetails.dob).getTime();
		console.log('customerDetails', $scope.customerDetails);
		// $scope.customerDetails.preferred_time_to_call = $scope.customerDetails.preferred_time_to_call.toString();

		var dataPromis = networkCall.addCustomerRequest($scope.customerDetails);
		dataPromis.then(function(result) {
			if (result.data.status) {
				console.log(result);
				$scope.initializeCustomerDetails();
				// $state.go('dashboard');
			}else {
				console.log('Response: ', result.data.validation);
				// Notification.error(result.validation);

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
