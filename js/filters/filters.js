/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.filter('startIndex', function () {
        return function (input, index) {
            return input.slice(index);
        };
    });
    
    dtritus.filter('groupByKey', function () {
        return function (input, key) {
            
            return input.reduce(function (groups, item) {
                var groupValue = item[key],
                    coll = groups[groupValue];
                
                if (coll) {
                    coll.push(item);
                } else {
                    groups[groupValue] = [item];
                }
                
                return groups;
            }, {});
            
        };
    });
}());