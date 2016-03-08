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
			$scope.selectedControlSetting = fetchControlSettingData();
		}

		$scope.showSetting = function(){
			$scope.isSettingDisplayed = true;
		};

		$scope.toggleSetting = function(){
			if($scope.isSettingDisplayed){
				$scope.isSettingDisplayed = false;
			} else {
				$scope.isSettingDisplayed = true;
			}
		};

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

		$scope.selectedControlSetting = fetchControlSettingData();
	}]);
})();