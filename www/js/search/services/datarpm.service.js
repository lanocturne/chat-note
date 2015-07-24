/**
 * @ngdoc service
 * @name DatarpmService
 * @kind function
 * @copyright Copyright 2014, Captora, Inc. All Rights Reserved.
 */

'use strict';

angular.module('Captora.datarpm.service', [])
    .service('DatarpmService', function ($http, REST) {
        var Api={
            accessToken: REST.dataRpm + 'secure/sso/access_token',
            crosToken: REST.resource + 'access_token/'
        };
        return {
            accessToken: function (params) {
                return $http.get(Url.datarpm.sso.accessToken, {params: params, withCredentials: true});
            },

            crosToken: function (email) {
                return $http.get(Api.crosToken + email);
            }
        };
    });
