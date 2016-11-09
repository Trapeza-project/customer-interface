'use strict';
const angular = require('angular');

/*@ngInject*/
export function lookupServiceService() {
	// AngularJS will instantiate a singleton by calling "new" on this function
	var vm = this;
	vm.currentRequestID;
	
	vm.actorid = 0;
	
	vm.modules = [{id:1, name:"Small", description:"Includes the basic information to the lookup.", info:[{name:"Income",price:5}], customized:false, active:true, UCHandle:true},{id:2, name:"Medium", description:"Includes the basic and personal information to the lookup.", info:[{name:"Income", price:5}, {name:"Address", price:10}], customized:false, active:true, UCHandle:true},{id:3, name:"Large", description:"Includes detailed information to the lookup.", info:[{name:"Income",price:5},{name:"Address", price:10},{name:"Criminal Record",price:20}], customized:false, active:true, UCHandle:true}];

	
	vm.changeUCStatus = function(id, bool){
		for(var i = 0; i < vm.modules.length; i++){
			if (vm.modules[i].id==id) {
				vm.modules[i].UCHandle = bool;
				break;
			}
		}
	}
	
	vm.getModules = function(){
		return vm.modules;
	}
	
	vm.addModule = function(module){
		vm.modules.push(module);
	}
	
	vm.removeModule = function(module){
		for(var i = 0; i < vm.modules.length; i++){
			if (vm.modules[i].id==module.id) {
				vm.modules.splice(i, 1);
				break;
			}
		}
	}
	
	vm.changeModule = function(module){
		for(var i = 0; i < vm.modules.length; i++){
			if(module.id==vm.modules[i].id){
				vm.modules[i].module;
				break;
			}
		}
	}
	
	vm.getActiveModules = function(){
		var activeModules = [];
		for(var i = 0; i < vm.modules.length; i++){
			if(vm.modules[i].active){
				activeModules.push(vm.modules[i]);
			}
		}
		return activeModules;
	}
	
	
	vm.admin = true;
	
	vm.isAdmin = function(){
		return vm.admin;
	}
	
	
	vm.getData = function(requestid){
		var data = {name:"Kalle Karlsson", personid:"199007071415", UCHandle:false, info:[{title:"Income", value:"50000/Month", timestamp:"1/1/2015"},{title:"Address", value:"Sveavägen 12", timestamp:"1/1/2015"}], timestamp:"01/01/2016", purpose:"Check to buy a phone.", access:"approved", companystatus:"pending"};
		return data;
	}
	
	vm.getCurrentRequestID = function(){
		return vm.currentRequestID;
	}
	
	vm.setCurrentRequestID = function(requestid){
		vm.currentRequestID = requestid;
	}
	
	vm.getHistory = function(pid){
		var history = [{actor:{name:"Media Markt", id:"3"}, info:["Address"], timestamp:"1/1/2015", access:"approved"}, {actor:{name:"Elgiganten", id:"4"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"denied"}, {actor:{name:"Media Markt", id:"3"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"approved"}];
		return history;
	}
	
	vm.getActiveActorID = function(){
		return vm.actorid;
	}
	vm.setActiveActorID = function(actorid){
		vm.actorid = actorid;
	}
	
	vm.getActor = function(id){
		var actor = {name:"Media Markt", basicinfo:"A retail store.", description:"Media Markt is a German chain of stores selling consumer electronics with numerous branches throughout Europe and Asia. It is Europe's largest retailer of consumer electronics, and the second largest in the world after American retailer Best Buy.", branch:["Retail","Electronics"]};
		return actor;
	}
	
	vm.getRequestHTML = function(requestid){
		var html = "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>";
		return html;
	}
	
	vm.getDataTypes = function(){
		var datatypes = [];
		var financialdata = {name:"Financial", price:5};
		var educationaldata = {name:"Educational", price:10};
		datatypes.push(financialdata);
		datatypes.push(educationaldata);
		return datatypes;
	}
}

export default angular.module('customerInterfaceApp.lookupService', [])
  .service('lookupService', lookupServiceService)
  .name;
