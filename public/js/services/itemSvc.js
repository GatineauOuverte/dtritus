/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.factory('itemSvc', function ($http, $filter) {
        
        var allItems = $http.get('data/dtritus.json');
        
        return {
            search: function (query) {
                return allItems.then(function (result) {
                    return $filter('filter')(result.data, query);
                });
            },
            
            getMostPopular: function (top) {
                //TODO: Implement most popular algorithm
                return allItems.then(function (result) {
                    return result.data.slice(0, top);
                });
            }
        };
    });
    
}());