'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:DoorsDetailCtrl
 * @description
 * # DoorsDetailCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('DoorsDetailCtrl', function ($scope, $routeParams, $location, DoorService,
                                           $mdDialog, $mdMedia) {
    $scope.title = "문관리"
    $scope.action1="수정";
    $scope.action2="삭제";
    $scope.doorOptions = [];

    $scope.doorObj = DoorService.findDoor($routeParams.id);
    $scope.doorObj.$loaded().then(function(data){

      if(data.options !== undefined)
        $scope.doorOptions = data.options;
      else
        $scope.doorOptions = [];
    })

    //var promise = DoorService.listOptions();
    //promise.then(function(result){
    //  $scope.doorOptions = result;
    //})

    //Update
    $scope.action1Process = function(){
      $scope.doorObj.options = [];
      //resolve additional option information

      $scope.doorOptions.forEach(function(val){
        if(val.price > 0){
          var option = {name: val.name, price:val.price}
          $scope.doorObj.options.push(option)
        }
      })

      var promise = DoorService.updateDoor($scope.doorObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/doors");
      },function(error){
        alert('Error: '+ error);
      },function(update){
        console.log(update);
      });
    }
    //Delete
    $scope.action2Process = function(){
      var promise = DoorService.deleteDoor($scope.doorObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/doors");
      },function(error){
        alert('Error: '+ error);
      },function(update){
        console.log(update);
      });
    }

    $scope.showOptions = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: 'OptionListDialogCtrl',
          templateUrl: 'views/tmp/frameOptionList.tmp.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            target: 'doorOptions'
          },
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
  });
