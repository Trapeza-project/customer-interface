import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
	usernameplaceholder = "Username";
	passwordplaceholder = "Password";
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;

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
