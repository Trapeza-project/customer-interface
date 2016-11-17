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
  constructor($http, $location, lookupService, modalService, Auth) {
	'ngInject';

	function temp(){
		return true;
	}
	this.isAdmin = temp;
    //this.isAdmin = Auth.isAdminSync;
	this.$http = $http;
	this.$location = $location;
	this.lookupService = lookupService;
	this.modalService = modalService;
	this.requestid = lookupService.getCurrentRequestID();
	
	this.$http({
     url: '/api/requests/'+this.requestid, 
     method: "GET" 
	}).then(response => {
			if(response.status==200){
				this.requestdata = response.data.basic;
				//this.requesthtml = response.data.html;
				//this.history = response.data.history;
			}
		});
  }
  $onInit() {
  }

	pendingrequest(){
		if(this.requestdata.pending==true){
			return true;
		}else{
			return false;
		}
	}
	approvedrequest(){
		if(this.requestdata.allow==true && this.requestdata.pending==false){
			return true;
		}else{
			return false;
		}
	}
	deniedrequest(){
		if(this.requestdata.allow==false && this.requestdata.pending==false){
			return true;
		}else{
			return false;
		}
	}

	pendingcompanyrequest(){
		if(this.requestdata.companypending==true){
			return true;
		}else{
			return false;
		}
	}
	approvedcompanyrequest(){
		if(this.requestdata.companyallow==true && this.requestdata.companypending==false){
			return true;
		}else{
			return false;
		}
	}
	deniedcompanyrequest(){
		if((this.requestdata.companyallow==false && this.requestdata.companypending==false) || (this.requestdata.allow == false && this.requestdata.pending ==false)){
			return true;
		}else{
			return false;
		}
	}
	
	approvedLookup(lookup){
		if(lookup.allow == true && lookup.pending == false){
			return true;
		}else{
			return false;
		}
	}
	deniedLookup(lookup){
		if(lookup.allow == false && lookup.pending ==false){
			return true;
		}else{
			return false;
		}
	}
	
	displayButton(){
		if(this.isAdmin() && this.requestdata.companypending==true && !this.requestdata.UCHandle){
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
					 vm.requestdata.companyallow = true;
					 vm.requestdata.companypending = false;
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
					 vm.requestdata.companyallow=false;
					 vm.requestdata.companypending=false;
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
