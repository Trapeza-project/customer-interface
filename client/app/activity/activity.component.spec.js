'use strict';

describe('Component: ActivityComponent', function() {
  // load the controller's module
  beforeEach(module('customerInterfaceApp.activity'));

  var ActivityComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ActivityComponent = $componentController('activity', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
