'use strict';

/**
 * @ngdoc function
 * @name initApp.controller:SaleNewCtrl
 * @description
 * # SaleNewCtrl
 * Controller of the initApp
 */
angular.module('initApp')
  .controller('SaleNewCtrl', function ($scope, $location, $mdMedia, $mdDialog,
                                       $timeout, $q, $log,
                                       FBURL,$firebaseArray,
                                       SaleService) {
    $scope.title = '주문등록';
    $scope.action1 = "등록";
    $scope.action2 = "취소";

    //Create
    $scope.action1Process = function(){

      var promise = SaleService.addNewSale($scope.saleObj);
      promise.then(function(result){
        alert('Success: '+ result);
        $location.path("/sales");
      },function(error){
        alert('Error: '+ result);
      },function(update){
        console.log(update);
      });
    }

    $scope.openDialog = function(ev, type) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
      $mdDialog.show({
          controller: 'ProductFormDialogCtrl',
          templateUrl: 'views/tmp/productFormDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          locals: {
            target: 'gateOptions',
            type: type
          },
          clickOutsideToClose:true,
          fullscreen: useFullScreen
        })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
      $scope.$watch(function() {
        return $mdMedia('xs') || $mdMedia('sm');
      }, function(wantsFullScreen) {
        $scope.customFullscreen = (wantsFullScreen === true);
      });
    };
    //Cancel
    $scope.action2Process = function(){
      $scope.saleObj = null;
    }


    $scope.simulateQuery = true;
    $scope.isDisabled    = false;
    // list of `state` value/display objects
    $scope.querySearch   = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange   = searchTextChange;
    $scope.newState = newState;
    function newState(state) {
      alert("Sorry! You'll need to create a Constituion for " + state + " first!");
    }
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query) {
      var results = query ? $scope.states.filter( createFilterFor(query) ) : $scope.states,
        deferred;
      if ($scope.simulateQuery) {
        deferred = $q.defer();
        var cstRef = new Firebase(FBURL).child('customers')
        var cstResult = $firebaseArray(cstRef)
        cstResult.$loaded().then(function(data){
          deferred.resolve( data );
        })
        return deferred.promise;
      } else {
        return cstResult;
      }
    }
    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }
    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(state) {
        return (state.value.indexOf(lowercaseQuery) === 0);
      };
    }

  });
