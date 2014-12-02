angular.module('scheudler').factory("accountService",function($resource) {
	var accountService = $resource('/api/account/:id',{},
						{
							'update': {method: "PUT"},
							'destroy': {method: "DELETE"}
						});

    return {
		account: {
				update: function(id, accountData, succH, errH){
					accountService.update({id: id}, accountData, succH, errH);
				},
				destroy: function(id, succH, errH){
					accountService.destroy({id: id}, succH, errH);
				}
			}
    };
});
