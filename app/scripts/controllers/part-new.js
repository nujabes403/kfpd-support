'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:PartNewCtrl
 * @description
 * # PartNewCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('PartNewCtrl', function ($scope, $location, PartService) {
    $scope.title = "부속품 등록";
    $scope.action1="등록";
    $scope.action2="취소";

    //Create
    $scope.action1Process = function(){
      var promise = PartService.addNewPart($scope.partObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/gates");
      },function(error){
        alert('Error: '+ result);
      },function(update){
        console.log(update);
      });
    }
    //Cancel
    $scope.action2Process = function(){
      $scope.partObj = null;
    }
  });
