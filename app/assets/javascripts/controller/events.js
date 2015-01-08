angular.module('scheudler').controller("eventsCtrl",
    function($scope,eventsService, groupsService, Util){

        $scope.create_event = function(){
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

        $scope.allEvents = eventsService.event.get_events();
        

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
