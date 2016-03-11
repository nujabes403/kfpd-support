'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('ProductCtrl', function ($scope, $location) {

    $scope.goTo = function(pathName){
      $location.path(pathName);
    }
  });
