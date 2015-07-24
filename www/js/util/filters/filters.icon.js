/**
 * Created by stan on 4/14/15.
 */
angular.module('cpm.filter', [])

    .filter('icon', function (PUSH_CONSTANTS) {
        return function (input) {
            return PUSH_CONSTANTS.content[input].icon;
        }
    });