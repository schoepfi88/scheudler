angular.module('scheudler').controller("groupsCtrl", function($scope,groupsService,Util){
	$scope.isGoogleUser = false;
	$scope.create_group = function(isValid){
		if(isValid && $scope.isGoogleUser){
			groupsService.group.create($scope.groupData, function(){
				location.href="/#/groups";
				location.reload();
			});
		}
	};

	$scope.delete_group = function(id){
		groupsService.group.destroy(id, function(){
			location.href="/#/groups";
			location.reload();
		});
	};

	$scope.remove_member = function(group_id, user_id){
		$scope.removeData.group_id = group_id;
		$scope.removeData.user_id = user_id;
		groupsService.group.remove($scope.removeData, function(){
			location.href="/#/groups_dashboard/" + group_id;
			location.reload();
		});
	};

	$scope.redirect_to_back = function(back_link_enabled){
		if(back_link_enabled === null || back_link_enabled === false){
			Util.redirect_to.back();
		}
	};

	$scope.redirect_to_group = function(id){
		location.href="/#/groups_dashboard/" + id;
	};

	$scope.redirect_to_groups_create = function(is_google_user){
		if(is_google_user)
			location.href="/#/groups_create";
		else
			location.href="/#/account";
	};

	$scope.redirect_to_members = function(id){
		location.href="/#/groups_dashboard/" + id + "/members";
	};

	$scope.invite_to_group = function(id, isValid){
		if(isValid){
			$scope.inviteData.group_id = id;
			groupsService.group.invite($scope.inviteData, function(){
				location.href="/#/groups_dashboard/" + id;
				location.reload();
			});
		}
	};

	$scope.checkIfGoogleUser = function(providerString){
		if(providerString == 'google_oauth2'){
			$scope.isGoogleUser = true;
		}
	};

	$scope.groupData = {
		name: '',
		description: '',
		icon: 'fa-beer'
	};

	$scope.inviteData = {
		email: '',
		group_id: 0
	};

	$scope.removeData = {
		group_id: 0,
		user_id: 0
	};
});
