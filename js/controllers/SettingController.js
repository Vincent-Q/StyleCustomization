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
				settingGroups:[{
					groupName: 'Font setting group',
					styles:[{
						name: '@btn-border-radius',
						value: ''
					}, {
						name: '@btn-border-width',
						value: ''
					}]
				}]

			}
		};

		$scope.$on('CONTROL_SELECTED', function(event, msg){
			$scope.selectedControlSetting = fetchControlSettingData();
		});
	}]);
})();