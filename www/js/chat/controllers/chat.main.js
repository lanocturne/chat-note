'use strict';

angular.module('cpm.chat').
    controller('ChatCtrl',
    function ($scope,
              $rootScope,
              UmsFactory,
              SocketFactory,
              SOCKET_EVENTS,
              localStorageService) {

        $scope.userId;
        $scope.domain = UmsFactory.getUser().domain;
        $scope.isInputView=true;
        if (!localStorageService.get('msg')) {
            localStorageService.set('msg', {});
        }
        $scope.userId = UmsFactory.getUser().userId;
        $scope.unbind = localStorageService.bind($scope, 'msg');

        $scope.msg[$scope.domain]=[];
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };

        $scope.chat={
            sendMsg:function(){
                var me=this,
                    message={
                        text: me.msg,
                        date: _.now(),
                        user: UmsFactory.getUser()
                    };
                $scope.msg[$scope.domain].push(message);
                SocketFactory.getSocket().emit(SOCKET_EVENTS.sendMsg, message);
                me.msg=null;
            }
        };


        $scope.$on('socket:EMIT_MSG', function (e, msg) {
            $scope.msg[$scope.domain].push(msg);
        });
    });

