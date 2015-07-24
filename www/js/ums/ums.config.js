/**
 * Created by stan on 3/21/15.
 */
'use strict';
angular.module('cpm.ums', [
    'cpm.ums.login',
	'btr.ums.account',
    'LocalStorageModule'
]).
  config(function($stateProvider,
                  localStorageServiceProvider) {
  $stateProvider
    // setup an abstract state for the tabs directive
    .state('login', {
      url: '/login',
      templateUrl: 'js/ums/views/ums.login.html',
      controller: 'UmsLoginCtrl'
    });

        localStorageServiceProvider.setPrefix('CpNote');
});
