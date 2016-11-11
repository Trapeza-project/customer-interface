'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './actor.routes';

export class ActorComponent {
  /*@ngInject*/
  constructor($scope,$location,lookupService) {
	$scope.actorid = lookupService.getActiveActorID();
	$scope.actor = lookupService.getActor($scope.actorid);
  }
  $onInit() {
  }
}


export default angular.module('customerInterfaceApp.actor', [uiRouter])
  .config(routes)
  .component('actor', {
    template: require('./actor.html'),
    controller: ActorComponent,
    controllerAs: 'actorCtrl'
  })
  .name;
