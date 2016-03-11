'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:DoorsNewCtrl
 * @description
 * # DoorsNewCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('DoorsNewCtrl', function ($scope, $location, $mdMedia, $mdDialog, DoorService) {
    $scope.title = "문등록";
    $scope.action1="등록";
    $scope.action2="취소";

    var promise = DoorService.listOptions();
    promise.then(function(result){
      $scope.doorOptions = result;
    })

    //Create
    $scope.action1Process = function(){
      $scope.doorObj.options = [];
      //resolve additional option information
      $scope.doorOptions.forEach(function(val){
        if(val.price > 0){
          var option = {name: val.name, price:val.price}
          $scope.doorObj.options.push(option)
        }
      })

      var promise = DoorService.addNewDoor($scope.doorObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/doors");
      },function(error){
        alert('Error: '+ result);
      },function(update){
        console.log(update);
      });
    }
    //Cancel
    $scope.action2Process = function(){
      $scope.doorObj = null;
    }

    var getOptions = function(){
      DoorService.listOptions().then(function(result){
        $scope.doorOptions = result;
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

    getOptions();

  });
