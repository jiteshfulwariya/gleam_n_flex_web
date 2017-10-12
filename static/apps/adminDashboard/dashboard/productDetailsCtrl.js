angular.module('controllers')
.controller('productDetailsCtrl', ['$scope', '$state', '$timeout', '$stateParams', 'networkCall', function($scope, $state, $timeout, $stateParams, networkCall) {
	console.log("productDetailsCtrl");

	$scope.initializeProduct = function () {
		$scope.productDetails = {
			product_id: null,
			sale_quantity: null,
			price: null,
			quantity: null,
		}
	}

	$timeout(function(){
		// $scope.initializeProduct();
		$scope.getProductDetails();
	});

	$scope.getProductDetails = function() {
		var dataPromis = networkCall.getProductDetailsRequest($stateParams.id);
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.productDetails = result.data;
				console.log('$scope.productDetails', $scope.productDetails);

			} else {
				console.log(result.validation);
			}
		});
	}

	$scope.saleProduct = function(productDetails) {

		console.log('Product Sale Details', productDetails);

		var productSaleDetails = {"product_id": productDetails.id, "sale_quantities": productDetails.sale_quantity}

		var dataPromis = networkCall.saleProductRequest(productSaleDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
				$state.go('productList');
			}else {
				console.log(result.validation);
			}
		});
	}


}]);
