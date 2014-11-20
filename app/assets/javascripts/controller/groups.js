angular.module('scheudler').controller("groupsCtrl", function($scope,groupsService,Util){
	
	$scope.create_group = function(isValid){
		if(isValid && $scope.isGoogleUser){
			groupsService.group.create($scope.groupData, function(){
				location.href="/#/groups";
				location.reload();
			});
		}
	};

	$scope.redirect_to_group = function(id){
		location.href="/#/groups_dashboard/" + id;
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
		if(providerString == "google_oauth2"){
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

	$scope.isGoogleUser = false;
});
