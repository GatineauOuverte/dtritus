/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('NavBarCtrl', function NavBarCtrl($scope, $rootScope, $location) {
        $scope.searchTerm = '';
        
        $scope.$watch('searchTerm', function () {
            $location.path('/');
            
            $rootScope.$emit('search', $scope.searchTerm);
        });
        
        $scope.showAbout = function () {
            $rootScope.$emit('showAbout');
        };
    });
    
}());