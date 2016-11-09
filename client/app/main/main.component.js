import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
	
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
	$scope.usernameplaceholder = "Username";
	$scope.passwordplaceholder = "Password";

  }

  $onInit() {
  }
}

export default angular.module('customerInterfaceApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
