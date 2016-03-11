(function(){
	var controlsModule = angular.module('controlsModule');
	
	controlsModule.controller('ButtonsController',['$state', '$scope', function($state, $scope){
		$scope.selectedIndex = -1;

		$scope.buttons = [{
			'snippet': '<button class="btn btn-default"><span class="glyphicon glyphicon-play"></span> Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-primary"><span class="glyphicon glyphicon-play"></span> Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-default">Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-primary">Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-primary"><span class="glyphicon glyphicon-play"></span> Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-default">Jetzt ansehen</button>'
		}, {
			'snippet': '<button class="btn btn-primary">Jetzt ansehen</button>'
		}];

		$scope.mouseEnter = function(index){
			$scope.selectedIndex = index;
		};

		$scope.mouseLeave = function(){
			$scope.selectedIndex = -1;
		};

		$scope.deleteButton = function(index){
			$scope.buttons.splice(index, 1);
		}
	}]);
})();