(function(){
	var styleCustomization = angular.module('styleCustomization', [
		'ngRoute',
		'buttonsModule',
		'ngAnimate',
		'ui.router'
	]);
	
	styleCustomization.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/buttons');

		$stateProvider
			.state('buttons', {
				url: '/buttons',
				templateUrl: 'page/buttons-page.html',
				controller: 'ButtonsController'
			});
	}]);
})();