'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './lookup.routes';

export class LookupComponent {
  /*@ngInject*/
  constructor($scope, $location, lookupService) {
	/*$scope.personnumber = "yyyymmddxxxx";
	$scope.purposestring = "Purpose with lookup"

	$scope.datatypes = lookupService.getDataTypes();
	$scope.chosendata = [];
	$scope.admin = lookupService.isAdmin();
	$scope.modules = lookupService.getActiveModules();
	
	
	$scope.UCHandling = true;
	
	$scope.activeModule = {};
	
	$scope.advancedOption = false;
	
	$scope.price = 0;*/
  }
	/*$scope.isModuleActive = function(){
		if(Object.keys($scope.activeModule).length === 0 && $scope.activeModule.constructor === Object){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.setAdvancedOption = function(aOption){
		$scope.advancedOption = aOption;
	}
	
	$scope.updateData = function(chosendata){
        $scope.chosendata = chosendata;
		$scope.price = $scope.getPrice($scope.chosendata);
    }
	
	$scope.getPrice = function(data){
		var price = 0;
		for(var i = 0; i < data.length;i++){
			price = price + data[i].price;
		}
		return price;
	}
	
	$scope.showMore = function(){
		if($scope.admin && !$scope.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.showLess = function(){
		if($scope.admin && $scope.advancedOption){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.toggleModule = function(module){
		if(module==$scope.activeModule){
			$scope.activeModule={};
			$scope.UCHandling = true;
		}else{
			$scope.activeModule = module;
			if(!module.UCHandle){
				$scope.UCHandling = false;
			}else{
				$scope.UCHandling = true;
			}
		}
	}
	
	$scope.isActiveModule = function(module){
		if(module==$scope.activeModule){
			return true;
		}else{
			return false;
		}
	}*/
}

export default angular.module('customerInterfaceApp.lookup', [uiRouter])
  .config(routes)
  .component('lookup', {
    template: require('./lookup.html'),
    controller: LookupComponent,
    controllerAs: 'lookupCtrl'
  })
  .name;
