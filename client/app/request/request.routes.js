'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('request', {
      url: '/request',
      template: '<request></request>'
    });
}
