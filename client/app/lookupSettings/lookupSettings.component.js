'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lookupSettings.routes';

export class LookupSettingsComponent {
  /*@ngInject*/
  constructor($scope, $location, lookupService) {
	$scope.name = "";
	$scope.description = "";
	$scope.lookups = lookupService.getModules();
	$scope.id = $scope.lookups[$scope.lookups.length-1].id + 1;
	
	$scope.modulename="Name of the lookup module";
	$scope.descriptionplaceholder="Description of lookup module";
	$scope.price = 0;
	$scope.datatypes = lookupService.getDataTypes();
	$scope.chosendata = [];
	
	$scope.editingModule = {};
	$scope.editingname="";
	$scope.editingdescription="";
	$scope.editingprice=0;
	$scope.editingChosendata=[];
  }
  $onInit() {
  }
  
	/*$scope.changeUCStatus = function(lookup){
		lookupService.changeUCStatus(lookupService.id,lookupService.UCHandle);
	}
	
	$scope.editModule = function(module){
		console.log("editmodule");
		if(module==$scope.editingModule){
			$scope.editingModule = {};
			$scope.editingname="";
			$scope.editingdescription="";
			$scope.editingprice=0;
			$scope.editingChosendata=[];
			$scope.editingChosenData=[];
			$scope.editing = false;
		}else{
			$scope.editingModule = module;
			$scope.editingname=module.name;
			$scope.editingdescription=module.description;
			$scope.editingprice=module.price;
			$scope.editingChosendata=module.info;
			$scope.editingChosenData=module.info;
			$scope.editing = true;
		}
	}
	
	$scope.isEditModule = function(module){
		if(module==$scope.editingModule){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.updateEditingData = function(chosendata){
		console.log("lol");
        $scope.editingChosendata = chosendata;
		$scope.editingprice = $scope.calculatePrice($scope.editingChosendata);
    }
	
	$scope.updateData = function(chosendata){
        $scope.chosendata = chosendata;
		$scope.price = $scope.calculatePrice($scope.chosendata);
    }
	
	$scope.emptyData = function(){
		if($scope.chosendata.length > 0){
			return false;
		}else{
			return true;
		}
	}
	
	$scope.emptyEditingData = function(){
		if($scope.editingChosendata.length > 0){
			return false;
		}else{
			return true;
		}
	}
	
	$scope.calculatePrice = function(data){
		var price = 0;
		for(var i = 0; i < data.length;i++){
			price = price + data[i].price;
		}
		return price;
	}
	
	$scope.addModule = function(){
		console.log("addmodule");
		var module = {};
		module.name = $scope.name;
		module.description = $scope.description;
		module.price = $scope.price;
		module.customized = true;
		module.active = true;
		module.UCHandle = true;
		module.info=[];
		for(var i = 0; i < $scope.chosendata.length; i++){
			module.info.push($scope.chosendata[i]);
		}
		module.id=$scope.id++;
		console.log(module);
		lookupService.addModule(module);
		$scope.chosendata = [];
		$scope.chosenData = [];
		$scope.name = "";
		$scope.description = "";
		$scope.price = 0;
	}
	
	$scope.getPrice = function(lookup){
		var info = lookupService.info;
		var price = 0;
		for(var i = 0; i < info.length;i++){
			price = price + info[i].price;
		}
		return price;
	}
	
	$scope.changeModule = function(module){
		console.log($scope.editingname);
		module.name = $scope.editingname;
		module.description = $scope.editingdescription;
		module.price = $scope.editingprice;
		module.customized = true;
		module.info=[];
		for(var i = 0; i < $scope.editingChosendata.length; i++){
			module.info.push($scope.editingChosendata[i]);
		}
		console.log("changemodule");
		console.log(module);
		lookupService.changeModule(module);
		$scope.editingChosendata = [];
		$scope.editingChosenData = [];
		$scope.editingname = "";
		$scope.editingdescription = "";
		$scope.editingprice = 0;
		$scope.editingModule = {};
	}
	
	$scope.deleteModule = function(module){
		console.log("deletemodule");
		lookupService.removeModule(module);
		$scope.editingChosendata = [];
		$scope.editingChosenData = [];
		$scope.editingname = "";
		$scope.editingdescription = "";
		$scope.editingprice = 0;
		$scope.editingModule = {};
	}
	
	$scope.setEditName = function(name){
		$scope.editingname = name;
	}
	
	$scope.setEditDescription = function(description){
		$scope.editingdescription = description;
	}*/
}

export default angular.module('customerInterfaceApp.lookupSettings', [uiRouter])
  .config(routes)
  .component('lookupSettings', {
    template: require('./lookupSettings.html'),
    controller: LookupSettingsComponent,
    controllerAs: 'lookupSettingsCtrl'
  })
  .name;
