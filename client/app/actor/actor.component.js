'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './actor.routes';

export class ActorComponent {
  /*@ngInject*/
  constructor($http, $scope,$location,lookupService) {
	this.$http = $http;
	this.actorid = lookupService.getActiveActorID();
	
	this.$http({
     url: '/api/actors/id', 
     method: "GET",
     params: {id: this.actorid}  
	}).then(response => {
			if(response.status==200){;
				this.actor = response.data;
			}
		});
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
