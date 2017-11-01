angular.module('controllers')
.controller('adminDashboardCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("adminDashboardCtrl");
	$scope.currentPage = 1;
	$scope.numberOfPages = 1;

	$timeout(function(){
		$scope.getAllBill();
	});

	$scope.getAllBill = function() {
		var dataPromis = networkCall.getAllBillRequest();
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.billList = result.data;
				console.log('$scope.billList', $scope.billList);
			} else {
				console.log(result.validation);
			}
		});
	}

	$scope.paginationNumberCall= function (currentPage){
		console.log('currentPage',currentPage);
		$scope.getAllCustomer(currentPage);
	}

	$scope.sendInvoice = function(bill) {
		console.log('Invoice Details', bill);

		var invoiceDetails = {"invoice_id": bill.id}

		var dataPromis = networkCall.sendInvoiceRequest(invoiceDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
			}else {
				console.log(result.validation);
			}
		});
	}



}]);
