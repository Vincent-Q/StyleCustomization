(function(){
	var controlsModule = angular.module('controlsModule');

	controlsModule.controller('PageContainerController', ['$state', '$scope', function($state, $scope){
		$scope.selectedIndex = 0;
		$scope.isSettingDisplayed = false;

		$scope.controlList = [{
			'id': 'button',
			'label': 'Button and button list'
		}, {
			'id': 'typography',
			'label': 'Typography'
		}, {
			'id': 'list',
			'label': 'List and list group'
		}];

		$scope.selectControl = function(index){
			$scope.selectedIndex = index;
			$scope.$broadcast('CONTROL_SELECTED', $scope.selectedIndex);
		}

		$scope.showSetting = function(){
			$scope.$broadcast('SHOW_SETTING_PANEL');
		};

		$scope.$on('SETTING_PANEL_SHOWN', function(){
			$scope.isSettingDisplayed = true;
		});

		$scope.$on('SETTING_PANEL_HIDDEN', function(){
			$scope.isSettingDisplayed = false;
		});

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
	}]);
})();