'use strict';

/**
 * @ngdoc service
 * @name initApp.checkAdmin
 * @description
 * # checkAdmin
 * Service in the initApp.
 */
angular.module('initApp')
  .factory('CheckAdminService', function (FBURL,$firebaseObject,$q,ADMINKEY,Auth) {
      return {
          adminChecker:adminChecker
      };

      // Functions
      function adminChecker(){
          var authData = Auth.$getAuth();
          var deferred = $q.defer();
          if(authData){
              var uid = authData.uid;
              if(uid == ADMINKEY){
                  deferred.resolve('admin');
              } else{
                  deferred.resolve('user');
              }
          }
        return deferred.promise;
      }
  });
