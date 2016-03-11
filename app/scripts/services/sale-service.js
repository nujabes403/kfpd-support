'use strict';

/**
 * @ngdoc service
 * @name initApp.SaleService
 * @description
 * # SaleService
 * Factory in the initApp.
 */
angular.module('initApp')
  .factory('SaleService', function ($q, FBURL, $firebaseObject, $firebaseArray) {
    var salesRef = new Firebase(FBURL).child('gates');

    // Public API here
    return {
      addNewSale: function (gateObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        var newDoor = salesRef.push();
        newDoor.set(gateObj, function(error) {
          if (error) {
            deferred.reject(error);
          } else {
            deferred.resolve('성공적으로 저장되었습니다.')
          }
        });
        return deferred.promise;
      },
      updateSale: function(gateObj) {
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        gateObj.$save().then(function(ref) {
          deferred.resolve('성공적으로 수정되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });

        return deferred.promise;
      },
      deleteSale: function(gateObj){
        var deferred = $q.defer();
        deferred.notify('addNewDoor working with: ' + gateObj.type + '.');
        gateObj.$remove().then(function(ref) {
          deferred.resolve('성공적으로 삭제되었습니다.')
        }, function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      },
      findSale: function(doorId){
        return $firebaseObject(salesRef.child(doorId));
      },
      listSale: function(limit, type){
        return $firebaseArray(salesRef);
      },


    };
  });
