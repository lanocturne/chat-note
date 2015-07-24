/**
 * Created by stan on 3/5/15.
 */
'use strict';

angular.module('Captora.datarpm.iframe', [])
    .directive('drpmIframe', function ($sce) {
        return {
            restrict: 'E',
            templateUrl: 'js/search/directives/datarpm-iframe/drpm-iframe.html',
            controller: function ($scope, $window, $attrs, DATARPM_SSO) {
                $scope.width = $window.innerWidth - $attrs.widthOffset || 60;
                $scope.height = $window.innerHeight - $attrs.heightOffset || 60;
                $scope._drpm_embed = [];

                $scope._drpm_embed.push(['access_token', $scope.token]);
                $scope._drpm_embed.push(['client_id', DATARPM_SSO.client_id]);
                //$scope._drpm_embed.push(['user_role', {
                //    value: 'Captora_sec_group',
                //    accountId: '54efe1cfe4b09fd28cdb8081'
                //}]);
                $scope._drpm_embed.push(['container_id', '']);
                $scope._drpm_embed.push(['width', $scope.width || '']);
                $scope._drpm_embed.push(['height', $scope.height]);
                $scope._drpm_embed.push(['logo', 'no']);
                $scope._drpm_embed.push(["export_enabled", "yes"]);
                $scope._drpm_embed.push(['style_configs', {
                    pageBackgroundColor: DATARPM_SSO.pageBackgroundColor,
                    contentBackgroundColor: DATARPM_SSO.contentBackgroundColor,
                    navBackgroundColor: DATARPM_SSO.bgColor,
                    navTextColor: '',
                    navHighlightBackgroundColor: DATARPM_SSO.navHighlightTextColor,
                    navHighlightTextColor: '',
                    moduleHeaderBackgroundColor: DATARPM_SSO.moduleHeaderBackgroundColor,
                    moduleHeaderTextColor: '',
                    exploreHighlightColor: '',
                    exploreHighlightTextColor: '',
                    searchBarBackgroundColor: DATARPM_SSO.bgColor,
                    searchBarTextColor: DATARPM_SSO.bgColor
                }]);

                $scope._drpm_embed.push(['configs', {
                    host: DATARPM_SSO.host,
                    entity_type: 'full',
                    entity_id: '',
                    dm_id: '1234',
                    embed_token: '2bd9c7bc-4619-480c-b360-cb7523c7b9fc'
                }]);

                $scope._drpm_embed.push(['sso_account_id', '54efe1cfe4b09fd28cdb8081']);

                $scope._drpm_embed.push(['version', 'v1']);

                $scope.getEntityWidth = function (entityType, width) {
                    return width;
                };

                $scope.getEntityHeight = function (entityType, height) {
                    return height;
                };

                $scope.iframeLoaded = function () {
                    $scope.iframeEnd = true;
                }
            },

            link: function (scope, ele) {
                var drpm_filters = [], bc_drpm_filters = [], drpm_embed_filters = [],
                    _drpm_embed = scope._drpm_embed;
                var drpm_invalid_height = -1;
                var drpm_invalid_width = -1;
                var iframeManagerHost = '';
                var iframeContainer = [];
                var drpm_embed_access_token = [], drpm_embed_client_id = [], drpm_embed_wrapper = [], drpm_embed_iframe_width = [], drpm_embed_iframe_height = [], is_drpm_embed_logo = [],
                    drpm_embed_location_host = [], drpm_embed_solution_id = [], drpm_embed_entity_type = [], drpm_embed_style_config = [], drpm_embed_embed_token = [], drpm_embed_dm_id = [],
                    drpm_embed_sso_enabled = [], drpm_embed_embed_type = [], drpm_embed_entity_id = [], drpm_embed_domain = [], drpm_embed_version = [],

                    drpm_embed_user_roles = [], drpm_embed_title = [], drpm_embed_description = [], drpm_disable_filter_info = false, drpm_export_enabled = true;

                for (var i = 0; i <= _drpm_embed.length - 1; i++) {
                    switch (_drpm_embed[i][0]) {
                        case 'access_token':
                            drpm_embed_access_token.push(_drpm_embed[i][1]);
                            break;
                        case 'client_id':
                            drpm_embed_client_id.push(_drpm_embed[i][1]);
                            break;
                        case 'container_id':
                            drpm_embed_wrapper.push(_drpm_embed[i][1]);
                            break;
                        case 'width':
                            drpm_embed_iframe_width.push(_drpm_embed[i][1]);
                            break;
                        case 'height':
                            drpm_embed_iframe_height.push(_drpm_embed[i][1]);
                            break;
                        case 'logo':
                            is_drpm_embed_logo.push(_drpm_embed[i][1]);
                            break;
                        case 'host':
                            drpm_embed_location_host.push(_drpm_embed[i][1]);
                            break;
                        case 'solution_id':
                        case 'account_id':
                        case 'sso_account_id':
                            drpm_embed_solution_id.push(_drpm_embed[i][1]);
                            if (_drpm_embed[i][0] == 'solution_id') {
                                drpm_embed_embed_type.push('solution');
                                drpm_embed_sso_enabled.push(true);
                            }
                            else if (_drpm_embed[i][0] == 'sso_account_id') {
                                drpm_embed_embed_type.push('project');
                                drpm_embed_sso_enabled.push(true);
                            }
                            else {
                                drpm_embed_embed_type.push('project');
                                drpm_embed_sso_enabled.push(false);
                            }
                            break;
                        case 'entity_type':
                            drpm_embed_entity_type.push(_drpm_embed[i][1]);
                            break;
                        case 'entity_id':
                            drpm_embed_entity_id.push(_drpm_embed[i][1]);
                            break;
                        case 'title':
                            drpm_embed_title.push(_drpm_embed[i][1]);
                            break;
                        case 'description':
                            drpm_embed_description.push(_drpm_embed[i][1]);
                            break;
                        case 'dm_id':
                            drpm_embed_dm_id.push(_drpm_embed[i][1]);
                            break;
                        case 'domain':
                            drpm_embed_domain.push(_drpm_embed[i][1]);
                            break;
                        case 'version':
                            drpm_embed_version.push(_drpm_embed[i][1]);
                            break;
                        case 'embed_token':
                            drpm_embed_embed_token.push(_drpm_embed[i][1]);
                            break;
                        case 'user_role':
                            drpm_embed_user_roles.push(_drpm_embed[i][1].value);
                            break;
                        case 'configs':
                            for (var propt in _drpm_embed[i][1]) {
                                switch (propt) {
                                    case 'host':
                                        drpm_embed_location_host.push(_drpm_embed[i][1][propt]);
                                        break;
                                    case 'entity_type':
                                        drpm_embed_entity_type.push(_drpm_embed[i][1][propt]);
                                        break;
                                    case 'entity_id':
                                        drpm_embed_entity_id.push(_drpm_embed[i][1][propt]);
                                        break;
                                    case 'dm_id':
                                        drpm_embed_dm_id.push(_drpm_embed[i][1][propt]);
                                        break;
                                    case 'embed_token':
                                        drpm_embed_embed_token.push(_drpm_embed[i][1][propt]);
                                        break;
                                }
                            }
                            break;
                        case 'style_configs':
                            for (var k in _drpm_embed[i][1]) {
                                if (_drpm_embed[i][1].hasOwnProperty(k)) {
                                    _drpm_embed[i][1][k] = _drpm_embed[i][1][k].replace('#', '');
                                }
                            }
                            drpm_embed_style_config.push(_drpm_embed[i][1]);
                            break;
                        case 'disable_filter_info':
                            drpm_disable_filter_info = _drpm_embed[i][1];
                        case 'export_enabled':
                            drpm_export_enabled = _drpm_embed[i][1];
                        default:
                            var filter_patt = /drpm_filter_/g;
                            filter_patt.lastIndex = null;
                            if (_drpm_embed[i][0] == 'drpm_embed_filter') {
                                drpm_embed_filters[_drpm_embed[i][1].entityId] = drpm_embed_filters[_drpm_embed[i][1].entityId] || [];
                                drpm_embed_filters[_drpm_embed[i][1].entityId] = _drpm_embed[i][1].filters;
                            }
                            else if (filter_patt.test(_drpm_embed[i][0]) && filter_patt.lastIndex == 12) {
                                if (typeof(_drpm_embed[i][1].entityId) != 'undefined') {
                                    drpm_filters[_drpm_embed[i][1].entityId] = drpm_filters[_drpm_embed[i][1].entityId] || [];
                                    drpm_filters[_drpm_embed[i][1].entityId].push({
                                        name: _drpm_embed[i][1].internalId,
                                        dataMartId: _drpm_embed[i][1].dmId,
                                        value: _drpm_embed[i][1].value
                                    });
                                }
                                else {
                                    bc_drpm_filters.push({
                                        name: _drpm_embed[i][1].internalId || _drpm_embed[i][0].substring(12, _drpm_embed[i][0].length),
                                        value: _drpm_embed[i][1].value || _drpm_embed[i][1]
                                    });
                                }
                            }
                            break;
                    }
                }
                for (i = 0; i < drpm_embed_wrapper.length; i++) {
                    if (document.getElementById('drpm_iframe_container_' + i) == null) {
                        var entityType = drpm_embed_entity_type[i] || "";
                        var width = parseInt(drpm_embed_iframe_width[i]);
                        var height = parseInt(drpm_embed_iframe_height[i]);
                        var iframeWidthAutoResize = false;
                        var iframeHeightAutoResize = false;
                        drpm_embed_iframe_width[i] = scope.getEntityWidth(entityType, width);
                        drpm_embed_iframe_height[i] = scope.getEntityHeight(entityType, height);
                        if (_.isNaN(width)) {
                            iframeWidthAutoResize = true;
                            drpm_embed_iframe_width[i] = drpm_invalid_width;
                        }
                        if (_.isNaN(height)) {
                            iframeHeightAutoResize = true;
                            drpm_embed_iframe_height[i] = drpm_invalid_height;
                        }

                        var drpm_embed_iframe = ele.find('iframe')[0];

                        if (drpm_embed_sso_enabled[i]){
                            var rawSrc = drpm_embed_location_host[i] + '/solution/embed/' + drpm_embed_entity_type[i] + '/' + drpm_embed_solution_id[i] + (drpm_embed_entity_id[i] == '' ? '' : '/' + drpm_embed_entity_id[i]) + '?ticket=' + drpm_embed_access_token[i] + '&client_id=' + drpm_embed_client_id[i] + '&width=' + drpm_embed_iframe_width[i] + '&height=' + drpm_embed_iframe_height[i] + '&version=' + drpm_embed_version[i] + '&embed_type=' + drpm_embed_embed_type[i] + '&embedToken=' + drpm_embed_embed_token[i] + '&embed_filters=' + JSON.stringify(drpm_filters[drpm_embed_entity_id[i]] || bc_drpm_filters || []) + '&drpm_embed_filters=' + JSON.stringify(drpm_embed_filters[drpm_embed_entity_id[i]] || []) + '&drpm_disable_filter_info=' + drpm_disable_filter_info + '&drpm_export_enabled=' + drpm_export_enabled + '&style_config=' + JSON.stringify(drpm_embed_style_config[i]) + '&user_role=' + (drpm_embed_user_roles[i] || '') + '&title=' + (drpm_embed_title[i] || "") + "&description=" + (drpm_embed_description[i] || "") + (drpm_embed_dm_id[i] != "" ? "&ia_datamartid=" + drpm_embed_dm_id[i] : "");
                            drpm_embed_iframe.src= $sce.trustAsUrl(rawSrc);
                        }
                        else
                            drpm_embed_iframe.src = drpm_embed_location_host[i] + '/analytics_embedded/' + drpm_embed_solution_id[i] + (drpm_embed_dm_id[i] == '' ? '' : '/' + drpm_embed_dm_id[i]) + '/' + drpm_embed_entity_type[i] + (drpm_embed_embed_token[i] == '' ? '' : '/' + drpm_embed_embed_token[i]) + (drpm_embed_entity_id[i] == '' ? '' : '/' + drpm_embed_entity_id[i]) + '/' + drpm_embed_iframe_width[i] + '/' + drpm_embed_iframe_height[i] + '?embed_filters=' + JSON.stringify(drpm_filters[drpm_embed_entity_id[i]] || bc_drpm_filters || []) + '&drpm_embed_filters=' + JSON.stringify(drpm_embed_filters[drpm_embed_entity_id[i]] || []) + '&drpm_disable_filter_info=' + drpm_disable_filter_info + '&drpm_export_enabled=' + drpm_export_enabled + '&style_config=' + JSON.stringify(drpm_embed_style_config[i]) + '&user_role=' + (drpm_embed_user_roles[i] || '') + '&title=' + (drpm_embed_title[i] || "") + "&description=" + (drpm_embed_description[i] || "");


                        drpm_embed_iframe.id = 'drpm_embedded_iframe_' + i;
                        drpm_embed_iframe.width = drpm_embed_iframe_width[i] + 'px';
                        drpm_embed_iframe.height = drpm_embed_iframe_height[i] + 'px';
                        var drpm_embed_iframe_container = ele[0];
                        drpm_embed_iframe_container.id = 'drpm_iframe_container_' + i;
                        iframeManagerHost = drpm_embed_location_host[i];
                        iframeContainer.push({
                            containerId: drpm_embed_iframe_container.id,
                            iframeSrc: drpm_embed_iframe.src, iframeWidthAutoResize: iframeWidthAutoResize,
                            iframeHeightAutoResize: iframeHeightAutoResize, width: drpm_embed_iframe.width,
                            height: drpm_embed_iframe.height
                        });
                        var clearDiv = document.createElement("div");
                        clearDiv.setAttribute("style", "clear: both;");
                        drpm_embed_iframe_container.appendChild(clearDiv);

                        if (is_drpm_embed_logo[i] == 'yes') {
                            var drpm_embed_logo = document.createElement('div');
                            drpm_embed_logo.id = 'drpm_logo_' + i;
                            drpm_embed_logo.setAttribute("style", "float: left; width: " + drpm_embed_iframe_width[i] + "; margin-top: 10px;");
                            drpm_embed_logo.innerHTML = '<div style="float: right; font-size: 13px;"> <span style="vertical-align: top;"> powered by </span><a href="http://datarpm.com" target="_blank"><img style="width: 75px;" src="' + drpm_embed_location_host[i] + '/public/images/drpm_m.png" alt="DataRPM"> </a></div>';
                        }
                    }
                }
            }
        }
    });
