angular.module('scheudler').factory("eventsService",function($resource) {
	var eventsService = $resource('/api/events/:id',{},
						{
							'create': {method: "POST"},
							'get': {method: "GET",
							isArray: true }
						});
	var participateService = $resource('/api/events_participate',{},
						{
							'participate': {method: "POST"}
						});
	var memberService = $resource('api/events_members',{},
						{
							'members': {method: "GET"}
						});

    return {
		event: {
				create: function(eventData, succH, errH){
					eventsService.create(eventData, succH, errH);
				},
				get_events: function(){
					return eventsService.get();
				},
				take_part: function(id, succH, errH){
					participateService.participate({id: id},succH,errH);
				},
				get_members: function(memData, succH, errH){
					memberService.members(memData);
				}
			}
    };
});