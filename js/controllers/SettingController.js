(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('SettingController', ['$state', '$scope', '$timeout', 'FileReaderService', function($state, $scope, $timeout, fileReaderService){
		function __initialize(){
			$scope.isSettingDisplayed = false;
			$scope.isSettingFixed = false;
			$scope.position = {
				'transform': 'translateY(0)'
			}
		}

		function __methodInitialize(){

			/********************************************************************
			 ***************** BEGIN : setting panel manipulation ***************
			 ********************************************************************/

			$scope.toggleSetting = function(){
				if(!$scope.isSettingFixed){
					$scope.isSettingFixed = true;
					return;
				}

				if($scope.isSettingDisplayed){
					$scope.__hideSettingPanel()
				}
			};

			$scope.hoverOnSetting = function(){
				if(!$scope.isSettingFixed){
					$scope.__showSettingPanel(false);
				}
			};

			$scope.hoverOffSetting = function(){
				if(!$scope.isSettingFixed){
					$scope.__hideSettingPanel();
				}
			};

			$scope.toggleFold = function(index){
				var settingGroupList = $scope.selectedControlSetting.settingGroup;
				settingGroupList[index].isFolded = !settingGroupList[index].isFolded;
			};

			$scope.scroll = function(event){
				if($scope.isMouseDown){
					$scope.position = {
						'transform' : 'translateY(' + ((event.pageY - 110) >=0 ? event.pageY - 110 : 0) + 'px)'
					};
				}
			};

			$scope.mouseDown = function(){
				$scope.isMouseDown = true;
			};

			$scope.mouseUp = function(){
				$scope.isMouseDown = false;
			};

			$scope.__showSettingPanel = function(isFixed){
				$scope.isSettingDisplayed = true;
				$scope.isSettingFixed = isFixed;
				$timeout(function(){
					$scope.$emit('SETTING_PANEL_SHOWN');
				}, 200);
			};

			$scope.__hideSettingPanel = function(){
				$scope.isSettingDisplayed = false;
				$scope.isSettingFixed = false;
				$timeout(function(){
					$scope.$emit('SETTING_PANEL_HIDDEN');
				}, 200);
			};

			/********************************************************************
			 ***************** END : setting panel manipulation ***************
			 ********************************************************************/


			 /********************************************************************
			 ***************** BEGIN : setting data handling ***************
			 ********************************************************************/

			 $scope.__processModel = function(settingData){
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

			$scope.__fetchControlSettingData = function(fileUrl){
				if(fileUrl){
					fileReaderService.parseVariables(fileUrl).done(function(settingData){
						$scope.selectedControlSetting = $scope.__processModel(settingData);
					});
				}
			};

			 /********************************************************************
			 ***************** END : setting data handling ***************
			 ********************************************************************/
		}

		function __bindEvent(){
			$scope.$on('MOUSE_IS_RELEASED', function(){
				$scope.mouseUp();
			});

			$scope.$on('MOUSE_IS_MOVING', function(event, data){
				$scope.scroll(data);
			});

			$scope.$on('SHOW_SETTING_PANEL', function(event, msg){
				$scope.__showSettingPanel(true);
			});

			$scope.$on('CONTROL_SELECTED', function(event, data){
				var fileUrl = data.fileUrl;
				$scope.__fetchControlSettingData(fileUrl);
			});
		}

		function main(){
			__initialize();
			__methodInitialize();
			__bindEvent();

			// notify parent controller that I'm ready
			$scope.$emit('SETTING_CONTROLLER_LOADED');
		}

		main();
	}]);
})();