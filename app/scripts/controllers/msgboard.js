'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:MsgboardCtrl
 * @description
 * # MsgboardCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('MsgboardCtrl', function (FBURL,$scope,$timeout,$firebaseObject,MsgboardService,$routeParams,Auth,CheckAdminService) {
      var userRef = new Firebase(FBURL).child('users');
      $scope.userkey = $routeParams.userkey;
      $scope.adminCheck = CheckAdminService.adminChecker;
      $scope.pushMsg = pushMsg;

      //   Execute
      userRef.child($scope.userkey).on('value',function(){
          console.log("온");
          loadMsg();
      });

      $scope.adminCheck().then(function(state){
          if(state == 'admin'){
              $scope.isAdmin = true;
          } else{
              $scope.isAdmin = false;
          }
      });

      // Functions
      function loadMsg(){
          var promise = MsgboardService.loadAllMsgOfUser($scope.userkey);
          promise.then(function(allMsg){
                 console.log(allMsg);
                 $scope.messages = allMsg;
          });
      }
      function pushMsg(){
          var msgObj = {
              sender:Auth.$getAuth().uid || null,
              title:$scope.msgTitle,
              body:$scope.msgBody
          };
          var promise = MsgboardService.addMsg(msgObj);
          promise.then(function(msgKey){
              MsgboardService.msgKeyIntoUser(msgKey,$scope.userkey);
          });
      }
      function decodeUserkey(userkey){
              MsgboardService.decodeUserkey(userkey).then(function(userEmail){
                  console.log(userEmail);
                  return userEmail;
              });
      }
  });
