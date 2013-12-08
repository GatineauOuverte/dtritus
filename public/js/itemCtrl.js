/*global toptaltodo, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
dtritus.controller('ItemCtrl', function TodoCtrl($scope, $location, $http) {
	$scope.items = [];//itemSvc.get();

	$scope.searchTerm = '';

	$scope.sortOrders=[
		{name:'Catégorie', predicate:['categoryWd','materialWd']},
		{name:'-Catégorie', predicate:['-categoryWd','materialWd']},
		{name:'Mot-clés', predicate:['materialWd','categoryWd']},
		{name:'-Mot-clés', predicate:['-materialWd','categoryWd']}
	];
	$scope.sortPredicate=$scope.sortOrders[0];


	$scope.$watch('todos', function (newValue, oldValue) {
		$scope.itemCount = $scope.items.length;
	}, true);

    function loadAll(){
    	//$scope.items = [{'Mot-cles':'Alex'},{'Mot-cles':'Dan'},{'Mot-cles':'Steph'}];
		$http({
			method: 'GET',
			url: 'data/dtritus.json'
		}).
		success(function(data, status, headers, config) {
			//console.log(data);
			$scope.items=data;
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
    }
    loadAll();

});