'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './request.routes';

export class RequestComponent {

	requestid = 0;
	requestdata = {};
	history = [];
	requesthtml="";
  /*@ngInject*/
  constructor($location, lookupService, modalService, Auth) {
	'ngInject';

	function temp(){
		return true;
	}
	this.isAdmin = temp;
    //this.isAdmin = Auth.isAdminSync;
	  
	this.$location = $location;
	this.lookupService = lookupService;
	this.modalService = modalService;
	this.requestid = lookupService.getCurrentRequestID();
	this.requestdata = lookupService.getData(this.requestid);
	this.history = lookupService.getHistory(this.requestdata.personid);
	this.requesthtml = lookupService.getRequestHTML(this.requestid);
  }
  $onInit() {
  }

	pendingrequest(){
		if(this.requestdata.access=="pending"){
			return true;
		}else{
			return false;
		}
	}
	approvedrequest(){
		if(this.requestdata.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	deniedrequest(){
		if(this.requestdata.access=="denied"){
			return true;
		}else{
			return false;
		}
	}

	pendingcompanyrequest(){
		if(this.requestdata.companystatus=="pending" && this.requestdata.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	approvedcompanyrequest(){
		if(this.requestdata.companystatus=="approved" && this.requestdata.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	deniedcompanyrequest(){
		if(this.requestdata.companystatus=="denied" || this.requestdata.access == "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	approvedLookup(lookup){
		if(lookup.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	deniedLookup(lookup){
		if(lookup.access== "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	displayButton(){
		if(this.isAdmin() && this.requestdata.companystatus=="pending" && !this.requestdata.UCHandle){
			return true;
		}else{
			return false;
		}
	}
	
	approveRequest(){
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Approve Request',
			headerText: 'Approve',
			bodyText: 'Are you sure you want to approve this request?'
		};
		var vm = this;
		this.modalService.showModal({}, modalOptions)
			.then(function (result) {
					 vm.requestdata.companystatus="approved";
			});
	}
	denyRequest(){
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Deny Request',
			headerText: 'Deny',
			bodyText: 'Are you sure you want to deny this request?'
		};
		var vm = this;
		this.modalService.showModal({}, modalOptions)
			.then(function (result) {
					 vm.requestdata.companystatus="denied";
			});

	}
	
	openActor = function(id){
		this.lookupService.setActiveActorID(id);
		this.$location.url('/actor');
	}
}

export default angular.module('customerInterfaceApp.request', [uiRouter])
  .config(routes)
  .component('request', {
    template: require('./request.html'),
    controller: RequestComponent,
    controllerAs: 'requestCtrl'
  })
  .name;
