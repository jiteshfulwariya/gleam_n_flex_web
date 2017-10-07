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
			.state('addUser', {
				url: '/addUser',
				templateUrl: '../static/apps/adminDashboard/user/addUser.html',
				controller: 'addUserCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('editUser', {
				url: '/editUser/:id',
				templateUrl: '../static/apps/adminDashboard/user/editUser.html',
				controller: 'editUserCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
			})
			.state('archivedUser', {
				url: '/archivedUser',
				templateUrl: '../static/apps/adminDashboard/archivedUser/archivedUser.html',
				controller: 'archivedUserCtrl',
				resolve: {
					loggedIn: isloggedIn
				}
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


