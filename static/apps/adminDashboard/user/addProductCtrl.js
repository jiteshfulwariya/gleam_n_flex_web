angular.module('controllers')
.controller('addProductCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("addProductCtrl");

	$scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

	$scope.initializeProductDetails = function () {
		$scope.productDetails = {
			name: null,
			description: null,
		}

		// $scope.productDetails = {
		// 	name: 'test product',
		// 	description: 'test description',
		// }

	}

	$timeout(function(){
		$scope.initializeProductDetails();
	});

	$scope.addProduct = function() {

		console.log('Product', $scope.productDetails);
		var dataPromis = networkCall.addProductRequest($scope.productDetails);
		dataPromis.then(function(result) {
			if (result.status) {
				console.log(result);
				$scope.initializeProductDetails();
				$state.go('dashboard');
			}else {
				console.log(result.validation);
			}
		});
	}

}]);
