'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:GatesCtrl
 * @description
 * # GatesCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('GatesCtrl', function ($scope, $location, GateService) {
    $scope.gates = GateService.listGate();
    $scope.goToDetail = function(id){
      $location.path('gate-detail/edit/'+id);
    }
  });
