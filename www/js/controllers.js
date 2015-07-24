'use strict';
angular.module('starter.controllers', [])
.controller('DashCtrl', function($scope, Notifications) {
	$scope.notification = Notifications.all();
	$scope.remove = function(notification) {
		Notifications.remove(notifcation);
	};
})
.controller('TabsCtrl', function($scope, $state,$rootScope) {
		$rootScope.$on('$ionicView.beforeEnter', function() {

			$scope.hideTabs = false;

			if ($state.current.name === 'tab.chats') {
				$scope.hideTabs = true;
			}
		});
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
});


