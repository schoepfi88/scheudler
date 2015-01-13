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
	var memberService = $resource('api/events_dashboard/:id',{},
						{
							'members': {method: "GET",
							isArray: true }
						});

    return {
		event: {
				create: function(eventData, succH, errH){
					eventsService.create(eventData, succH, errH);
				},
				get_events: function(succH){
					return eventsService.get(succH);
				},
				take_part: function(id, bool, succH, errH){
					participateService.participate({id: id}, {accepted: bool}, succH,errH);
				},
				get_members: function(id, succH, errH){
					return memberService.members({id: id},succH, errH);
				}
			}
    };
});
