angular.module('controllers')
.controller('adminDashboardCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("adminDashboardCtrl");
	$scope.currentPage = 1;
	$scope.numberOfPages = 1;

	$timeout(function(){
		$scope.getAllCustomer($scope.currentPage);
	});

	$scope.getAllCustomer = function(currentPage) {
		var dataPromis = networkCall.getAllCustomerRequest(currentPage);
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.customerList = result.data;
				console.log('$scope.customerList',result);
				$scope.currentPage = result.current_page;
				$scope.numberOfPages = result.number_of_pages;
			} else {
				console.log(result.validation);
			}
		});
	}

	$scope.paginationNumberCall= function (currentPage){
		console.log('currentPage',currentPage);
		$scope.getAllCustomer(currentPage);
	}

}]);
