angular.module('scheudler').controller("dashboardCtrl",
    function($scope,Util,dashboardService){

	$scope.messages = dashboardService.user.get();
	$scope.mygroups = dashboardService.groups.get();
	$scope.newMess = {sender_id: "", receiver_id: "", text: "", header: "", read: false, readers: [], deleted: []}; 
	
	// set correct line-height to center the pic and the time #groups
	$scope.center_groups=function(){
		var gr_text = document.getElementsByName('group-text');
		var gr_pic = document.getElementsByName('group-pic');
		for (i = gr_pic.length - 1; i >= 0; i--) {
			gr_text[i].style.lineHeight = gr_pic[i].offsetHeight.toString() + "px";
		}
	};

	// set correct line-height to center the pic and the time #events
	$scope.center_events=function(){
		var ev_text = document.getElementsByName('event-text');
		var ev_pic = document.getElementsByName('event-pic');
		var ev_close = document.getElementsByName('event-close');
		for (i = ev_text.length - 1; i >= 0; i--) {
			ev_pic[i].style.lineHeight = ev_text[i].offsetHeight.toString() + "px";
			ev_close[i].style.lineHeight = ev_text[i].offsetHeight.toString() + "px";
		}
	};
	// set correct line-height to center the pic and the time #messages
	$scope.center_messages=function(){
		var mes_text = document.getElementsByName('mes-text');
		var mes_pic = document.getElementsByName('mes-pic');
		var mes_time = document.getElementsByName('mes-time');
		for (var i = mes_text.length - 1; i >= 0; i--) {
			mes_pic[i].style.lineHeight = mes_text[i].offsetHeight.toString() + "px";
			mes_time[i].style.lineHeight = mes_text[i].offsetHeight.toString() + "px";
		}
	};
   

});
