'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:PartDetailCtrl
 * @description
 * # PartDetailCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('PartDetailCtrl', function ($scope, $routeParams, $location, PartService) {
    $scope.title = "부속품 관리";
    $scope.action1="수정";
    $scope.action2="삭제";

    $scope.partObj = PartService.findPart($routeParams.id);

    //Update
    $scope.action1Process = function(){
      $scope.partObj.options = [];
      //resolve additional option information
      $scope.gateOptions.forEach(function(val){
        if(val.price > 0){
          var option = {name: val.name, price:val.price}
          $scope.partObj.options.push(option)
        }
      })

      var promise = PartService.updatePart($scope.partObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/gates");
      },function(error){
        alert('Error: '+ result);
      },function(update){
        console.log(update);
      });
    }
    //Delete
    $scope.action2Process = function(){
      var promise = PartService.deletePart($scope.partObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/gates");
      },function(error){
        alert('Error: '+ error);
      },function(update){
        console.log(update);
      });
    }

});
