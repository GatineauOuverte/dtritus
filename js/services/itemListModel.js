/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.factory('itemListModel', function () {
        return {
            searchResults: [],
            mostPopularItems: [],
            groupedSearchResults: [],
            showPopulars: true
        };
    });
    
}());