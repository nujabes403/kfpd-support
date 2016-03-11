'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:PartsCtrl
 * @description
 * # PartsCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('PartsCtrl', function ($scope, $location, PartService) {
    $scope.parts = PartService.listPart();

    $scope.goToDetail = function(row){
      console.log(row)
      $location.path('part-detail/edit/'+row.entity.$id);
    }

    $scope.gridOptions = {
      showGridFooter: true,
      //enableFiltering: true,
      rowTemplate: '<div ng-dblclick="grid.appScope.goToDetail(row)" ng-class="{ \'my-css-class\': grid.appScope.rowFormatter( row ) }">' +
      '  <div ng-if="row.entity.merge">{{row.entity.title}}</div>' +
      '  <div ng-if="!row.entity.merge" ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell" ng-class="{ \'ui-grid-row-header-cell\': col.isRowHeader }"  ui-grid-cell></div>' +
      '</div>',
      columnDefs: [
        { field: 'name', displayName:'품명', cellClass:'grid-align-center'},
        { field: 'standard', displayName:'규격',cellClass:'grid-align-center'},
        { field: 'orgPrice',displayName: '가격', cellClass:'grid-align-end', cellFilter:'number',},
        { field: 'note', displayName: '비고', cellClass:'grid-align-end'},
      ],
      data: $scope.parts
    };
  });
