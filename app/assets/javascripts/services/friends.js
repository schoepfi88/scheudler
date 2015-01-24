angular.module('scheudler').factory("friendsService",function($resource) {
	var friendsService = $resource('/api/friends/:id',{},
						{
							'make_friend': {method: "POST"},
							'update': {method: "PUT"},
							'destroy': {method: "DELETE"}
						});

    return {
		friends: {
				make_friend: function(friendsData, succH, errH){
					friendsService.make_friend(friendsData, succH, errH);
				},
				update: function(id, friendsData, succH, errH){
					friendsService.update({id: id}, friendsData, succH, errH);
				},
				destroy: function(id, succH, errH){
					friendsService.destroy({id: id}, succH, errH);
				}
			}
    };
});
