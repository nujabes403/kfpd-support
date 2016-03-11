'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:GateNewCtrl
 * @description
 * # GateNewCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('GateNewCtrl', function ($scope, $mdMedia, $mdDialog, GateService) {
    $scope.title = "기성문등록";
    $scope.action1="등록";
    $scope.action2="취소";

    var promise = GateService.listOptions();
    promise.then(function(result){
      $scope.gateOptions = result;
    })

    //Create
    $scope.action1Process = function(){
      $scope.gateObj.options = [];
      //resolve additional option information
      $scope.gateOptions.forEach(function(val){
        if(val.price > 0){
          var option = {name: val.name, price:val.price}
          $scope.gateObj.options.push(option)
        }
      })

      var promise = GateService.addNewGate($scope.gateObj);
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
      $scope.gateObj = null;
    }

    $scope.showOptions = function(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: 'OptionListDialogCtrl',
          templateUrl: 'views/tmp/frameOptionList.tmp.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            target: 'gateOptions'
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


    var getOptions = function(){
      GateService.listOptions().then(function(result){
        $scope.gateOptions = result;
      },function(error){
        alert('Error: '+ error);
      },function(update){
        console.log(update);
      });
    }

    getOptions();
  });
