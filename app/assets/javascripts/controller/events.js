angular.module('scheudler').controller("eventsCtrl",
    function($scope, $routeParams, $rootScope, eventsService, dashboardService, Util){
        $scope.weekly = $rootScope.weekly;
        $scope.enddate = null;
        
        $scope.set_weekly = function(set){
            $rootScope.weekly = set;
        }
        $scope.create_event = function(){
            var group_id = $scope.eventData.group_id[0];
            $scope.eventData.group_id = group_id;
            eventsService.event.create($scope.eventData, function(){
                location.href ="/#/events";
            });
        };

        $scope.create_weekly_event = function(){
            var enddate = $scope.enddate;
            var startdate = $scope.eventData.date;
            var week_in_millis = 604800000;
            var day = startdate.toString().split("/")[1];
            var month = startdate.toString().split("/")[0];
            var year = startdate.toString().split("/")[2];

            startdate = new Date(year, month-1, day, 3, 3, 0, 0).toISOString();
            day = enddate.toString().split("/")[1];
            month = enddate.toString().split("/")[0];
            year = enddate.toString().split("/")[2];

            enddate = new Date(year, month-1, day, 3, 3, 0, 0).toISOString();

            while (startdate <= enddate){
                $scope.eventData.date = startdate;
                eventsService.event.create($scope.eventData);
                // add one week
                var tmp = Date.parse(startdate)+week_in_millis;
                startdate = new Date(tmp).toISOString();
            }
            $scope.eventData.date = startdate;
            eventsService.event.create($scope.eventData, function(){
                location.href ="/#/events";
            });
        };

        $scope.take_part = function(event_id, bool){
            eventsService.event.take_part(event_id, bool);
        };

        $scope.redirect_to_members = function(id){
            location.href="/#/events_dashboard/" + id;
        };

        $scope.get_members = eventsService.event.get_members($routeParams.id);

        $scope.allEvents = eventsService.event.get_events();

        $scope.groups = dashboardService.groups.get();

        $scope.eventData = {
            name: '',
            location: '',
            description: '',
            date: '',
            group_id: '',
          //from: '',
          //till: '',
          time: ''
      };

	$scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';
  });
