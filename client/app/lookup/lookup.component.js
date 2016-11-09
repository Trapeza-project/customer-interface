'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lookup.routes';

export class LookupComponent {
	
   personnumber = "yyyymmddxxxx";
   purposestring = "Purpose with lookup";
   datatypes = [];
   chosendata = [];
   admin = false;
   modules = [];
   UCHandling = true;
   activeModule = {};
   advancedOption = false;
   price = 0;
  /*@ngInject*/
  constructor($location, lookupService) {
	this.datatypes = lookupService.getDataTypes();
	this.admin = lookupService.isAdmin();
	this.modules = lookupService.getActiveModules();
  }
  $onInit() {
  }
	isModuleActive() {
		console.log("Is Module Active")
		if(Object.keys(this.activeModule).length === 0 && this.activeModule.constructor === Object){
			return true;
		}else{
			return false;
		}
	}
	
	setAdvancedOption(aOption){
		console.log("Set option");
		this.advancedOption = aOption;
	}
	
	updateData(cdata){
        this.chosendata = cdata;
		this.price = getPrice(this.chosendata);
    }
	
	getPrice(data){
		console.log("Get price");
		var price = 0;
		for(var i = 0; i < data.length;i++){
			price = price + data[i].price;
		}
		return price;
	}
	
	showMore(){
		console.log("Show More");
		if(this.admin && !this.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	showLess(){
		console.log("Show Less");
		if(this.admin && this.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	toggleModule(module){
		console.log("toggle")
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
		console.log("Is Active Module")
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
