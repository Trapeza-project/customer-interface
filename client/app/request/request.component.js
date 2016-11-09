'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './request.routes';

export class RequestComponent {
  /*@ngInject*/
  constructor($scope,$location, lookupServiceService, modalService) {
	/*$scope.requestid = lookupService.getCurrentRequestID();
	$scope.requestdata = lookupService.getData($scope.requestid);
	$scope.history = lookupService.getHistory($scope.requestdata.personid);
	$scope.admin = lookupService.isAdmin();
	$scope.requesthtml = lookupService.getRequestHTML($scope.requestid);*/
  }

	/*$scope.pendingrequest = function(){
		if($scope.requestdata.access=="pending"){
			return true;
		}else{
			return false;
		}
	}
	$scope.approvedrequest = function(){
		if($scope.requestdata.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	$scope.deniedrequest = function(){
		if($scope.requestdata.access=="denied"){
			return true;
		}else{
			return false;
		}
	}

	$scope.pendingcompanyrequest = function(){
		if($scope.requestdata.companystatus=="pending" && $scope.requestdata.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	$scope.approvedcompanyrequest = function(){
		if($scope.requestdata.companystatus=="approved" && $scope.requestdata.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	$scope.deniedcompanyrequest = function(){
		if($scope.requestdata.companystatus=="denied" || $scope.requestdata.access == "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.approvedlookupService = function(lookupService){
		if(lookupService.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	$scope.deniedlookupService = function(lookupService){
		if(lookupService.access== "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.displayButton = function(){
		if($scope.isAdmin() && $scope.requestdata.companystatus=="pending" && !$scope.requestdata.UCHandle){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.approveRequest = function(){
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Approve Request',
			headerText: 'Approve',
			bodyText: 'Are you sure you want to approve this request?'
		};

		modalService.showModal({}, modalOptions)
			.then(function (result) {
					 $scope.requestdata.companystatus="approved";
			});
			
	}
	$scope.denyRequest = function(){
		var modalOptions = {
			closeButtonText: 'Cancel',
			actionButtonText: 'Deny Request',
			headerText: 'Deny',
			bodyText: 'Are you sure you want to deny this request?'
		};

		modalService.showModal({}, modalOptions)
			.then(function (result) {
					 $scope.requestdata.companystatus="denied";
			});

	}
	
	$scope.openActor = function(id){
		lookupService.setActiveActorID(id);
		$location.url('/actor');
	}
	
	$scope.isAdmin = function(){
		return $scope.admin;
	}*/
}

export default angular.module('customerInterfaceApp.request', [uiRouter])
  .config(routes)
  .component('request', {
    template: require('./request.html'),
    controller: RequestComponent,
    controllerAs: 'requestCtrl'
  })
  .name;
