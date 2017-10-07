angular.module('controllers')
.controller('shipmentDetailsCtrl', ['$scope', '$state', '$timeout', '$stateParams', 'networkCall', function($scope, $state, $timeout, $stateParams, networkCall) {
	console.log("shipmentDetailsCtrl");

	$timeout(function(){
		$scope.getMyDetails();
		$scope.shipmentDetails();
	});

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

	$scope.shipmentDetails = function(shipment_no, inova_id) {
	console.log('shipment_no', $stateParams.shipment_no);
	console.log('inova_id', $stateParams.inova_id);

	var dataPromis = networkCall.getshipmentDetails($stateParams.shipment_no, $stateParams.inova_id);
	dataPromis.then(function(result){
		if(result.status){
			$scope.data = result.data.data.data;
			$scope.inova_id = result.data.data.inova_id;
			console.log("$scope.data: ", $scope.data);
		}else{
			console.log(result);
		}
		})
	};

}]);
