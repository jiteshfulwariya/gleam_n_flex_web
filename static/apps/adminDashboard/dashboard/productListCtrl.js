angular.module('controllers')
.controller('productListCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("productListCtrl");

	$timeout(function(){
		$scope.getAllProduct();
	});

	$scope.getAllProduct = function() {
		console.log('get all product function');
		var dataPromis = networkCall.getAllProductRequest();
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.productList = result.data;
				console.log('$scope.productList', $scope.productList);
			} else {
				console.log(result.validation);
			}
		});
	}

}]);
