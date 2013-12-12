/*global dtritus*/
/*jslint browser: true*/

(function () {
    'use strict';
    
    var initialSearchTermWatch = true;
    
    dtritus.controller('NavBarCtrl', function NavBarCtrl($scope, $rootScope, $location) {
        $scope.searchTerm = '';
        
        $scope.$watch('searchTerm', function () {
            
            //Prevent going back to the main page automatically when the application
            //loads from another route than root "/".
            if (!initialSearchTermWatch) {
                $location.path('/');
            } else {
                initialSearchTermWatch = false;
            }
            
            $rootScope.$emit('search', $scope.searchTerm);
        });
        
        $scope.clearSearch = function () {
            $scope.searchTerm = '';
        };
        
        $scope.showAbout = function () {
            //TODO: Why it doesn't work without the timeout?
            setTimeout(function () {
                $scope.$apply(function () {
                    $rootScope.showAbout = true;
                });
            }, 0);
        };
    });
    
}());