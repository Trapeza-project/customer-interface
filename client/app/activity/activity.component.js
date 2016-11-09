'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './activity.routes';

export class ActivityComponent {
  /*@ngInject*/
  constructor($scope,$location, lookupService) {
    /*$scope.requests = [{name:"Kalle Karlsson", info:["Income","Address"], timestamp:"01/01/2016", access:"pending", companystatus:"pending"},{name:"Stina Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"approved"}, {name:"Eva Svensson", info:["Income","Address"], timestamp:"01/01/2016", access:"denied", companystatus:"approved"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"denied"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"pending"}];
	$scope.pending = [];
	$scope.answered = [];
	for(var i = 0; i < $scope.requests.length; i++){
		if($scope.requests[i].access == "pending"){
			$scope.pending.push($scope.requests[i]);
		}else{
			$scope.answered.push($scope.requests[i]);
		}
	}*/
  }
  
	/*$scope.pendingrequest = function(request){
		if(request.access=="pending"){
			return true;
		}else{
			return false;
		}
	}
	$scope.approvedrequest = function(request){
		if(request.access=="approved"){
			return true;
		}else{
			return false;
		}
	}
	$scope.deniedrequest = function(request){
		if(request.access=="denied"){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.pendingcompanyrequest = function(request){
		if(request.companystatus=="pending" && request.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	$scope.approvedcompanyrequest = function(request){
		if(request.companystatus=="approved" && request.access != "denied"){
			return true;
		}else{
			return false;
		}
	}
	$scope.deniedcompanyrequest = function(request){
		if(request.companystatus=="denied" || request.access == "denied"){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.viewRequest = function(requestid){
		lookupService.setCurrentRequestID(requestid);
		$location.url('/request');
	}*/
}

export default angular.module('customerInterfaceApp.activity', [uiRouter])
  .config(routes)
  .component('activity', {
    template: require('./activity.html'),
    controller: ActivityComponent,
    controllerAs: 'activityCtrl'
  })
  .name;
