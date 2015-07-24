/**
 * Created by stan on 3/21/15.
 */
'use strict';
angular.module('btr.push', [
  'btr.push.factory.util',
    'LocalStorageModule',
    'cpm.filter'
]).
  config(function ($stateProvider) {
    $stateProvider
      // setup an abstract state for the tabs directive
      .state('tab.push', {
        url: '/tab.push',
        views: {
          'tab-push': {
            templateUrl: 'js/push/views/push.index.html',
            controller: 'PushCtrl'
          }
        }
      }).state('tab.push.detail', {
            url: '/detail',
            views: {
                'tab-push': {
                    templateUrl: 'js/push/views/notification-detail.html'
                }
            }
        });
  });
