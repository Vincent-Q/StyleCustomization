(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('SettingController', ['$state', '$scope', '$timeout', 'FileReaderService', function($state, $scope, $timeout, fileReaderService){
		function __initialize(){
			$scope.isSettingDisplayed = false;
			$scope.isSettingFixed = false;
			$scope.position = {
				'transform': 'translateY(0)'
			}

			$scope.scrollBarOption = {
				contentArea: $('.flexible-container'),
				contentContainer: $('.display-box')
			};

			$scope.position = {
				'transform': 'translateY(0)'
			};
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
				$timeout(function(){
					$scope.$broadcast('CONTENT_AREA_CHANGE');
				});
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
			$scope.$on('SHOW_SETTING_PANEL', function(event, msg){
				$scope.__showSettingPanel(true);
			});

			$scope.$on('CONTROL_SELECTED', function(event, data){
				var fileUrl = data.fileUrl;
				$scope.__fetchControlSettingData(fileUrl);
			});

			$scope.$on('SCROLL_BAR_MOVING', function(event, data){
				$scope.position = {
					'transform': 'translateY(' + data + 'px)'
				}
			});
		}

		function main(){
			__initialize();
			__methodInitialize();
			__bindEvent();

			$('.setting-panel').on('mousewheel', function(event){
				$scope.$apply(function(){
					$scope.$broadcast('MOUSE_WHEEL_SCROLL', event.originalEvent.wheelDelta);
				});
			})

			// notify parent controller that I'm ready
			$scope.$emit('SETTING_CONTROLLER_LOADED');
		}

		main();
	}]);
})();