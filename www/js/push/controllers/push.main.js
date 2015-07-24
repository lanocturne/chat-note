'use strict';

angular.module('btr.push').
    constant('NotificationConst', {
        cleanNotes: 'CLEAN_NOTIFICATIONS'
    }).
    controller('PushCtrl',
    function ($scope,
              $rootScope,
              $cordovaInAppBrowser,
              $ionicPlatform,
              PushFactory,
              UmsFactory,
              PushRest,
              NotificationConst,
              localStorageService) {


        var options = {
                location: 'yes',
                toolbar: 'yes'
            },
            userStore;

        $scope.$watch(function () {
            return UmsFactory.getUser().userId;
        }, function (nv) {
            if (nv) {
                userStore = UmsFactory.getUser().userId;
                $scope.userId = userStore;
                $scope.unbind = localStorageService.bind($scope, 'notes');

                if (!localStorageService.get('notes')) {
                    localStorageService.set('notes', {});
                }
            }
        });

//mock
        /*var notes = [{
            id: 1,
            "domain": "captora.com",
            "type": "PAID",
            "user": "work",
            "text": "th2is is real Looks like you just begin to use this App, there's no Notifications yet.",
            date: "1429041814924",
            "url": "http://www.captora.com"

        }, {
            id: 2,
            "domain": "captora.com",
            "type": "VARIATION",
            "user": "awork",
            "text": "work published a paid capturesite on this is real",
            date: "1429041814926",
            "url": "http://www.captora.com"
        }];
        var data = [{
            "domain": "captora.com",
            "type": "PAID",
            "user": "Ceci",
            "text": "is real Looks like you just begin to use this App, there's no Notifications yet.",
            date: 1429041814924,
            "url": "http://www.captora.com"

        }, {
            id: 3,
            "domain": "captora.com",
            "type": "VARIATION",
            "user": "awork",
            "text": "this is real",
            date: "1429041814928",
            "url": "http://www.captora.com"
        }];

        $scope.userId = 2045;

        $scope.notes = {
            2045: _(data).union(notes)
                .uniq(function (n) {
                    return n.id;
                }).filter('id')
                .value()
        };

        console.log($scope.notes);*/

        // Notification Received
        $scope.$on('$cordovaPush:notificationReceived', function (e, notification) {
            if (notification.event === 'message') {
                notification = PushFactory.setIcon(notification);
                $scope.notes.unshift(notification);
            }
        });

        $scope.preview = function (url) {
            $ionicPlatform.ready(function () {
                $cordovaInAppBrowser.open(url, '_blank', options);
            });
        };

        $scope.removeNote = function (note) {
            _.remove($scope.notes[userStore], note);
        };

        $scope.$on('IOS_NOTE', function (e, notification) {
            $scope.notes[userStore].unshift(notification);
            $scope.notes[userStore]=PushFactory.uniq($scope.notes[userStore]);
        });

        $scope.$on(NotificationConst.cleanNotes, function () {
            $scope.notes[userStore] = [];
        });

        $ionicPlatform.on('resume', function () {
            //sync notifications with node
            PushRest.notification.get({device: PushFactory.getDevice()}).
                then(function (res) {
                    var union = _(res.data).union($scope.notes[userStore]);
                    $scope.notes[userStore]=PushFactory.uniq(union);
                });
        });
    });

