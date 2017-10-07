angular.module('customerDashboardApp', ['controllers', 'services', 'ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$qProvider', function ($stateProvider, $urlRouterProvider, $qProvider) {
		console.log("customerDashboardApp");
		// $qProvider.errorOnUnhandledRejections(false)
		$stateProvider
			.state('customerDashboard', {
				url: '/customerDashboard',
				templateUrl: '../static/apps/customerDashboard/dashboard/customerDashboard.html',
				controller: 'customerCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('changePassword', {
				url: '/changePassword',
				templateUrl: '../static/apps/customerDashboard/dashboard/changePassword.html',
				controller: 'changeCustomerPasswordCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('shipmentDetailsState', {
				// url: '/shipmentDetails/:shipment_no',
				// url: '/rosterDetailEdit/:id/:vehicle',
				url: '/shipmentDetails/:shipment_no/:inova_id',
				templateUrl: '../static/apps/customerDashboard/dashboard/shipmentDetails.html',
				controller: 'shipmentDetailsCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			});

		$urlRouterProvider.otherwise('/customerDashboard');
	}]);

	var isloggedIn = ['$location', '$q', function ($location,$q) {
		var deferred = $q.defer();
		if (localStorage.getItem('auth')) {
			deferred.resolve();
		} else {
			deferred.reject();
			window.location.href = '/';
		}
		return deferred.promise;
	}];


