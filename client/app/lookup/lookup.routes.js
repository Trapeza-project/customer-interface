'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('lookup', {
      url: '/lookup',
      template: '<lookup></lookup>'
    });
}
