'use strict';
angular.module('btr.push.factory.util', ['btr.push.factory.rest'])
    .constant('PUSH_CONSTANTS', {
        gcm: {
            projectId: '103872545513'
        },

        content: {
            PAID: {
                icon: 'ion-social-usd'
            },

            VARIATION: {
                icon: 'ion-eye'
            }
        }
    })
    .factory('PushFactory',
    function ($cordovaPush,
              $ionicPlatform,
              $window,
              $cordovaBadge,
              $cordovaMedia,
              $cordovaDialogs,
              $state,
              $rootScope,
              PushRest,
              UmsFactory,
              PUSH_CONSTANTS) {

        var rids = [],
            rid,
            config,

            storeDevice = function (type) {
                rids.push(rid);
                var device = {
                    type: type,
                    name: UmsFactory.getUser().domain,
                    value: rid
                };

                PushRest.device.post(device)
                    .then(function (res) {
                        console.log('registered', res);
                        //$state.go('tab.push')
                    }, function (res) {
                        console.error(res);
                    });
            },

            handleIOS = function (notification) {
                if (notification.foreground == "1") {
                    // Play custom audio if a sound specified.
                    //if (notification.sound) {
                        //var mediaSrc = $cordovaMedia.newMedia(notification.sound);
                        //mediaSrc.promise.then($cordovaMedia.play(mediaSrc.media));
                    //}

                    if (notification.body && notification.messageFrom) {
                        console.log(notification.body, notification.messageFrom);
                    }

                    //if (notification.badge) {
                    //    //cordova.plugins.notification.badge.increase();
                    //    $cordovaPush.setBadgeNumber(notification.badge).then(function (result) {
                    //        console.log("Set badge success " + result)
                    //    }, function (err) {
                    //        console.log("Set badge error " + err)
                    //    });
                    //}

                    $rootScope.$broadcast('IOS_NOTE',notification);

                    //clear badge
                    PushRest.notification.acknowledge({rid: rid});
                }
                // Otherwise it was received in the background and reopened from the push notification. Badge is automatically cleared
                // in this case. You probably wouldn't be displaying anything at this point, this is here to show that you can process
                // the data in this situation.
                else {
                    //cordova.plugins.notification.badge.clear();
                }
            };

        return {
            register: function () {
                $ionicPlatform.ready(function () {
                    if (ionic.Platform.isAndroid()) {
                        config = {
                            senderID: PUSH_CONSTANTS.gcm.projectId
                        };
                    } else if (ionic.Platform.isIOS()) {
                        config = {
                            "badge": true,
                            "sound": true,
                            "alert": true
                        };
                    }
                    $cordovaPush.register(config).
                        then(function (result) {
                            if (ionic.Platform.isIOS()) {
                                rid = result;
                                storeDevice("ios");
                            }
                        }, function (err) {
                            console.error('error', err);
                        });

                    $rootScope.$on('$cordovaPush:notificationReceived', function (e, notification) {
                        if (ionic.Platform.isAndroid()) {
                            switch (notification.event) {
                                case 'registered':
                                    if (notification.regid.length > 0) {
                                        if (!_.find(rids, function (rid) {
                                                return rid === notification.regid
                                            })) {
                                            rids.push(notification.regid);
                                            var device = {
                                                name: UmsFactory.getUser().domain,
                                                value: notification.regid
                                            };

                                            PushRest.device.get(device)
                                                .then(function (res) {
                                                    console.log('registered', res);
                                                    //$state.go('tab.push')
                                                }, function (res) {
                                                    console.error(res);
                                                });
                                        }
                                    }
                                    break;

                                case 'message':
                                    cordova.plugins.notification.badge.increase();
                                    // this is the actual push notification. its format depends on the data model from the push server
                                    //alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                                    break;

                                case 'error':
                                    alert('GCM error = ' + notification.msg);
                                    break;

                                default:
                                    alert('An unknown GCM event has occurred');
                                    break;
                            }
                        } else if (ionic.Platform.isIOS()) {
                            handleIOS(notification);
                        }

                    });


                });
            },

            setIcon: function (note) {
                if (ionic.Platform.isIOS()) {
                    note = {
                        payload: _.merge(note)
                    }
                }

                note.icon = PUSH_CONSTANTS.content[note.payload.type].icon;
                return note;
            },

            getDevice: function(){
                return rid;
            },

            uniq: function(array){
               return _(array).uniq(function (n) {
                    return n._id;
                })
                    .filter('_id')
                    .value();
            }
        };
    });
