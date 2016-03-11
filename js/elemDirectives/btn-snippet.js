(function(){
	var styleCustomization = angular.module('styleCustomization');

	styleCustomization.directive('btnSnippet', [function(){
		return {
			template: '<div class="vertical-block"></div>',
			link: function(scope, element, attrs){
				var option = scope.option;
				element.html(option.snippet);
			},
			scope: {
				option:'=btnInit'
			}
		}
	}]);
})();