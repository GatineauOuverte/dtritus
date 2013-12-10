/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.controller('ItemListCtrl', function ItemListCtrl($scope, $location, $rootScope, itemSvc, itemListModel) {
        var model = $scope.model = itemListModel;
        
        $scope.showPopulars = true;
        
        $rootScope.$on('search', function (e, term) {
            $scope.showPopulars = !term;
            
            if (term) {
                itemSvc.search(term).then(function (items) {
                    itemListModel.searchResults = items;
                });
            }
        });
        
        //Load top 5 most popular items
        itemSvc.mostPopulars(5).then(function (items) {
            $scope.model.mostPopularItems = items;
        });
        
        //Easier view access
        Object.defineProperties($scope, {
            searchResults: {
                get: function () { return model.searchResults; }
            },
            
            mostPopularItems: {
                get: function () { return model.mostPopularItems; }
            },
            
            searchCount: {
                get: function () { return model.searchResults.length; }
            }
        });
        
    });
}());




