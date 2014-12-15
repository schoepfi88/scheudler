angular.module('scheudler').controller("dashboardCtrl",
    function($scope,Util,dashboardService){

	$scope.messages = dashboardService.user.get();
	// set correct line-height to center the pic and the time
	var element = document.getElementById('mes-text');
	var pic = document.getElementById('mes-pic');
	var time = document.getElementById('mes-time');
	pic.style.lineHeight = element.offsetHeight.toString() + "px";
	time.style.lineHeight = element.offsetHeight.toString() + "px";
	
});
