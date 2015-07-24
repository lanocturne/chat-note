'use strict';

angular.module('cpm.ums.login', [
    'btr.ums.factory.rest']).
    controller('UmsLoginCtrl',
    function ($scope,
              $state,
              $rootScope,
              UmsRest,
              PushFactory,
              PushRest,
              UmsFactory,
              localStorageService) {

        var user = localStorageService.get('user');
        if(user){
            $scope.user={
                userName: user.userName
            };
            $scope.isRemembered=true;
        }
        $scope.login = function () {
            UmsRest.login($scope.user).
                then(function (res) {
                    if (res.data.CODE !== 500) {
                        UmsFactory.setUser(res.data);
                        if($scope.isRemembered){
                            localStorageService.set('user',res.data);
                        } else if(user){
                            localStorageService.remove('user');
                        }
                        $state.go('tab.push');
                        PushFactory.register();
                    }
                });
        };
    });

