'use strict';

/**
 * @ngdoc service
 * @name initApp.msgboardService
 * @description
 * # msgboardService
 * Service in the initApp.
 */
angular.module('initApp')
  .service('MsgboardService', function ($q,FBURL,$firebaseObject,$routeParams,ADMINKEY) {
      var msgRef = new Firebase(FBURL).child('MESSAGES');
      var userRef = new Firebase(FBURL).child('users');
      var adminRef = new Firebase(FBURL).child('ADMIN');
      var unreadMsgRef = msgRef.child('UNREAD');
      var readMsgRef = msgRef.child('READ');
      var service = {
          addMsg:addMsg,
          msgKeyIntoUser:msgKeyIntoUser,
          loadCurrentMsg:loadCurrentMsg,
          loadAllUnreadMsg:loadAllUnreadMsg,
          loadAllMsgOfUser:loadAllMsgOfUser,
          unreadToRead:unreadToRead,
          decodeUserkey:decodeUserkey
      };

      return service;


      // Functions
      //   (Meaning)
      //   Decode : query through key in reference and get the data
          function addMsg(msgObj){
              var deferred = $q.defer();
              var newMsg = unreadMsgRef.push();
              newMsg.set(msgObj,function(error){
                  if(error){
                      deferred.reject(error);
                  } else{
                      deferred.resolve(newMsg.key());
                  }
              });
              return deferred.promise;
          }
          function msgKeyIntoUser(newMsgKey,targetUser){
              userRef.child(targetUser).child('msg').child(newMsgKey).set({
                  message:true
              },function(error){
                  if(error){
                      console.log(error);
                  }
              });
          }
          function loadAllMsgOfUser(targetUser){
              var deferred = $q.defer();
              userRef.child(targetUser).child('msg').once('value',function(snapshot){
                  decodeMsgKeys(snapshot).then(function(msgArr){
                      console.log(msgArr);
                      deferred.resolve(msgArr);
                  });
              });
              return deferred.promise;
          }
          function loadAllUnreadMsg(){
              var deferred = $q.defer();
              unreadMsgRef.once('value',function(unreadMsgs){
                 deferred.resolve(unreadMsgs.val());
              });
              return deferred.promise;
          }
          function loadCurrentMsg(targetMsgKey){
              var deferred = $q.defer();
              $firebaseObject(unreadMsgRef.child(targetMsgKey)).$loaded(function(targetMsg){
                  if(targetMsg.title){
                      console.log("FOUND IN UNREADMSG REF!");
                      deferred.resolve(targetMsg);
                  }
                  else {
                      $firebaseObject(readMsgRef.child(targetMsgKey)).$loaded(function(targetMsg){
                          if(targetMsg.title){
                              console.log("FOUND IN READMSG REF!");
                              deferred.resolve(targetMsg);
                          } else{
                              console.log("NO MESSAGE..");
                              deferred.reject('No Msg');
                          }
                      });
                  }
              });
              return deferred.promise;
          }
          function decodeMsgKeys(snapshot){
                  var deferred = $q.defer();
                  var msgArr = [];
                  var index = -1;
                  var numChildren = snapshot.numChildren();
                  snapshot.forEach(function(msgKeySnapshot){
                      var msgKey = msgKeySnapshot.key();
                      $firebaseObject(unreadMsgRef.child(msgKey)).$loaded(function(targetMsg){
                         if(targetMsg.title){
                             msgArr.push(targetMsg);
                             index++;
                         } else{
                             $firebaseObject(readMsgRef.child(msgKey)).$loaded(function(targetMsg){
                                 if(targetMsg.title){
                                     msgArr.push(targetMsg);
                                     index++;
                                 } else{
                                     console.log("NO MESSAGE");
                                 }
                             });
                         }
                         if(numChildren == index + 1){
                             deferred.resolve(msgArr);
                         }
                      });
                  });
                  return deferred.promise;
          }
          function decodeUserkey(userKey){
              var deferred = $q.defer();
              $firebaseObject(userRef.child(userKey)).$loaded(function(userKey){
                  deferred.resolve(userKey.email);
              });
              return deferred.promise;
          }
          function unreadToRead(unreadMsgKey,readerKey){
              var dt = new Date();
              var readAt = dt.getFullYear() + '년';
              readAt += (dt.getMonth() + 1) + '월';
              readAt += dt.getDate() +'일' ;
              readAt += dt.getHours() +'시';
              readAt += dt.getMinutes() + '분';
              $firebaseObject(unreadMsgRef.child(unreadMsgKey)).$loaded(function(unreadMsg){
                  readMsgRef.child(unreadMsgKey).set({
                      sender:unreadMsg.sender,
                      title:unreadMsg.title,
                      body:unreadMsg.body,
                      readAt:readAt,
                      readBy:readerKey
                  },function(){
                      console.log("UNREAD TO READ!");
                      unreadMsgRef.child(unreadMsg.$id).remove();
                  });
              });
          }
  });
