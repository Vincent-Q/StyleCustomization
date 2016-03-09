(function(){
	var controlsModule = angular.module('controlsModule', []);

	var styleCustomization = angular.module('styleCustomization', [
		'ngRoute',
		'controlsModule',
		'ngAnimate',
		'ui.router'
	]);
	
	styleCustomization.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/buttons');

		$stateProvider
			.state('page-container', {
				templateUrl: 'page/page-container.html'
			})
			.state('page-container.buttons', {
				url: '/buttons',
				views:{
					'setting-panel':{
						templateUrl: 'page/setting-panel.html',
						controller: 'SettingController'
					},
					'control-display':{
						templateUrl: 'page/buttons-page.html',
						controller: 'ButtonsController'
					}
				}
			});
	}]);
})();