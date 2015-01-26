angular.module('scheudler').controller("eventsCtrl",
    function($scope, $routeParams, $rootScope, eventsService, dashboardService, Util){
        $scope.weekly = $rootScope.weekly;
        $scope.enddate = null;
        $scope.start_time = null;
        $scope.limit = 1;
        $scope.checked = 0;

        $scope.allEvents = eventsService.event.get_events(function(data){
            for(var i = 0; i < data.length; i++){
                data[i].time = new Date(data[i].time).format("shortTime");
                data[i].date = new Date(data[i].date).format("dd. mmm");
            }

        });

        $scope.set_weekly = function(set){
            $rootScope.weekly = set;
        };
        $('#timepicker').timepicker({ 'timeFormat': 'h:i' });
        $('#timepicker2').timepicker({ 'timeFormat': 'h:i' });

        $scope.checkChanged = function(eve){
            if(eve.group_id = "") {
                $scope.checked++;
            }
            else $scope.checked--;
        };

        $scope.create_event = function(valid){
            if(valid){
                var group_id = $scope.eventData.group_id[0];
                $scope.eventData.group_id = group_id;
                $scope.eventData.start = $scope.eventData.start + " " + $scope.start_time;
                eventsService.event.create($scope.eventData, function(){
                    location.href ="/#/events";
                });
            }
        };

        $scope.create_weekly_event = function(valid){
            if(valid){
                var enddate = $scope.enddate + "T" + $scope.start_time;
                var startdate = $scope.eventData.start + "T" + $scope.start_time;
                var week_in_millis = 604800000;

                while (startdate <= enddate){
                    $scope.eventData.start = startdate;
                    eventsService.event.create($scope.eventData);
                    // add one week
                    var tmp = Date.parse(startdate)+week_in_millis;
                    startdate = new Date(tmp).toISOString();
                }
                $scope.eventData.start = startdate;
                eventsService.event.create($scope.eventData);
                location.href ="/#/events";
            }
        };

        $scope.take_part = function(event_id, bool, index){
            $scope.allEvents[index].accepted = bool;
            eventsService.event.take_part(event_id, bool);
        };

        $scope.redirect_to_members = function(id){
            location.href="/#/events_dashboard/" + id;
        };

        $scope.get_members = eventsService.event.get_members($routeParams.id);

        

        $scope.groups = dashboardService.groups.get();

        $scope.eventData = {
            name: '',
            location: '',
            description: '',
            start: '',
            group_id: '',
            time: ''
          //from: '',
          //till: '',
      };

	$scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';
  });
