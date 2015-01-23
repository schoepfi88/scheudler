angular.module('scheudler').controller("eventsCtrl",
    function($scope, $routeParams, $rootScope, eventsService, dashboardService, Util){
        $scope.weekly = $rootScope.weekly;
        $scope.enddate = null;
        $scope.start_time = null;
        
        $scope.set_weekly = function(set){
            $rootScope.weekly = set;
        }
        $scope.create_event = function(){
            var group_id = $scope.eventData.group_id[0];
            $scope.eventData.group_id = group_id;
            $scope.eventData.start = $scope.eventData.start + " " + $scope.start_time;
            eventsService.event.create($scope.eventData, function(){
                location.href ="/#/events";
            });
        };

        $scope.create_weekly_event = function(){
            var enddate = $scope.enddate;
            var startdate = $scope.eventData.start;
            var week_in_millis = 604800000;
            var day = startdate.toString().split("-")[2];
            var month = startdate.toString().split("-")[1];
            var year = startdate.toString().split("-")[0];

            startdate = new Date(year, month-1, day, 3, 3, 0, 0).toISOString();
            day = enddate.toString().split("-")[2];
            month = enddate.toString().split("-")[1];
            year = enddate.toString().split("-")[0];

            enddate = new Date(year, month-1, day, 3, 3, 0, 0).toISOString();

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
        };

        $scope.take_part = function(event_id, bool){
            eventsService.event.take_part(event_id, bool);
        };

        $scope.redirect_to_members = function(id){
            location.href="/#/events_dashboard/" + id;
        };

        $scope.get_members = eventsService.event.get_members($routeParams.id);

        $scope.allEvents = eventsService.event.get_events(function(data){
            for(var i = 0; i < data.length; i++){
                data[i].time = new Date(data[i].time).format("shortTime");
                data[i].date = new Date(data[i].date).format("dd. mmm");
                
            }
        });

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
