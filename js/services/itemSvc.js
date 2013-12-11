/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.factory('itemSvc', function ($http, $filter) {
        
        var allItems = $http.get('data/dtritus.json'),
            querySplitRx = /\s+/;
        
        function createSearchRx(query) {
            return new RegExp('(?=.*'
                + query.split(querySplitRx).join(')(?=.*')
                + ').*', 'i');
        }
        
        return {
            search: function (query) {
                //TODO: Remove diacritics from query
                var queryRx = createSearchRx(query);
                
                return allItems.then(function (result) {
                    return $filter('filter')(result.data, function (item) {
                        return queryRx.test(item.categoryWd) || queryRx.test(item.descriptorWd);
                    });
                });
            },
            
            mostPopulars: function (top) {
                //TODO: Implement most popular algorithm
                return allItems.then(function (result) {
                    return result.data.slice(0, top);
                });
            },
            
            findById: function (id) {
                return allItems.then(function (result) {
                    return $filter('filter')(result.data, { id: id })[0] || null;
                });
            }
        };
    });
    
}());