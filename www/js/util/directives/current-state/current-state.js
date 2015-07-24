/**
 * Created by stan on 3/21/15.
 */
'use strict';
angular.module('btr.directives.currentState',[])
  .directive('currentState', function($rootScope){
    return{
      restrict: 'C',
      controller: function($scope){

        $scope.stateClass = null;
        $scope.currentState = null;
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
          $scope.stateClass = toState.name.replace(/\./g, '-');
          $scope.currentState = toState;
          $rootScope.currentState = toState;
        });
      },
      link: function(scope, elem){
        scope.elem = elem;
      }
    };
  });
