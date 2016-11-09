'use strict';

describe('Component: ActorComponent', function() {
  // load the controller's module
  beforeEach(module('customerInterfaceApp.actor'));

  var ActorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ActorComponent = $componentController('actor', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
