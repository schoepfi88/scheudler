angular.module('scheudler').controller("eventsCtrl",
    function($scope, $routeParams, eventsService, dashboardService, Util){

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

        $scope.redirect_to_members = function(id){
        location.href="/#/events_dashboard/" + id;
        };

        $scope.get_members = eventsService.event.get_members($routeParams.id);
/*        $scope.get_members = function(event_id){
            eventsService.event.get_members(event_id, function(){
                location.href ="/#/events_dashboard";
                location.reload();
            });
        };
*/

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
