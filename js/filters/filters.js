/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.filter('startIndex', function () {
        return function (input, index) {
            return input.slice(index);
        };
    });
}());