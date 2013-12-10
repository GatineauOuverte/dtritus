/*global dtritus*/
/*jslint plusplus: true*/

(function () {
    'use strict';
    
    dtritus.controller('ItemSearchCtrl', function ItemSearchCtrl($scope, $location, itemSvc, sharedStateSvc) {
        
        
        $scope.searchResults = sharedStateSvc.searchResults || [];
        $scope.mostPopularItems = [];
    
        $scope.searchTerm = sharedStateSvc.searchTerm || '';
        
        //Perform search when searchTerm changes
        $scope.$watch('searchTerm', function () {
            var term = sharedStateSvc.searchTerm = $scope.searchTerm;
            
            if (term) {
                itemSvc.search(term).then(function (items) {
                    sharedStateSvc.searchResults = $scope.searchResults = items;
                });
            }
        });
    
        var sortOptions = $scope.sortOptions = [
            { name: 'Catégorie', predicate: ['categoryWd', 'descriptorWd'] },
            { name: '-Catégorie', predicate: ['-categoryWd', 'descriptorWd'] },
            { name: 'Item', predicate: ['descriptorWd', 'categoryWd'] },
            { name: '-Item', predicate: ['-descriptorWd', 'categoryWd'] }
        ];
        
        $scope.sortPredicate = $scope.sortOptions[sharedStateSvc.sortPredicateIndex || 0];
        
        $scope.$watch('sortPredicate', function () {
            var i = sortOptions.length,
                sortPredicate = $scope.sortPredicate;
            
            while (i--) {
                if (sortOptions[i] === sortPredicate) {
                    sharedStateSvc.sortPredicateIndex = i;
                    break;
                }
            }
        });
        
        $scope.showDetailsFor = function (item) {
            $location.path('/items/' + item.id);
        };
        
        //Get top 5 popular items
        itemSvc.mostPopulars(5).then(function (items) {
            $scope.mostPopularItems = items;
        });
        
    });
}());




