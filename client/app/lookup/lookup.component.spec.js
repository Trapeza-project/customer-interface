'use strict';

describe('Component: LookupComponent', function() {
  // load the controller's module
  beforeEach(module('customerInterfaceApp.lookup'));

  var LookupComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LookupComponent = $componentController('lookup', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
