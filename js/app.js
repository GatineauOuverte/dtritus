/*global angular, window*/


(function (global) {
    'use strict';
    
    global.dtritus = angular.module('dtritus', ['ngRoute', 'angularSlideables'])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'partials/item-list.html',
                    controller: 'ItemListCtrl'
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