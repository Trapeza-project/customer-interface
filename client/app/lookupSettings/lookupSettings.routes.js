'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lookupSettings', {
      url: '/lookupSettings',
      template: '<lookup-settings></lookup-settings>'
    });
}
