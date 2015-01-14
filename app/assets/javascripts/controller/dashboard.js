angular.module('scheudler').controller("dashboardCtrl",
    function($scope,$rootScope,$routeParams,$timeout,$templateCache,$q,Util,dashboardService){
	
	$scope.unreadMessages = dashboardService.message.unread();
	
	$scope.tickCounter = 0; 
	(function tick() {
		if ($rootScope.dash_is_active === true){		// only on dashboard polling is allowed
			dashboardService.message.unread(function(data){
				if($scope.old_status){
					$scope.forUpdate = [];
					for (var i = 0; i < data.unread.length; i++) {
						if (data.last_mes[i] != $scope.old_status.last_mes[i]){
							$scope.newMessages = dashboardService.message.get();
							$scope.allRead = false;
							$scope.forUpdate.push(i);
							$q.all([$scope.newMessages.$promise
								]).then(function() {
									for(var z = 0; z < $scope.forUpdate.length; z++){
										console.log($routeParams.index);
										if ($routeParams.index === undefined)
											$scope.mymessages[$scope.forUpdate[z]] = $scope.newMessages[$scope.forUpdate[z]];
										if ($routeParams.index !== undefined) {
											if ($scope.forUpdate[z].toString() === $routeParams.index){
												var check = data.unread[$scope.forUpdate[z]];
												var start_index = Object.keys($scope.newMessages[$scope.forUpdate[z]]).length - check;
												for (var r = start_index; r < Object.keys($scope.newMessages[$scope.forUpdate[z]]).length; r++){
													$scope.selectedGroupMessages.push($scope.newMessages[$scope.forUpdate[z]][r]);
												}
												start(500, true);
											}
										}
										$scope.unreadMessages.unread[$scope.forUpdate[z]] = $scope.unreadMessages.unread[$scope.forUpdate[z]]+data.unread[$scope.forUpdate[z]];
										$scope.tickCounter = 0;
									}
							});
						}
					}
				}
				$scope.old_status = data;
				$scope.tickCounter++;
				if ($scope.tickCounter === 5){
					$scope.unreadMessages = data;
					$scope.tickCounter = 0;
				}
			});
		}
		$scope.checkPolling();
		$timeout(tick, 3000);
	})();

	$q.all([$scope.unreadMessages.$promise]).then(function(){$scope.mymessages = dashboardService.message.get();});
	$scope.allRead = false;
	$scope.allEventsUnaccepted = dashboardService.events.get_invites();
	$scope.allEventsAccepted = dashboardService.events.get_events();
	$scope.mygroups = dashboardService.groups.get();
	$scope.newMess = {sender_id: "", receiver_id: "", text: "", readers: []}; 
	$scope.current_user = dashboardService.user.get();
	$scope.selectedGroupMessages = [];
	$scope.selectedGroup = null;
	/*++++start UI functions++++*/
	// set height if no group exists
	$scope.set_height=function(){
		if($scope.mygroups.length === 0){
			var group_body = document.getElementById('group_body');
			var event_body = document.getElementById('event_body');
			var invite_body = document.getElementById('invite_body');
			var group_empty = document.getElementById('group_empty');
			var set_height = Math.max(group_body.clientHeight, event_body.clientHeight, invite_body.clientHeight)/2;
			group_empty.style.lineHeight = set_height.toString() + "px";
		}
		if($scope.allEventsAccepted.length === 0){
			var event_empty = document.getElementById('event-empty');
			var ev_head = document.getElementById('event-head');
			var height = (ev_head.clientHeight * 0.76).toString() + "px";
			event_empty.style.lineHeight = height;
		}
		if($scope.allEventsUnaccepted.length === 0){
			var event_empty2 = document.getElementById('invite-empty');
			var ev_head2 = document.getElementById('event-head');
			var height2 = (ev_head2.clientHeight * 0.76).toString() + "px";
			event_empty2.style.lineHeight = height2;
		}

	}

	$scope.set_modal_height=function(){
		var modal_body = document.getElementById('scrollarea');
		var set = $(window).height();
		modal_body.style.height = (set-300) + "px";
		start(500,true);
	}

	// set correct line-height to center the pic and the time #groups
	$scope.center_groups=function(){
		var gr_text = document.getElementsByName('group-text');
		var gr_pic = document.getElementsByName('group-pic');
		var gr_head = document.getElementById('group_head');
		var height = (gr_head.clientHeight * 0.76).toString() + "px";
		for (var i = gr_text.length - 1; i >= 0; i--) {
			gr_text[i].style.lineHeight = height;
			gr_pic[i].style.lineHeight = height;
		}
	};

	// set correct line-height to center the pic and the time #events
	$scope.center_events=function(){
		var ev_text = document.getElementsByName('event-text');
		var ev_pic = document.getElementsByName('event-pic');
		var ev_close = document.getElementsByName('event-close');
		var ev_head = document.getElementById('event-head');
		var height = (ev_head.clientHeight * 0.76).toString() + "px";
		for (var i = ev_text.length - 1; i >= 0; i--) {
			ev_pic[i].style.lineHeight = height;
			ev_close[i].style.lineHeight = height;
		}
	};
	// set correct line-height to center the pic and the time #messages
	$scope.center_messages=function(){
		var mes_text = document.getElementsByName('mes-text');
		var mes_pic = document.getElementsByName('mes-pic');
		var mes_time = document.getElementsByName('mes-time');
		for (var i = mes_text.length - 1; i >= 0; i--) {
			if (mes_text[i].offsetHeight.toString() !== "0"){
				mes_pic[i].style.lineHeight = mes_text[i].offsetHeight.toString() + "px";
				mes_time[i].style.lineHeight = mes_text[i].offsetHeight.toString() + "px";
			}
		}
	};
	/*++++end UI functions++++*/

	$scope.send_message=function(group_id, group_text, index, modal_active){
		$scope.newMess.receiver_id = group_id;
		$scope.newMess.text = group_text;
		$scope.allRead = true;
		$scope.unreadMessages.unread[index] = 0;
		var max_messages = 7;
		dashboardService.message.create($scope.newMess, function(data){
			var groupmes = {};
			var mes = [];
			groupmes.mes = mes;
			if (!modal_active){
				var len = Object.keys($scope.mymessages[index]).length;
				if (len === max_messages){
					for (var i = 0; i < len-1; i++){
						$scope.mymessages[index][i] = $scope.mymessages[index][i+1];
					}
					$scope.mymessages[index][len-1] = data;
				}
				else {
					for (var j = 0; j < len; j++){
						groupmes.mes[j] = $scope.mymessages[index][j];
					}
					groupmes.mes.push(data);
					$scope.mymessages[index] = groupmes.mes;
				}
			}
			if (modal_active){
				$scope.selectedGroupMessages.push(data);
			}
			
	          var inputs = document.getElementsByName('input-text');
               for (var x = inputs.length - 1; x >= 0; x--) {
				inputs[x].value='';
			}
		});
		$scope.center_messages();
		
	};

	$scope.send_message_modal=function(group_id, group_text){
		$scope.send_message(group_id, group_text, $routeParams.index, true);
		start(5000, true, true);
	}

	$scope.redirect_to_dashboard = function(){
		location.href="/#/dashboard";
	}


	// check if message.read is just now set to true. if this is the case the message should be shown as unread for few seconds
	$scope.currentlyRead = function(mes, group_index, mes_index, modal_active){
		if ($scope.unreadMessages !== undefined && $scope.mymessages !== undefined){
			if ($scope.allRead){
				return false;
			}
			if ($scope.unreadMessages.unread[group_index] === 0){
				return false;
			}
			var date = new Date().toISOString();
			var millis = Date.parse(date) - 20000;
			var unread = $scope.unreadMessages.unread[group_index];
			// mark the correct number of messages as unread 
			if (!modal_active){
				var len = Object.keys($scope.mymessages[group_index]).length;
				var read = len - unread -1;
				if (mes_index > read){
					$scope.mymessages[group_index][mes_index].updated_at = "3000";		// to achieve compareDate is smaller -> ugly
				}
				else {
					$scope.mymessages[group_index][mes_index].updated_at = "1000";		// to achieve compareDate is greater -> ugly
				}
			}
			var compareDate = new Date(millis).toISOString();
			var currently = (compareDate < mes.updated_at);
			return currently;
		}
	};

	$scope.redirect_to_messages = function(id, index){
		location.href="/#/dashboard/messages/" + id.id +"/" + index;
	};

	$scope.currentUserIsSender = function(mes){
		return (mes.sender_id == $scope.current_user.id);
	};

	$scope.accepted = function(state, event_id){
		$scope.acceptedData = {
	          bool: state,
	          eve_id: event_id
		};
		dashboardService.events.accepted($scope.acceptedData, function(){
			var index = 0;
			for (var i = 0; i < $scope.allEventsUnaccepted; i++){
				if ($scope.allEventsUnaccepted[i].id === event_id){
					index = i; break;
				}
			}
			var new_next = $scope.allEventsUnaccepted.splice(index, 1);
			if(state === true)
				$scope.allEventsAccepted.push(new_next[0]);
		});
	};

	

	$scope.parseTime = function(time){
		var oneDayInMillis = 86400000;
		var oneHourInMillis = 3600000;
		if (time === null || time === undefined){
			return null;
		}
		else {
			var beginDate2014 = Date.parse(new Date (2014,3,30,2,0));
			var endDate2014 = Date.parse(new Date(2014,10,26,3,0));
			var beginDate2015 = Date.parse(new Date(2015,3,29,2,0));
			var endDate2015 = Date.parse(new Date(2015,10,25,3,0));
			var millis = Date.parse(time);
			var offset = oneHourInMillis;
			if ((millis > beginDate2014 && millis < endDate2014) || (millis > beginDate2015 && millis < endDate2015))
				offset = offset * 2; 
			var day = new Date(millis).toISOString().split("T")[0];
			var day1 = new Date(millis-offset);
			var todayMillis = Date.parse(new Date());
			var today = new Date(todayMillis+offset).toISOString().split("T")[0];
			//alert(new Date(millis-offset));

			if (today === day){
				return day1.format("shortTime");
			}
			return day1.format("mmm d");
		}
	};

	$scope.getGroupName = function(){
		$q.all([$scope.mygroups.$promise]).then(function(){
			$scope.selectedGroup = $scope.mygroups[$routeParams.index];
			$scope.selectedGroup.index = $routeParams.index;
		});
		// fix correct width of panel body and panel footer in all-messages overview because chrome has problems with the width
		// of panel body in combination with the scrollbar. the branch if(set != parseInt(set)) only set the correct margin for the chrome browser
		var modal_body = document.getElementById('scrollarea');
		var x = $('#scrollarea').width();
		var y = $('#footer-mes').width();
		//console.log("footer-mes " + y);
		//console.log("scrollarea " + x);
		var set = x - y;
		var dif = y - Math.ceil(x);
		//console.log("dif: " + dif);
		set = set + dif;
		//console.log(set);
		//console.log(parseInt(set));
		if (set !== parseInt(10, set))
			document.getElementById('footer-btn').style.marginRight = set + "px";

	};

	if ($routeParams.id >= 0){
		$scope.selectedGroupMessages = dashboardService.message.getAll($routeParams.id);
	}

	(function centering() {
		$scope.center_messages();
		$timeout(centering, 500);
	})();
	
});
