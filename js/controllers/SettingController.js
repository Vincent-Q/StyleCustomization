(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('SettingController', ['$state', '$scope', '$timeout', 'FileReaderService', function($state, $scope, $timeout, fileReaderService){
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
			if(!$scope.isSettingFixed){
				$scope.isSettingFixed = true;
				return;
			}

			if($scope.isSettingDisplayed){
				__hideSettingPanel()
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

		var fetchControlSettingData = function(fileUrl){
			if(fileUrl){
				fileReaderService.parseVariables(fileUrl).done(function(settingData){
					//console.log(settingData);
					$scope.selectedControlSetting = settingData;
					// {
					// 	title: 'Buttons configuration update',
					// 	settingGroup:[{
					// 		category: 'Font setting group',
					// 		style:[{
					// 			styleName: '@btn-border-radius',
					// 			placeholder: '@text-color',
					// 			styleValue: ''
					// 		}, {
					// 			styleName: '@btn-border-width',
					// 			placeholder: '@text-color',
					// 			styleValue: ''
					// 		}]
					// 	}, {
					// 		category: 'Size setting group',
					// 		style: [{
					// 			styleName: '@btn-padding-vertical',
					// 			placeholder: '@padding-base-vertical',
					// 			styleValue: ''
					// 		}, {
					// 			styleName: '@btn-padding-horizontal',
					// 			placeholder: '@padding-base-horizontal',
					// 			styleValue: ''
					// 		}]
					// 	}, {
					// 		category: 'Color setting group',
					// 		style: [{
					// 			styleName: '@btn-default-border',
					// 			placeholder: '',
					// 			styleValue: 'rgb(71, 71, 71)'
					// 		}, {
					// 			styleName: '@btn-default-bg',
					// 			placeholder: '',
					// 			styleValue: 'transparent'
					// 		}, {
					// 			styleName: '@btn-default-color',
					// 			placeholder: '',
					// 			styleValue: '#fcfcfc'
					// 		}]
					// 	}]
					// }
				});
			}
		};

		$scope.$on('CONTROL_SELECTED', function(event, data){
			var fileUrl = data.fileUrl;
			fetchControlSettingData(fileUrl);
		});

		// notify parent controller that I'm ready
		$scope.$emit('SETTING_CONTROLLER_LOADED');
	}]);
})();