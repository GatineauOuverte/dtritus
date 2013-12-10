/*global angular, window*/


(function (global) {
    'use strict';
    
    global.dtritus = angular.module('dtritus', ['ngRoute'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/search.html',
                    controller: 'ItemSearchCtrl'
                })
                .when('/items/:itemId', {
                    templateUrl: 'partials/item-details.html',
                    controller: 'ItemDetailsCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
}(window));