'use strict';

/**
 * @ngdoc service
 * @name initApp.Message
 * @description
 * # Message
 * Factory in the initApp.
 */
angular.module('initApp')
  .factory('Message', function ($firebaseArray) {
    function Message(snap){
      this.message_id = snap.key();
      this.message = snap.val();
    }


    Message.prototype = {
      update:function(snap){
        if(snap.val() !== this.message){
          this.message = snap.val();
          return true;
        }
        return false;
      },
      toJSON:function(){
        return this.message;
      }
    };

    return Message;

  });

angular.module('initApp')
  .factory('MessageFactory', function ($firebaseArray, Message) {
    return $firebaseArray.$extend({
      $$added: function(snap){
        return new Message(snap);
      },
      $$updated: function(snap){
        var msg = this.$getRecord(snap.key());
        return msg.update(snap);
      },
      $$getKey: function(rec){
        return rec.message_id;
      }
    });
  });

angular.module('initApp')
  .factory('MessageList', function (MessageFactory) {
    return function(ref){
      return new MessageFactory(ref);
    }
  });