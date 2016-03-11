'use strict';

/**
 * @ngdoc service
 * @name initApp.partService
 * @description
 * # partService
 * Factory in the initApp.
 */
angular.module('initApp')
  .factory('PartService', function ($q, FBURL, $firebaseObject, $firebaseArray) {
    var partsRef = new Firebase(FBURL).child('parts');
    var paOptionRef = new Firebase(FBURL).child('partOptions');

    // Public API here
    return {
      addNewPart: function (partObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + partObj.type + '.');
        var newDoor = partsRef.push();
        newDoor.set(partObj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      updatePart: function(partObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + partObj.name + '.');
        partObj.$save().then(function(ref) {
          deferred.resolve('성공적으로 수정되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      },
      deletePart: function(partObj){
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + partObj.name + '.');
        partObj.$remove().then(function(ref) {
          deferred.resolve('성공적으로 삭제되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      findPart: function(doorId){
        return $firebaseObject(partsRef.child(doorId));
      },
      listPart: function(limit, type){
        return $firebaseArray(partsRef);
      },
      //listOptions: function(){
      //  var deferred = $q.defer();
      //  $firebaseArray(paOptionRef).$loaded()
      //    .then(function(data){
      //      deferred.resolve(data)
      //    })
      //    .catch(function(error) {
      //      deferred.reject(error);
      //    });
      //  return deferred.promise;
      //},
      //createOptions: function(name){
      //  console.log(name);
      //  var deferred = $q.defer();
      //  var obj = {name:name, price:0, published: true};
      //  //deferred.notify('addNewFrame working with: ' + obj.name + '.');
      //  var newOption = paOptionRef.child(name)
      //  newOption.set(obj, function(error) {
      //    if (error) {
      //      deferred.reject(error);
      //    } else {
      //      deferred.resolve('성공적으로 저장되었습니다.')
      //    }
      //  });
      //  return deferred.promise;
      //},
      //deleteOptions: function(objId){
      //  var deferred = $q.defer();
      //  var target = paOptionRef.child(objId);
      //  var onComplete = function(error) {
      //    if (error) {
      //      deferred.reject(error);
      //    } else {
      //      deferred.resolve('해당 옵션을 삭제 하였습니다.')
      //    }
      //  };
      //  target.remove(onComplete);
      //  return deferred.promise;
      //},
      //updateOptions: function(objId, obj){
      //  var deferred = $q.defer();
      //  var target = paOptionRef.child(objId);
      //  var onComplete = function(error) {
      //    if (error) {
      //      deferred.reject(error);
      //    } else {
      //      deferred.resolve('해당 옵션을 저장하였습니다.');
      //    }
      //  };
      //  target.update(obj, onComplete);
      //  return deferred.promise;
      //},
    };
  });
