'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:OptionlistdialogCtrl
 * @description
 * # OptionlistdialogCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('OptionListDialogCtrl', function ($scope, $mdDialog, FBURL, $firebaseArray,
                                                FrameService, DoorService, GateService,
                                                target) {
    var optionRef = new Firebase(FBURL).child(target);
    console.log(target);
    $scope.options =  $firebaseArray(optionRef);
    $scope.updatePubStatus = function(index){
      $scope.options.$save(index);
    }
    $scope.answer = function(answer) {
      $scope.options.$save()
      $mdDialog.hide(answer);
    };
    $scope.deleteRecord = function(index){
      $scope.options.$remove(index);
    }
    $scope.createNewOption = function(newOptionName){
      if(target =='frameOptions')
        FrameService.createOptions(newOptionName)
      else if(target =='doorOptions'){
        console.log(newOptionName);
        DoorService.createOptions(newOptionName)
      }
      else if(target =='gateOptions'){
        console.log(newOptionName);
        GateService.createOptions(newOptionName)
      }

    }

  });