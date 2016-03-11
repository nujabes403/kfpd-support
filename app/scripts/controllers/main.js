'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('MainCtrl', function ($scope, FBURL, $firebaseObject) {
    $scope.myData = [
      {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
      },
      {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
      },
      {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
      }];
  });
