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
			$scope.$broadcast('CONTROLLER_SELECTED', $scope.selectedIndex);
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
	}]);
})();