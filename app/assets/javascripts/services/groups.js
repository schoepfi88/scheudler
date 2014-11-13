angular.module('scheudler').factory("groupsService",function($resource) {
	var groupsService = $resource('/api/groups/:id',{},
						{
							'create': {method: "POST"},
							'get': {method: "GET"},
							'update': {method: "PUT"},
							'destroy': {method: "DELETE"}
						});
	var inviteService = $resource('/api/groups_invite/:id',{},
						{
							'invite': {method: "POST"}
						});
    return {
		group: {
				create: function(groupData, succH, errH){
					groupsService.create(groupData, succH, errH);
				},
				get: function(id, succH, errH){
					return groupsService.get({id: id}, succH, errH);
				},
				update: function(id, groupData, succH, errH){
					groupsService.update({id: id}, groupData, succH, errH);
				},
				destroy: function(id, succH, errH){
					groupsService.destroy({id: id}, succH, errH);
				},
				invite: function(inviteData, succH, errH){
					inviteService.invite(inviteData, succH, errH);
				}
			}
    };
});
