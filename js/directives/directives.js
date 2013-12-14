/*global dtritus*/

(function () {
    'use strict';
    
    dtritus
        .directive('routeTo', function ($location, $interpolate) {
            return {
                restrict: 'A',
                
                link: function (scope, element, attrs) {
                    element.on('click', function () {
                        var expr = $interpolate(attrs.routeTo);
                        
                        scope.$apply(function () {
                            $location.path(expr(scope));
                        });
                        
                    });
                }
            };
        });
        //TODO: Implement fading header when scrolling
        /*
        .directive("scrollReact", function ($window) {
            return {
                restrict: 'A',
                
                link: function (scope, element, attrs) {
                    
                }
            };
            return function(scope, element, attrs) {
                
                angular.element($window).bind("scroll", function() {
                     if (this.pageYOffset >= 100) {
                         scope.boolChangeClass = true;
                         console.log('Scrolled below header.');
                     } else {
                         scope.boolChangeClass = false;
                         console.log('Header is in view.');
                     }
                    scope.$apply();
                });
            };
        });
        */
}());