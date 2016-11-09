'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './activity.routes';

export class ActivityComponent {
	
   requests = [];
	pending = [];
	answered = [];
  /*@ngInject*/
  constructor($location, lookupService) {
	this.$location = $location;
	this.lookupService = lookupService;
    this.requests = [{name:"Kalle Karlsson", info:["Income","Address"], timestamp:"01/01/2016", access:"pending", companystatus:"pending"},{name:"Stina Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"approved"}, {name:"Eva Svensson", info:["Income","Address"], timestamp:"01/01/2016", access:"denied", companystatus:"approved"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"denied"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"pending"}];
	for(var i = 0; i < this.requests.length; i++){
		if(this.requests[i].access == "pending"){
			this.pending.push(this.requests[i]);
		}else{
			this.answered.push(this.requests[i]);
		}
	}
  }
  $onInit() {
  }
  
	pendingrequest(request){
		if(request.access=="pending"){
			return true;
		}else{
			return false;
		}
	}
	approvedrequest(request){
		if(request.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	deniedrequest(request){
		if(request.access=="denied"){
			return true;
		}else{
			return false;
		}
	}
	
	pendingcompanyrequest(request){
		if(request.companystatus=="pending" && request.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	approvedcompanyrequest(request){
		if(request.companystatus=="approved" && request.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	deniedcompanyrequest(request){
		if(request.companystatus=="denied" || request.access == "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	viewRequest(requestid){
		this.lookupService.setCurrentRequestID(requestid);
		this.$location.url('/request');
	}
}

export default angular.module('customerInterfaceApp.activity', [uiRouter])
  .config(routes)
  .component('activity', {
    template: require('./activity.html'),
    controller: ActivityComponent,
    controllerAs: 'activityCtrl'
  })
  .name;
