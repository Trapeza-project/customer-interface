'use strict';

describe('Component: LookupSettingsComponent', function() {
  // load the controller's module
  beforeEach(module('customerInterfaceApp.lookupSettings'));

  var LookupSettingsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LookupSettingsComponent = $componentController('lookupSettings', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
