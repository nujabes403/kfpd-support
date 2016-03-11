'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:GateDetailCtrl
 * @description
 * # GateDetailCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('GateDetailCtrl', function ($scope, $routeParams, $location, $mdMedia, $mdDialog, GateService) {
    $scope.title = "기성문관리";
    $scope.action1="수정";
    $scope.action2="삭제";

    $scope.gateObj = GateService.findGate($routeParams.id);
    $scope.gateObj.$loaded().then(function(data){
      $scope.gateOptions = data.options;
    })

    var promise = GateService.listOptions();
    promise.then(function(result){
      $scope.gateOptions = result;
    })

    //Update
    $scope.action1Process = function(){
      $scope.gateObj.options = [];
      //resolve additional option information
      $scope.gateOptions.forEach(function(val){
        if(val.price > 0){
          var option = {name: val.name, price:val.price}
          $scope.gateObj.options.push(option)
        }
      })

      var promise = GateService.updateGate($scope.gateObj);
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
      var promise = GateService.deleteGate($scope.gateObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/gates");
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
