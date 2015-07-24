'use strict';

angular.module('Captora.datarpm', [
    'Captora.datarpm.service',
    'Captora.datarpm.iframe'
])
    .constant('DATARPM_STATE', Object.freeze({
        main: 'tab.search'
    }))
    .config(function ($stateProvider,
                      DATARPM_STATE) {
        $stateProvider.state(DATARPM_STATE.main, {
            url: '/search',
            views: {
                'search': {
                    templateUrl: 'js/search/views/datarpm.index.html',
                    controller: 'DatarpmCtrl'
                    ,
                    resolve: {
                        accessToken: function (DatarpmService, UmsFactory) {
                            return DatarpmService.crosToken(UmsFactory.getUser().user_email);
                        }
                    }
                }
            }
        });
    });
