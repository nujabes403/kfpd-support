'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:MsgboardadminctrlCtrl
 * @description
 * # MsgboardadminctrlCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('MsgboardadminCtrl', function ($scope,MsgboardService) {
      $scope.loadAllUnreadMsg = MsgboardService.loadAllUnreadMsg;
      //   Execute
      $scope.loadAllUnreadMsg().then(function(unreadMsgArr){
          $scope.unreadMsgs = unreadMsgArr;
      });
  });
