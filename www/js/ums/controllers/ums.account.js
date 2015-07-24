'use strict';
angular.module('btr.ums.account', ['btr.ums.factory.user'])
    .controller('AccountCtrl',
    function ($scope,
              $state,
              $ionicPopup,
              $timeout,
              $rootScope,
              UmsFactory,
              UmsRest,
              NotificationConst,
              localStorageService) {

// Triggered on a button click, or some other target
        $scope.logoutConfirmation = {text: "Are you sure?"}
        $scope.showPopup = function () {
            $scope.data = {};
            var token = UmsFactory.getUserToken();
            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<center><h4>Are you sure?<h4><center>',
                scope: $scope,
                animation: 'slide-in-up',
                buttons: [
                    {
                        text: 'Cancel',
                        onTap: function (e) {
                            myPopup.close();
                        }
                    },
                    {
                        text: '<b>Yes</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            UmsRest.logout(token)
                                .then(function () {
                                    $state.go('login');
                                    UmsFactory.removeUser();
                                });
                        }
                    },
                ]
            });
        };
        $scope.settings = {
            enableNotifications: true
        };

        $scope.removeNotes=function(){
            $rootScope.$broadcast(NotificationConst.cleanNotes);
        };

    });

