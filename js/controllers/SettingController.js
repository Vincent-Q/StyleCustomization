(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('SettingController', ['$state', '$scope', '$timeout', function($state, $scope, $timeout){
		$scope.isSettingDisplayed = false;
		$scope.isSettingFixed = false;

		var __showSettingPanel = function(isFixed){
			$scope.isSettingDisplayed = true;
			$scope.isSettingFixed = isFixed;
			$timeout(function(){
				$scope.$emit('SETTING_PANEL_SHOWN');
			}, 200);
		};

		var __hideSettingPanel = function(){
			$scope.isSettingDisplayed = false;
			$scope.isSettingFixed = false;
			$timeout(function(){
				$scope.$emit('SETTING_PANEL_HIDDEN');
			}, 200);
		};

		$scope.toggleSetting = function(){
			if($scope.isSettingDisplayed){
				__hideSettingPanel()
			} else {
				__showSettingPanel(true);
			}
		};

		$scope.hoverOnSetting = function(){
			if(!$scope.isSettingFixed){
				__showSettingPanel(false);
			}
		};

		$scope.hoverOffSetting = function(){
			if(!$scope.isSettingFixed){
				__hideSettingPanel();
			}
		};

		$scope.$on('SHOW_SETTING_PANEL', function(event, msg){
			__showSettingPanel(true);
		});

		var fetchControlSettingData = function(){
			return {
				title: 'Buttons configuration',
				settingGroup:[{
					category: 'Font setting group',
					styles:[{
						styleName: '@btn-border-radius',
						placeholder: '@text-color',
						styleValue: ''
					}, {
						styleName: '@btn-border-width',
						placeholder: '@text-color',
						styleValue: ''
					}]
				}, {
					category: 'Size setting group',
					styles: [{
						styleName: '@btn-padding-vertical',
						placeholder: '@padding-base-vertical',
						styleValue: ''
					}, {
						styleName: '@btn-padding-horizontal',
						placeholder: '@padding-base-horizontal',
						styleValue: ''
					}]
				}, {
					category: 'Color setting group',
					styles: [{
						styleName: '@btn-default-border',
						placeholder: '',
						styleValue: 'rgb(71, 71, 71)'
					}, {
						styleName: '@btn-default-bg',
						placeholder: '',
						styleValue: 'transparent'
					}, {
						styleName: '@btn-default-color',
						placeholder: '',
						styleValue: '#fcfcfc'
					}]
				}]
			}
		};

		$scope.$on('CONTROL_SELECTED', function(event, msg){
			$scope.selectedControlSetting = fetchControlSettingData();
		});

		$scope.selectedControlSetting = fetchControlSettingData();
	}]);
})();