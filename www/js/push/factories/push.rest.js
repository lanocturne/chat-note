'use strict';
angular.module('btr.push.factory.rest', [])
    .factory('PushRest',
    function (REST,
              $http) {
        var Apis = {
            registerDevice: REST.node + 'api/devices',
            notifications: REST.node + 'api/notifications',
            acknowledge: REST.node + 'api/notifications/acknowledge'
        };

        return {
            device: {
                //register
                post: function (device) {
                    return $http.post(Apis.registerDevice, device);
                },

                get: function (device) {
                    return $http.get(Apis.registerDevice, {params: device});
                },

                put: function (device) {
                    return $http.put(Apis.registerDevice, device);
                }
            },

            notification: {
                get:function(device){
                    return $http.get(Apis.notifications, {params: device});
                },

                acknowledge:function(rid){
                    return $http.get(Apis.acknowledge, {params: rid});
                }
            }
        }

    });
