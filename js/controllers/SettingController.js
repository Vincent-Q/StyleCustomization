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
					$scope.selectedControlSetting = settingData;
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