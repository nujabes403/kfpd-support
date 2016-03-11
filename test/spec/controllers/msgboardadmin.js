'use strict';

describe('Controller: MsgboardadminctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('initApp'));

  var MsgboardadminctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MsgboardadminctrlCtrl = $controller('MsgboardadminctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
