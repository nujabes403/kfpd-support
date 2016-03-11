'use strict';
/**
 * @ngdoc function
 * @name initApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Manages authentication to any active providers.
 */
angular.module('initApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $q, Ref, $timeout) {

    $scope.passwordLogin = function(email, pass) {
      $scope.err = null;
      Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true}).then(
        redirect, showError
      );
    };

    $scope.createAccount = function(email, pass, confirm) {
      $scope.err = null;
      if( !pass ) {
        $scope.err = 'Please enter a password';
      }
      else if( pass !== confirm ) {
        $scope.err = 'Passwords do not match';
      }
      else {
        Auth.$createUser({email: email, password: pass})
          .then(function () {
            // authenticate so we have permission to write to Firebase
            return Auth.$authWithPassword({email: email, password: pass}, {rememberMe: true});
          })
          .then(createProfile)
          .then(redirect, showError);
      }

      function createProfile(user) {
        var ref = Ref.child('users').child(user.uid), def = $q.defer();
        // (hoonil)
        // Added state for differentiating between user & admin.
        // user - 'user' | admin - 'admin'
        if(email.split('@')[1].split('.')[0] == 'admin'){
            ref = Ref.child('ADMIN').child(user.uid);
            ref.set({email: email, name: firstPartOfEmail(email), state:'admin'}, function(err) {
              $timeout(function() {
                if( err ) {
                  def.reject(err);
                }
                else {
                  def.resolve(ref);
                }
              });
            });
        } else{
            ref.set({email: email, name: firstPartOfEmail(email), state:'user'}, function(err) {
              $timeout(function() {
                if( err ) {
                  def.reject(err);
                }
                else {
                  def.resolve(ref);
                }
              });
            });
        }
        return def.promise;
      }
    };

    function firstPartOfEmail(email) {
      return ucfirst(email.substr(0, email.indexOf('@'))||'');
    }

    function ucfirst (str) {
      // inspired by: http://kevin.vanzonneveld.net
      str += '';
      var f = str.charAt(0).toUpperCase();
      return f + str.substr(1);
    }



    function redirect() {
      $location.path('/account');
    }

    function showError(err) {
      $scope.err = err;
    }


  });
