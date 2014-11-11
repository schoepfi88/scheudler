angular.module('scheudler').controller("groupsCtrl", function($scope,groupsService,Util){
	$scope.submit = function(){
		if($scope.groupData.name !== '' && $scope.groupData.description !== ''){
			groupsService.group.create($scope.groupData, function(){
				location.href="/#/groups";
				location.reload();
			});
		}
	};

	$scope.redirect_to_group = function(id){
		location.href="/#/groups_dashboard/" + id;
	};

	$scope.groupData = {
		name: '',
		description: '',
		icon: ''
	};
});
