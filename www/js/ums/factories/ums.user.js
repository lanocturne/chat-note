'use strict';
angular.module('btr.ums.factory.user', [])
  .factory('UmsFactory', function (localStorageService) {
    var UmsFactory = {
      user: {},
      getUserToken: function () {
        return this.user.token;
      },

      setUser: function (user) {
        this.user = user;
      },

      getUser: function () {
        return localStorageService.get('user') || this.user;
      },

      removeUser: function(){
        this.user={};
      }
    };
    return UmsFactory;
  });
