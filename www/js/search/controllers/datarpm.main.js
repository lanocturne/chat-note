/**
 * Created by stan on 3/2/15.
 */
'use strict';

angular.module('Captora.datarpm')
    .constant('DATARPM_SSO', Object.freeze({
        client_id: 'ea780723-fd46-46be-baf2-766dc0eefadf',
        client_secret: '4ecd91abd085de2cbe4051dc1bd785a7',
        host: 'https://nlp.captora.com',
        token: 'TGT-59-JRekIgTAcMtBnXUUKcYFhGmqly3I9RrVv5uDEhcgUd0xqtfMw1-api.datarpm.com',
        bgColor: '',
        navHighlightTextColor: '#788288',
        moduleHeaderBackgroundColor: '#F9FAFC',
        contentBackgroundColor: '#FFFFFF',
        pageBackgroundColor: '#F2F4F8'
    }))
    .controller('DatarpmCtrl',
    function ($scope,
              accessToken,
              $sce) {
        $scope.nlp=$sce.trustAsResourceUrl("http://nlp.captora.com");

        $scope.token = accessToken.data.accessToken;
    });
