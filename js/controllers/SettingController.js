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

		$scope.toggleFold = function(index){
			var settingGroupList = $scope.selectedControlSetting.settingGroup;
			settingGroupList[index].isFolded = !settingGroupList[index].isFolded;
		}

		$scope.$on('SHOW_SETTING_PANEL', function(event, msg){
			__showSettingPanel(true);
		});

		var processModel = function(settingData){
			var settingGroupList = settingData.settingGroup;

			for(var i=0; i<settingGroupList.length; i++){
				if(i === 0){
					settingGroupList[i].isFolded = false;
				} else {
					settingGroupList[i].isFolded = true;
				}
			}

			return settingData;
		};

		var fetchControlSettingData = function(fileUrl){
			if(fileUrl){
				fileReaderService.parseVariables(fileUrl).done(function(settingData){
					$scope.selectedControlSetting = processModel(settingData);
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