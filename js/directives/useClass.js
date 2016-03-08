(function(){
	var styleCustomization = angular.module('styleCustomization');

	styleCustomization.directive('useClass', [function(){
		
		function link(scope, element, attrs){

			function updateClass(className, expression){
				if(scope.$eval(expression)){
					element.addClass(className);
				} else {
					element.removeClass(className);
				}
			}

			function watch(className, expression){
				scope.$watch(expression, function(){
					updateClass(className, expression);
				}, true);
			}

			var attArr = attrs['useClass'].split(';');

			for(var i=0; i<attArr.length; i++){
				var attrItemArr = attArr[i].split(':');
				var className = attrItemArr[0].trim();
				var expression = attrItemArr[1].trim();

				watch(className, expression);
			}
		}

		return {
			link:link
		};
	}]);
})();