'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('activity', {
      url: '/activity',
      template: '<activity></activity>'
    });
}
