'use strict';
angular.module('btr.ums.factory.rest', [])
  .factory('UmsRest', function (REST,
                                $http) {
    var authService = {},
      Apis = {
        login: REST.pages + 'ums/login',
        logout: REST.pages + 'ums/logout'
      };

    authService.login = function (credentials) {
      return $http.post(Apis.login, credentials);
    };

    authService.logout = function () {
     return $http.post(Apis.login);
    };

    authService.getAccounts = function () {
      return Request.post(Url.captora.auth.listAccounts, {});
    };

    authService.switchAccounts = function (account) {
      return Request.post(Url.captora.auth.switchAccount, {new_client: account})
        .then(function (res) {
          if (res.data.new_token) {
            Session.setAuthToken(res.data.new_token);
          }
          if (res.data.client) {
            Session.setDomain(res.data.client);
          }

          globalEvents.emit(AUTH_EVENTS.userSwitchedAccounts);

          return res;
        });
    };

    authService.getUsers = function () {
      return Request.post(Url.captora.auth.getList, {});
    };

    authService.isAuthenticated = function () {
      return !!Session.currentUser.token;
    };

    authService.isAuthorized = function (authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }
      return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
    };

    authService.tokenCheck = function () {
      return Request.get(Url.captora.auth.tokenCheck);

    };

    return authService;
  });
