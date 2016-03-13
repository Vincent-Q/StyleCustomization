(function(){
	var controlsModule = angular.module('controlsModule');
	
	controlsModule.controller('ButtonsController',['$state', '$scope', '$timeout', function($state, $scope, $timeout){
		$scope.selectedIndex = -1;
		$scope.isCopied = false;

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
			$scope.$emit('SINGLE_CONTROL_SELECTED');
		};

		$scope.mouseLeave = function(){
			$scope.selectedIndex = -1;
		};

		$scope.deleteButton = function(index){
			$scope.buttons.splice(index, 1);
		}

		$scope.copy = function(){
			$scope.isCopied = true;

			$timeout(function(){
				$scope.isCopied = false;
			}, 2000);
		}

		var getSnippet = function(){
			if($scope.selectedIndex !== -1){
				return $scope.buttons[$scope.selectedIndex].snippet;
			}

			return '';
		}

		$scope.$on('REQUEST_SNIPPET', function(){
			$scope.$emit('REPLY_SNIPPET', getSnippet());
		});
	}]);
})();