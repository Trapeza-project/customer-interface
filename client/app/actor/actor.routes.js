'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('actor', {
      url: '/actor',
      template: '<actor></actor>'
    });
}
