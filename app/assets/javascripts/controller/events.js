angular.module('scheudler').controller("eventsCtrl",
    function($scope,eventsService, groupsService, dashboardService, Util){

        $scope.create_event = function(){
            var group_id = $scope.eventData.group_id[0];
            console.log(group_id);
            $scope.eventData.group_id = group_id;
            eventsService.event.create($scope.eventData, function(){
            location.href ="/#/events";
            location.reload();
            });
        };

        $scope.take_part = function(event_id){
            eventsService.event.take_part(event_id);
        };

        $scope.deny = function(event_id){
        };

        $scope.get_members = function(){
        };

        $scope.test = function(){
            console.log("test");
        }

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
          time: ''};
  });
