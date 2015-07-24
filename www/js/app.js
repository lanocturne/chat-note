// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
'use strict';
angular.module('btr', [
    'ionic',
    'ngCordova',
    'cpm.ums',
    'btr.push',
    'config',
    'btr.directives.currentState',
    'angularMoment',
    'starter.controllers',
    'starter.services',
    'Captora.datarpm',
    'angular.filter',
    'LocalStorageModule',
    'cpm.chat'
])
    .run(function ($ionicPlatform,
                   $rootScope,
                   UmsFactory,
                   $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }

            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });

        $rootScope.$on('$stateChangeStart', function (e, toState) {
            if (!UmsFactory.getUser() && toState.name !== 'login') {
                e.preventDefault();
                $state.go('login');
                return;
            }
        });
    })

    .config(function ($stateProvider,
                      $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:


            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'js/ums/views/ums.account.html',
                        controller: 'AccountCtrl'
                    }
                }

            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/login');

    });
