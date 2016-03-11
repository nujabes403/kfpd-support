'use strict';

describe('Controller: MsgboardCtrl', function () {

  // load the controller's module
  beforeEach(module('initApp'));

  var MsgboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MsgboardCtrl = $controller('MsgboardCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
