/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('ItemSearchCtrl', function ItemSearchCtrl($scope, $location, itemSvc) {
        
        $scope.searchResults = [];
        $scope.mostPopularItems = [];
    
        $scope.searchTerm = '';
        
        //Perform search when searchTerm changes
        $scope.$watch('searchTerm', function () {
            var term = $scope.searchTerm;
            
            if (term) {
                itemSvc.search(term).then(function (items) {
                    $scope.searchResults = items;
                });
            }
        });
    
        $scope.sortOptions = [
            { name: 'Catégorie', predicate: ['categoryWd', 'descriptorWd'] },
            { name: '-Catégorie', predicate: ['-categoryWd', 'descriptorWd'] },
            { name: 'Item', predicate: ['descriptorWd', 'categoryWd'] },
            { name: '-Item', predicate: ['-descriptorWd', 'categoryWd'] }
        ];
        
        $scope.sortPredicate = $scope.sortOptions[0];
        
        $scope.showDetailsFor = function (item) {
            $location.path('/items/' + item.id);
        };
        
        //Get top 5 popular items
        itemSvc.mostPopulars(5).then(function (items) {
            $scope.mostPopularItems = items;
        });
        
    });
}());




