angular.module('dashboardLandingPageApp', ['controllers', 'services', 'ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$qProvider', function ($stateProvider, $urlRouterProvider, $qProvider) {
		console.log("dashboardLandingPageApp");
		// $qProvider.errorOnUnhandledRejections(false)
		$stateProvider
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: '../static/apps/adminDashboard/dashboard/adminDashboard.html',
				controller: 'adminDashboardCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})

			.state('productList', {
				url: '/productList',
				templateUrl: '../static/apps/adminDashboard/dashboard/productList.html',
				controller: 'productListCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})

			.state('addBill', {
				url: '/addBill',
				templateUrl: '../static/apps/adminDashboard/user/addBill.html',
				controller: 'addBillCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('addProduct', {
				url: '/addProduct/',
				templateUrl: '../static/apps/adminDashboard/user/addProduct.html',
				controller: 'addProductCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('billDetails', {
				url: '/billDetails/:id',
				templateUrl: '../static/apps/adminDashboard/dashboard/invoice.html',
				controller: 'billDetailsCtrl'
			})

			.state('changePassword', {
				url: '/changePassword',
				templateUrl: '../static/apps/adminDashboard/dashboard/changePassword.html',
				controller: 'changePasswordCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('changeUserPassword', {
				url: '/changeUserPassword/:id',
				templateUrl: '../static/apps/adminDashboard/user/changeUserPassword.html',
				controller: 'changeUserPasswordCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			});

		$urlRouterProvider.otherwise('/dashboard');
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


