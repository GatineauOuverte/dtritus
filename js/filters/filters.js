/*global dtritus*/

(function () {
    'use strict';
    
    dtritus.filter('startIndex', function () {
        return function (input, index) {
            console.log(arguments);
            return input.slice(index);
        };
    });
}());