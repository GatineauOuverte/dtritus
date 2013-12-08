/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.directive('routeTo', function ($location, $interpolate) {
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
}());