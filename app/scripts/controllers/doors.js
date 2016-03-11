'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:DoorsCtrl
 * @description
 * # DoorsCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('DoorsCtrl', function ($scope, $location, DoorService, uiGridConstants) {
    $scope.doors = DoorService.listDoor();

    $scope.doors.$loaded().then(function(){
    })

    $scope.goToDetail = function(row){
      console.log(row)
      $location.path('doors-detail/edit/'+row.entity.$id);
    }

    $scope.gridOptions = {
      showGridFooter: true,
      //enableFiltering: true,
      rowTemplate: '<div ng-dblclick="grid.appScope.goToDetail(row)" ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
      '  <div ng-if="row.entity.merge">{{row.entity.title}}</div>' +
      '  <div ng-if="!row.entity.merge" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
      '</div>',
      columnDefs: [
        { field: 'type', displayName:'종류', cellFilter:'frameType', cellClass:'grid-align-center'},
        { field: 'doorType', displayName:'편개/양개', cellFilter:'frameDoorType', cellClass:'grid-align-center'},
        { field: 'thick',displayName: '철판', cellClass:'grid-align-end'},
        { field: 'width', displayName: '폭', cellClass:'grid-align-end'},
        { field: 'height', displayName:'높이', cellClass:'grid-align-end'},
        { field: 'orgPrice', displayName: '가격', cellFilter:'number', cellClass: 'grid-align-end' },
      ],
      data: $scope.doors
    };
  });
