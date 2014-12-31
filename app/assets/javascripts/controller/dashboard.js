angular.module('scheudler').controller("dashboardCtrl",
    function($scope,$rootScope,$timeout,$q,Util,dashboardService){
	$scope.unreadMessages = dashboardService.message.unread();
	(function tick() {
		$scope.pending_status_requests++;
		dashboardService.message.unread(function(data){
			if($scope.old_status){
				$scope.forUpdate = [];
				//console.log(data.unread);
				for (var i = 0; i < data.unread.length; i++) {
					if (data.unread[i] > $scope.old_status.unread[i]){
						$scope.newMessages = dashboardService.message.getNew(i);
						$scope.forUpdate.push(i);
						$q.all([$scope.newMessages.$promise
							]).then(function() {
								//console.log($scope.forUpdate.length);
								for(var z = 0; z < $scope.forUpdate.length; z++){
									$scope.mymessages[$scope.forUpdate[z]] = $scope.newMessages[$scope.forUpdate[z]];
								}
						});
						$scope.set_read();
					}
				}
			}
			$scope.old_status = data;
			$scope.unreadMessages = data;
			$timeout(tick, 5000);
		},
        function(){ $scope.pending_status_requests--; });
	})();
	// get messages without setting as read
	$scope.mymessages = dashboardService.message.getNew(0);
	// set as read after 10 sec
	$scope.set_read=function(){
		$timeout(function() {
			dashboardService.message.get();
		}, 10000);
	}
	$scope.set_read();
	$scope.mygroups = dashboardService.groups.get();
	$scope.newMess = {sender_id: "", receiver_id: "", text: "", readers: []}; 
	$scope.current_user = dashboardService.user.get();
	$scope.selectedGroupMessages = [];
	$scope.selectedGroup = null;
	/*++++design functions++++*/
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

	}

	$scope.set_modal_height=function(){
		var modal_body = document.getElementById('scrollarea');
		var set = $(window).height();
		modal_body.style.height = (set-200) + "px";
		start(500,true);
	}

	// set correct line-height to center the pic and the time #groups
	$scope.center_groups=function(){
		var gr_text = document.getElementsByName('group-text');
		var gr_pic = document.getElementsByName('group-pic');
		for (var i = gr_pic.length - 1; i >= 0; i--) {
			gr_text[i].style.lineHeight = gr_pic[i].offsetHeight.toString() + "px";
		}
	};

	// set correct line-height to center the pic and the time #events
	$scope.center_events=function(){
		var ev_text = document.getElementsByName('event-text');
		var ev_pic = document.getElementsByName('event-pic');
		var ev_close = document.getElementsByName('event-close');
		for (var i = ev_text.length - 1; i >= 0; i--) {
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
	/*++++design functions++++*/

	$scope.send_message=function(group_id, group_text, index){
		$scope.newMess.receiver_id = group_id;
		$scope.newMess.text = group_text;
		var max_messages = 7;
		dashboardService.message.create($scope.newMess, function(data){
			var groupmes = {};
			var mes = [];
			groupmes.mes = mes;
			var len = Object.keys($scope.mymessages[index]).length
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
			
	          var inputs = document.getElementsByName('input-text');
               for (var x = inputs.length - 1; x >= 0; x--) {
				inputs[x].value='';
			}
		});
		
	};

	$scope.send_message_modal=function(group_id, group_text, index){
		$scope.send_message(group_id, group_text, index);
		$scope.selectedGroupMessages = dashboardService.message.getAll(group_id);
		start(5000, true, true);
	}

	$scope.getAllMessages=function(group_id, index){
		$scope.set_modal_height();
		$scope.selectedGroupMessages = dashboardService.message.getAll(group_id);
		$scope.selectedGroup = $scope.mygroups[index];
		$scope.selectedGroup.index = index;
		start(7000, true, true);
	}

	// check if message.read is just now set to true. if this is the case the message should be shown as unread for few seconds
	$scope.currentlyRead = function(mes, allRead){
		if (allRead){
			return false;
		}
		var date = new Date().toISOString();
		var millis = Date.parse(date) - 10000;
		var compareDate = new Date(millis).toISOString();
		$scope.center_messages();
		return (compareDate < mes.updated_at);
	};

	$scope.currentUserIsSender = function(mes){
        return (mes.sender_id == $scope.current_user.id);
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
});
