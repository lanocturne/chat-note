/**
 * Created by stan on 3/21/15.
 */
'use strict';
angular.module('cpm.chat', [
  'cpm.chat.socket',
    'cpm.util.avatar'
]).
  config(function ($stateProvider) {
    $stateProvider
      // setup an abstract state for the tabs directive
        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'js/chat/views/tab-chats.html',
                    controller: 'ChatCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })
  });
