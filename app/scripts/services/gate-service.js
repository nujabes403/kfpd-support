'use strict';

/**
 * @ngdoc service
 * @name initApp.gateService
 * @description
 * # gateService
 * Factory in the initApp.
 */
angular.module('initApp')
  .factory('GateService', function ($q, FBURL, $firebaseObject, $firebaseArray) {
    var gatesRef = new Firebase(FBURL).child('gates');
    var gaOptionRef = new Firebase(FBURL).child('gateOptions');

    // Public API here
    return {
      addNewGate: function (gateObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        var newDoor = gatesRef.push();
        newDoor.set(gateObj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      updateGate: function(gateObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        gateObj.$save().then(function(ref) {
          deferred.resolve('성공적으로 수정되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      },
      deleteGate: function(gateObj){
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        gateObj.$remove().then(function(ref) {
          deferred.resolve('성공적으로 삭제되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      findGate: function(doorId){
        return $firebaseObject(gatesRef.child(doorId));
      },
      listGate: function(limit, type){
        return $firebaseArray(gatesRef);
      },
      listOptions: function(){
        var deferred = $q.defer();
        $firebaseArray(gaOptionRef).$loaded()
          .then(function(data){
            deferred.resolve(data)
          })
          .catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      },
      createOptions: function(name){
        console.log(name);
        var deferred = $q.defer();
        var obj = {name:name, price:0, published: true};
        //deferred.notify('addNewFrame working with: ' + obj.name + '.');
        var newOption = gaOptionRef.child(name)
        newOption.set(obj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      deleteOptions: function(objId){
        var deferred = $q.defer();
        var target = gaOptionRef.child(objId);
        var onComplete = function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('해당 옵션을 삭제 하였습니다.')
          }
        };
        target.remove(onComplete);
        return deferred.promise;
      },
      updateOptions: function(objId, obj){
        var deferred = $q.defer();
        var target = gaOptionRef.child(objId);
        var onComplete = function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('해당 옵션을 저장하였습니다.');
          }
        };
        target.update(obj, onComplete);
        return deferred.promise;
      },
    };
  });
