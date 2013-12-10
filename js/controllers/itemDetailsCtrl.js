/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('ItemDetailsCtrl', function ItemDetailsCtrl($scope, $routeParams, itemSvc, $location) {
        $scope.item = null;
        
        itemSvc.findById($routeParams.itemId).then(function (item) {
            $scope.item = item;
        });

        $scope.goBack = function(){
          $location.path('#/');
        };
        
    });
}());




