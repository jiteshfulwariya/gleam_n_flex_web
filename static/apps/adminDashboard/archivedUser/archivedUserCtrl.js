angular.module('controllers')
.controller('archivedUserCtrl', ['$scope', '$state', '$timeout', 'networkCall', function($scope, $state, $timeout, networkCall) {
	console.log("archivedUserCtrl");

	$scope.currentPage = 1;
	$scope.numberOfPages = 1;
	// $timeout(function(){
	// });

	$scope.init = function () {
		$scope.getAllArchivedUsers($scope.currentPage);
	};
	$timeout($scope.init);

	$scope.getAllArchivedUsers = function(currentPage) {
		var dataPromis = networkCall.getAllArchivedUsersRequest(currentPage);
		dataPromis.then(function(result) {
			if (result.status) {
				$scope.archivedUserList = result.data;
				console.log('$scope.archivedUserList',result);
			}else {
				console.log(result.validation);
			}
		});
	};

	$scope.restoredUser = function(customer) {
		console.log('customer', customer);
		var dataPromis = networkCall.restoredUserRequest(customer);
		dataPromis.then(function(result){
			if(result.status) {
				console.log(result);
				$scope.getAllArchivedUsers();
			}else{
				console.log(result.validation);
			}
		});
	}

	$scope.paginationNumberCall= function (currentPage){
		console.log('currentPage',currentPage);
		$scope.getAllArchivedUsers(currentPage);
	}

}]);
