'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:TaxCtrl
 * @description
 * # TaxCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('TaxCtrl', function ($scope, $firebaseArray, MessageList, FBURL) {
    var ref = new Firebase(FBURL).child('messages');
    $scope.msgList = MessageList(ref);
    $scope.msgs = $firebaseArray(ref);
    $scope.addNew = function(obj){
      //$scope.msgs.push(obj);
      $scope.msgList.$add({name:'12'});
      console.log($scope.msgList);
      $scope.msgList[0].update($scope.msgs[0])
    }
  });
