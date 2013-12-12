/*global dtritus*/
/*jslint browser: true*/

(function () {
    'use strict';
    
    dtritus.controller('NavBarCtrl', function NavBarCtrl($scope, $rootScope, $location) {
        $scope.searchTerm = '';
        
        $scope.$watch('searchTerm', function () {
            $location.path('/');
            
            $rootScope.$emit('search', $scope.searchTerm);
        });
        
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