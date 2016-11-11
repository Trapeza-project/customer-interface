import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
	usernameplaceholder = "Username";
	passwordplaceholder = "Password";
	user = {
		name: '',
		email: '',
		password: ''
	};
	errors = {
		login: undefined
	};
	submitted = false;
	
  /*@ngInject*/
  constructor($http, $scope, socket, Auth, $state) {
	'ngInject';
	this.Auth = Auth;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedInSync;
	this.$http = $http;
  }

  $onInit() {
  }
  
   login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}

export default angular.module('customerInterfaceApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
	controllerAs: 'mainCtrl'
  })
  .name;
