/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.factory('itemSvc', function ($http) {
        
        return {
            getAll: function () {
                return $http.get('data/dtritus.json');
            }
        };
        
    });
    
}());