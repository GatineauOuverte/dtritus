/*global angular, dtritus*/

(function () {
    'use strict';
    
    function createProxyPropertyOn(proxyObj, sourceObj, prop) {
        Object.defineProperty(proxyObj, prop, {
            get: function () { return sourceObj[prop]; },
            set: function (value) { sourceObj[prop] = value; }
        });
    }
    
    function groupByKey(items, key, mutateGroupFn) {
        var indexMap = {};
        
        return items.reduce(function (groups, item) {
            var groupValue = item[key],
                groupEntry = groups[indexMap[groupValue]];
            
            if (!groupEntry) {
                groupEntry = { items: [] };
                groupEntry[key] = groupValue;
                indexMap[groupValue] = groups.push(groupEntry) - 1;
                
                if (mutateGroupFn) {
                    mutateGroupFn(groupEntry);
                }
            }
            
            groupEntry.items.push(item);
            
            return groups;
        }, []);
    }
    
    dtritus.controller('ItemListCtrl', function ItemListCtrl($scope, $rootScope, $filter, itemSvc, itemListModel) {
        var model = $scope.model = itemListModel,
            limitTo = $filter('limitTo'),
            orderBy = $filter('orderBy');
        
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
                    
                    //Provide a grouped collection
                    if (items.length > 10) {
                        
                        $scope.groupedSearchResults = groupByKey(
                            limitTo(orderBy(items.slice(4), ['category', 'descriptor']), 25),
                            'category',
                            function (groupEntry) {
                                groupEntry.collapsed = true;
                            }
                        );
                        
                    } else {
                        $scope.groupedSearchResults = [];
                    }
                    
                });
            }
        });
        
        //Load top 5 most popular items
        itemSvc.mostPopulars(5).then(function (items) {
            $scope.mostPopularItems = items;
        });
        
        $scope.toggleExpand = function (groupEntry) {
            groupEntry.collapsed = !groupEntry.collapsed;
        };
        
    });
}());




