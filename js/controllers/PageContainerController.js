(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('PageContainerController', ['$state', '$scope', function($state, $scope){
		
		function __initialize(){
			$scope.selectedIndex = 0;
			$scope.isSettingDisplayed = false;

			$scope.controlList = [{
				'id': 'button',
				'label': 'Button and button list',
				'fileUrl': 'less/customized/buttons-c.less'
			}, {
				'id': 'typography',
				'label': 'Typography',
				'fileUrl': 'less/customized/buttons-c.less'
			}, {
				'id': 'list',
				'label': 'List and list group',
				'fileUrl': 'less/customized/buttons-c.less'
			}];
		}

		function __methodInitialize(){
			$scope.selectControl = function(index){
				$scope.selectedIndex = index;
				$scope.$broadcast('CONTROL_SELECTED', $scope.controlList[$scope.selectedIndex]);
			}

			$scope.showSetting = function(){
				$scope.$broadcast('SHOW_SETTING_PANEL');
			};
		}

		function __bindEvent(){
			$scope.$on('SETTING_PANEL_SHOWN', function(){
				$scope.isSettingDisplayed = true;
			});

			$scope.$on('SETTING_PANEL_HIDDEN', function(){
				$scope.isSettingDisplayed = false;
			});

			$scope.$on('SETTING_CONTROLLER_LOADED', function(){
				$scope.selectControl(0);
			});
		}

		function __copyMethodDefine(){
			/************************************************************************
			 ***********************BEGIN : copy behavior****************************
			 ************************************************************************/
			var snippet = '';
			var zeroClient;
			var bindCopyEvent = function(){
				zeroClient = new ZeroClipboard();

				zeroClient.on('ready', function(event){
					zeroClient.on('copy', function(event){
						$scope.$broadcast('REQUEST_SNIPPET');
						event.clipboardData.setData('text/plain', snippet);
					});
				});

				zeroClient.on('error', function(){
					ZeroClipboard.destroy();
				});
			}

			bindCopyEvent();

			$scope.$on('REPLY_SNIPPET', function(event, data){
				snippet = data;
			});

			$scope.$on('SINGLE_CONTROL_SELECTED', function(){
				zeroClient.clip(document.getElementsByClassName('btn-copy'));
			})

			/************************************************************************
			 *************************End : copy behavior****************************
			 ************************************************************************/
		}

		function main(){
			__initialize();
			__methodInitialize();
			__bindEvent();

			__copyMethodDefine();
		}

		main();
	}]);
})();