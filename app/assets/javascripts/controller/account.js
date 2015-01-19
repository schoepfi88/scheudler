angular.module('scheudler').controller("accountCtrl",
	function($scope,accountService,Util){
		$scope.change_user_settings = function(id){
			accountService.account.update(id, $scope.userData, function(){
				//location.href="/#/account";
				location.reload();
			});
		}

		$scope.init_settings_states = function(back_link_enabled){
			$scope.userData.back_link_enabled = back_link_enabled;
		}
		
		$scope.userData = {
			back_link_enabled: true
		}
});
