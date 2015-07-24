/**
 * Created by stan on 3/18/15.
 */
'use strict';

angular.module('cpm.chat.socket', ['btford.socket-io'])
    .constant('SOCKET_EVENTS',{
        sendMsg:'SEND_MSG'
    }).
    factory('SocketFactory',
    function (socketFactory,
              $rootScope,
              $window,
              UmsFactory,
              REST
              ) {
        var socket = {};
        var mySocket = {
            getSocket: function () {
                return socket;
            }
        };

        $rootScope.$watch(function () {
            return UmsFactory.getUser() ? UmsFactory.getUser().domain : null;
        }, function (newValue) {
            if (newValue) {
                if (_.isEmpty(socket)) {
                    var path = REST.node;
                    var myIoSocket = $window.io.connect(path + UmsFactory.getUser().domain);

                    socket = socketFactory({
                        ioSocket: myIoSocket
                    });
                    socket.forward('OFFLINE_MSG');
                    socket.forward('EMIT_MSG');
                }
                //socket.emit('chatevent', Session.get().token);
            }
        });
        return mySocket;
    });
