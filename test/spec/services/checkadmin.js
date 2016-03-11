'use strict';

describe('Service: checkAdmin', function () {

  // load the service's module
  beforeEach(module('initApp'));

  // instantiate service
  var checkAdmin;
  beforeEach(inject(function (_checkAdmin_) {
    checkAdmin = _checkAdmin_;
  }));

  it('should do something', function () {
    expect(!!checkAdmin).toBe(true);
  });

});
