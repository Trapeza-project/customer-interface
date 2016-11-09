'use strict';

describe('Component: RequestComponent', function() {
  // load the controller's module
  beforeEach(module('customerInterfaceApp.request'));

  var RequestComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RequestComponent = $componentController('request', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
