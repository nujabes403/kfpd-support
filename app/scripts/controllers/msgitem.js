'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:MsgitemCtrl
 * @description
 * # MsgitemCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('MsgitemCtrl', function ($scope,$routeParams,MsgboardService,CheckAdminService,Auth) {
      $scope.isAdmin = false;
      $scope.userkey = $routeParams.userkey;
      $scope.msgItemKey =  $routeParams.msgItem;
      $scope.adminCheck = CheckAdminService.adminChecker;
      $scope.loadCurrentMsg = MsgboardService.loadCurrentMsg;
      $scope.unreadToRead = function(){
          MsgboardService.unreadToRead($scope.msgItemKey,Auth.$getAuth().uid);
      }
      
      //   Execute
      $scope.adminCheck().then(function(state){
          console.log(state);
          if(state == 'user'){
                $scope.isAdmin = false;
          } else if(state =='admin'){
                $scope.isAdmin = true;
          }
      });
      $scope.loadCurrentMsg($scope.msgItemKey).then(function(targetMsg){
          $scope.message = targetMsg;
      });
  });
