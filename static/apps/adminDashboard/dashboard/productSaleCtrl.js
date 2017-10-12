angular.module('controllers')
.controller('productSaleCtrl', ['$scope', '$state', '$timeout', '$stateParams', 'networkCall', function($scope, $state, $timeout, $stateParams, networkCall) {
	console.log("productSaleCtrl");

	$timeout(function(){
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

}]);
