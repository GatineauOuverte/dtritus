/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('NavBarCtrl', function NavBarCtrl($scope, $rootScope) {
        $scope.searchTerm = '';
        
        $scope.$watch('searchTerm', function () {
            $rootScope.$emit('search', $scope.searchTerm);
        });
    });
}());




