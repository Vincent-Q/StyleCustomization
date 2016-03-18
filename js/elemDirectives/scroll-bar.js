(function(){
	var styleCustomization = angular.module('styleCustomization');

	styleCustomization.directive('scrollBar', ['$timeout', function($timeout){
		return {
			template: '<div class="scroll-bar" ng-show="contentMovableDistance > 0">' +
						'<div class="cursor" ng-mousedown="mouseDown($event)" ng-style="position"></div>' +
    				  '</div>',
    		link: function(scope, element, attrs){
    			var cursorMovableDistance;

    			function __calculateContentArea(){
    				var contentAreaHeight = $(scope.option.contentArea).height(), 
    					contentContainerHeight = $(scope.option.contentContainer).height();

    				scope.contentMovableDistance = contentAreaHeight - contentContainerHeight;
    			}

    			function __calculateScrollBarArea(){
    				if(scope.contentMovableDistance <= 0){
    					scope.__setPosition(0);
    					return;
    				}

    				var cursorMinHeight = 30;
    				var scrollBarHeight = element.find('.scroll-bar').height(),
    					cursorHeight;

    				if(scrollBarHeight - scope.contentMovableDistance > cursorMinHeight){
    					cursorMovableDistance = scope.contentMovableDistance;
    				} else {
    					cursorMovableDistance = scrollBarHeight - cursorMinHeight;
    				}

    				cursorHeight = scrollBarHeight - cursorMovableDistance;
    				element.find('.cursor').height(cursorHeight);

    				if(cursorHeight + scope.__positionValue > scrollBarHeight){
    					scope.__setPosition(scrollBarHeight - cursorHeight);
    				}
    			}

    			function __calculate(){
    				__calculateContentArea();
    				$timeout(__calculateScrollBarArea);
    			}

    			function __calculateContentPosition(cursorPosition){
    				return -1 * scope.contentMovableDistance * cursorPosition / cursorMovableDistance;
    			}

    			function __initialize(){
    				scope.isMouseDown = false;
    				scope.position = {
	    				'transform': 'translateY(0)'
	    			};

	    			scope.contentMovableDistance = 0;
	    			scope.__lastReleasedPosition = 0;
	    			scope.__positionValue = 0;
    			}

    			function __methodInitialize(){
    				scope.mouseDown = function(event){
    					scope.__firstPageY = event.pageY;
	    				scope.isMouseDown = true;
	    			};

	    			scope.__setPosition = function(newPosition){
	    				scope.__positionValue = newPosition;

	    				if(scope.__positionValue <=0){
    						scope.__positionValue = 0;
    					}

    					if(scope.__positionValue >= cursorMovableDistance){
    						scope.__positionValue = cursorMovableDistance;
    					}

    					scope.$emit('SCROLL_BAR_MOVING', __calculateContentPosition(scope.__positionValue));

						scope.position = {
							'transform': 'translateY(' + scope.__positionValue + 'px)'
						}
	    			}
    			}

    			function __bindEvent(){
    				scope.$on('MOUSE_IS_RELEASED', function(){
	    				scope.isMouseDown = false;
	    				scope.__lastReleasedPosition = scope.__positionValue;
	    			});

	    			scope.$on('MOUSE_IS_MOVING', function(event, data){
	    				if(scope.isMouseDown){
	    					scope.__setPosition(data.pageY - scope.__firstPageY + scope.__lastReleasedPosition);
						}
	    			});

	    			scope.$on('CONTENT_AREA_CHANGE', function(event, data){
	    				__calculate();
	    			});

	    			scope.$on('MOUSE_WHEEL_SCROLL', function(event, delta){
	    				if(delta > 0){
	    					scope.__setPosition(scope.__positionValue - 15);
	    				} else {
	    					scope.__setPosition(scope.__positionValue + 15);
	    				}

	    				scope.__lastReleasedPosition = scope.__positionValue;
	    			});
    			}

    			function main(){
    				__initialize();
    				__methodInitialize();
    				__bindEvent();

    				__calculate();
    			}

    			main();
    		},
    		scope: {
    			option: "=sbInit"
    		}
		}
	}]);
})();