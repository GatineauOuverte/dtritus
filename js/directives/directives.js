/*global dtritus, angular*/
/*jslint browser: true*/

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
        })
        .directive('footerInTime', function () {
            return {
                restrict: 'A',
                scope: {
                    'options': '@footerInTime'
                },
                link: function (scope, element, attrs) {
                    var options = scope.$eval(scope.options),
                        scrollTargetEl = document.querySelector(options.scrollTarget),
                        hideDuration = scope.hideDuration || 1200,
                        hidden = false,
                        lastScrollTop = scrollTargetEl.scrollTop,
                        showTimerId;
                    
                    angular.element(scrollTargetEl).on("scroll", function (e) {
                        
                        if ((this.offsetHeight + this.scrollTop) >= this.scrollHeight) {
                            element.addClass('footer-in-time-bottom');
                            clearTimeout(showTimerId);
                            hidden = false;
                            
                        } else if (lastScrollTop < this.scrollTop) {
                            if (!hidden) {
                                element.removeClass('footer-in-time-bottom');
                                element.addClass('footer-in-time-hide');
                            }
                            
                            clearTimeout(showTimerId);
                            
                            showTimerId = setTimeout(function () {
                                element.removeClass('footer-in-time-hide');
                                hidden = false;
                            }, hideDuration);
                            
                        }
                        
                        lastScrollTop = this.scrollTop;
                    });
                }
            };
        });
}());