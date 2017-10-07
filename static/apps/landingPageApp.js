angular.module('landingPageApp', ['controllers', 'services', 'ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', '$qProvider', function ($stateProvider, $urlRouterProvider, $qProvider) {
		console.log("landingPageApp");
		// $qProvider.errorOnUnhandledRejections(false)
		$stateProvider
			.state('loginUi', {
				url: '/loginUi',
				templateUrl: 'static/apps/login/login.html',
				controller: 'loginCtrl'
			});

		$urlRouterProvider.otherwise('/loginUi');
	}]);
