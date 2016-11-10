'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lookup.routes';

export class LookupComponent {
	
   personnumber = "yyyymmddxxxx";
   purposestring = "Purpose with lookup";
   datatypes = [];
   //chosendata = [];
   chosenInfo = [];
   admin = false;
   modules = [];
   UCHandling = true;
   activeModule = {};
   advancedOption = false;
   price = 0;
  /*@ngInject*/
  constructor($scope, $location, lookupService) {
	this.$scope = $scope;
	this.datatypes = lookupService.getDataTypes();
	this.admin = lookupService.isAdmin();
	this.modules = lookupService.getActiveModules();
	
  }
  $onInit() {
  }
	submitLookup(){
		console.log(this.chosenInfo);
	}
  
	isModuleActive() {
		if(Object.keys(this.activeModule).length === 0 && this.activeModule.constructor === Object){
			return true;
		}else{
			return false;
		}
	}
	
	setAdvancedOption(aOption){
		this.advancedOption = aOption;
	}
	
	/**updateData(cdata){
		console.log("UPPPPDATE");
        this.chosendata = cdata;
		this.price = getPrice(this.chosendata);
    }*/
	
	getPrice(data){
		console.log("Get price");
		var price = 0;
		for(var i = 0; i < data.length;i++){
			price = price + data[i].price;
		}
		return price;
	}
	
	showMore(){
		if(this.admin && !this.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	showLess(){
		if(this.admin && this.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	toggleModule(module){
		if(module==this.activeModule){
			this.activeModule={};
			this.UCHandling = true;
		}else{
			this.activeModule = module;
			if(!module.UCHandle){
				this.UCHandling = false;
			}else{
				this.UCHandling = true;
			}
		}
	}
	
	isActiveModule(module){
		if(module==this.activeModule){
			return true;
		}else{
			return false;
		}
	}
}

export default angular.module('customerInterfaceApp.lookup', [uiRouter])
  .config(routes)
  .component('lookup', {
    template: require('./lookup.html'),
    controller: LookupComponent,
    controllerAs: 'lookupCtrl'
  })
  .name;
