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
                //TODO: Implement real live data
                return allItems.then(function (result) {
                    var data = result.data;
                    
                    return [
                        data[159], //Branches de cèdres
                        data[368], //Four à micro-ondes
                        data[587], //Téléviseur
                        data[576], //Terre de jardin
                        data[328] //Cassette audio ou vidéo
                    ];
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