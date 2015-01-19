angular.module('scheudler').controller("groupsCtrl", function($scope,groupsService,Util,$routeParams,$timeout,$templateCache,$rootScope,dashboardService){

	$scope.unreadMessages = 0;
	//For updating blog counter
	(function tick() {
		if ($rootScope.dash_groups_is_active === true){
			dashboardService.message.unread(function(data){
				if(data.unread[$routeParams.index] != $scope.unreadMessages)
					$scope.unreadMessages = data.unread[$routeParams.index];
			});
		}
		$scope.checkPolling();
		$timeout(tick, 3000);
	})();

	$scope.removeFromCache = function(id){
		$templateCache.remove('/templates/groups_dashboard/' + id + "/0");
	};

	$scope.isGoogleUser = false;
	
	$scope.create_group = function(isValid){
		if(isValid && $scope.isGoogleUser){
			groupsService.group.create($scope.groupData, function(){
				$templateCache.remove('/templates/groups');
				location.href="/#/groups";
			});
		}
	};

	$scope.init_form = function(id){
		groupsService.group.get(id, function(group){
			$scope.groupData.name = group.name;
			$scope.groupData.description = group.description;
			$scope.groupData.icon = group.icon;
		});

	};

	$scope.update_group = function(id, isValid){
		if(isValid){
			groupsService.group.update(id, $scope.groupData, function(){
				$templateCache.remove('/templates/groups');
				$templateCache.remove('/templates/groups_dashboard/' + id + '/0');
				location.href="/#/groups_dashboard/" + id + "/0";
			});
		}
	};

	$scope.delete_group = function(id){
		groupsService.group.destroy(id, function(){
			$templateCache.remove('/templates/groups');
			location.href="/#/groups";
		});
	};

	$scope.remove_member = function(group_id, user_id){
		$scope.memberData.group_id = group_id;
		$scope.memberData.user_id = user_id;
		groupsService.group.remove($scope.memberData, function(){
			$templateCache.remove('/templates/groups_dashboard/' + group_id + '/members');
			$templateCache.remove('/templates/groups_dashboard/' + group_id);
			location.href="/#/groups_dashboard/" + group_id + "/0";
		});
	};

	$scope.make_admin = function(group_id, user_id){
		$scope.memberData.group_id = group_id;
		$scope.memberData.user_id = user_id;
		groupsService.group.make_admin($scope.memberData, function(){
			$templateCache.remove('/templates/groups_dashboard/' + group_id + "/0");
			location.href="/#/groups_dashboard/" + group_id + "/0";
		});
	};

	$scope.redirect_to_back = function(back_link_enabled){
		if(back_link_enabled === null || back_link_enabled === false){
			Util.redirect_to.back();
		}
	};

	$scope.redirect_to_group = function(id, index){
		console.log(index);
		location.href="/#/groups_dashboard/" + id + "/"+ index;
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

	$scope.redirect_to_events = function(id){
		location.href="/#/events";
	};

	$scope.redirect_to_calendar = function(id){
		location.href="/#/calendar";
	};

	$scope.redirect_to_statistic = function(id){
		location.href="/#/statistic_groups/" + id;
	};

	$scope.redirect_to_blog = function(id){
		location.href="/#/dashboard/messages/" + id + "/" + $scope.unreadMessages;
	};

	$scope.redirect_to_invite = function(id){
		location.href="/#/groups_dashboard/" + id + "/invite";
	};

	$scope.redirect_to_settings = function(id){
		location.href="/#/groups_dashboard/" + id + "/settings";
	};

	$scope.invite_to_group = function(id, isValid){
		if(isValid){
			$scope.inviteData.group_id = id;
			groupsService.group.invite($scope.inviteData, function(){
				$templateCache.remove('/templates/groups_dashboard/' + id + "/0");
				$templateCache.remove('/templates/groups_dashboard/' + id + '/members');
				location.href="/#/groups_dashboard/" + id + "/0";
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
		icon: 'flaticon-ball39'
	};

	$scope.inviteData = {
		email: '',
		group_id: 0
	};

	$scope.memberData = {
		group_id: 0,
		user_id: 0
	};
});
