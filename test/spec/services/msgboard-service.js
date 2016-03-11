'use strict';

describe('Service: msgboardService', function () {

  // load the service's module
  beforeEach(module('initApp'));

  // instantiate service
  var msgboardService;
  beforeEach(inject(function (_msgboardService_) {
    msgboardService = _msgboardService_;
  }));

  it('should do something', function () {
    expect(!!msgboardService).toBe(true);
  });

});
