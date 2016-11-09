'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
import ngLocalytics from 'angular-chosen-localytics';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import activity from './activity/activity.component'
import lookup from './lookup/lookup.component';
import request from './request/request.component';
import actor from './actor/actor.component';
import lookupService from './lookupService/lookupService.service';
import modalService from './modalService/modalService.service';
import lookupSettings from './lookupSettings/lookupSettings.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';


import './app.scss';

var customerInterfaceApp = angular.module('customerInterfaceApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io',
  ngMaterial, uiRouter, uiBootstrap, _Auth, lookupService, modalService, lookupSettings, account, lookup, request, activity, actor, admin, navbar, footer, main, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['customerInterfaceApp'], {
      strictDi: true
    });
  });
