/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('MainCtrl', function MainCtrl($scope, $rootScope) {
        $scope.showAbout = false;
        
        $scope.hideAbout = function () {
            $scope.showAbout = false;
        };
        
        //TODO: Is there a better way to communicate this from a children controller?
        $rootScope.$on('showAbout', function () {
            setTimeout(function () {$scope.$apply(function () {
                $scope.showAbout = true;
            })}, 0);
        });
    });
    
}());