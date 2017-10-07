angular.module('controllers')
.controller('customerCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("customerCtrl");

	$timeout(function(){
		$scope.getMyDetails();
	});

	$scope.getMyDetails = function(){
		var dataPromis = networkCall.getMyDetailsRequest();
		dataPromis.then(function(result) {
			if(result.status){
				$scope.myDetails = result.data;
				console.log('$scope.myDetails', $scope.myDetails);
				$scope.getAllShipment();
			}else{
				console.log(result.validation);
			}
		})
	}

	$scope.getAllShipment = function() {
		console.log("$scope.myDetails: ", $scope.myDetails)
		var dataPromis = networkCall.postRequestGetAllShipment($scope.myDetails.inova_id);

		dataPromis.then(function(result) {
			if (result.status) {
				$scope.shipmentList = result.data.data;
				console.log("$scope.shipmentList: ", $scope.shipmentList);
			} else {
				console.log(result.validation);
			}
		});
		}

	$scope.getShipmentDetails = function(shipment_args) {
		console.log("shipment_args: ", shipment_args)
		$state.go('shipmentDetailsState', {'shipment_no': shipment_args.shipment_no, 'inova_id': shipment_args.inova_id});
		// $state.go('shipmentDetailsState', {'shipment_no': shipment_args.shipment_no});
		}




}]);
