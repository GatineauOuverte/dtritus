/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('ItemCtrl', function ItemCtrl($scope, itemSvc) {
           
        $scope.items = [];
        
        itemSvc.getAll()
            .success(function (items) {
                $scope.items = items;
            })
            .error(function () {
                //TODO: Handle failure
            });
    
        $scope.searchTerm = '';
    
        $scope.sortOptions = [
            { name: 'Catégorie', predicate: ['categoryWd', 'descriptorWd'] },
            { name: '-Catégorie', predicate: ['-categoryWd', 'descriptorWd'] },
            { name: 'Item', predicate: ['descriptorWd', 'categoryWd'] },
            { name: '-Item', predicate: ['-descriptorWd', 'categoryWd'] }
        ];
        
        $scope.sortPredicate = $scope.sortOptions[0];
        
    });
}());




