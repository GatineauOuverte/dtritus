/*global angular, dtritus*/

(function () {
    'use strict';
    
    function createProxyPropertyOn(proxyObj, sourceObj, prop) {
        Object.defineProperty(proxyObj, prop, {
            get: function () { return sourceObj[prop]; },
            set: function (value) { sourceObj[prop] = value; }
        });
    }
    
    dtritus.controller('ItemListCtrl', function ItemListCtrl($scope, $rootScope, itemSvc, itemListModel) {
        var model = $scope.model = itemListModel;
        
        //Make itemListModel properties accessible on the scope
        angular.forEach(itemListModel, function (value, key) {
            createProxyPropertyOn($scope, model, key);
        });
        
        Object.defineProperty($scope, 'searchCount', {
            get: function () {
                return $scope.searchResults.length;
            }
        });
        
        $rootScope.$on('search', function (e, term) {
            $scope.showPopulars = !term;
            
            if (term) {
                itemSvc.search(term).then(function (items) {
                    $scope.searchResults = items;
                });
            }
        });
        
        //Load top 5 most popular items
        itemSvc.mostPopulars(5).then(function (items) {
            $scope.mostPopularItems = items;
        });
        
    });
}());




