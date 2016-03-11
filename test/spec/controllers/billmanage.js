'use strict';

describe('Controller: BillmanageCtrl', function () {

  // load the controller's module
  beforeEach(module('initApp'));

  var BillmanageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BillmanageCtrl = $controller('BillmanageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
