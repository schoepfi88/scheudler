angular.module('scheudler').controller("groupsCtrl", function($scope,groupsService,Util,$location,$route){
	$scope.submit = function(){
		if($scope.groupData.name != '' && $scope.groupData.description != ''){
			groupsService.group.create($scope.groupData, function(){
				Util.redirect_to.back('/groups');
				window.location.reload();
			});
		}
	};

	$scope.groupData = {
		name: '',
		description: ''
	};
});
