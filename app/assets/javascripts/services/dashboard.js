angular.module('scheudler').service("dashboardService", function($resource) {
    var messageSer = $resource('api/messages/:group_id',{},
                        {
                            'get': {method: "GET", isArray:true},
                            'create': {method: "POST"},
                            'getAll': {method: "GET", isArray:true}
                        });
    var unreadSer = $resource('api/messages/unread/:id', {},
                        {
                            'unread': {method: "GET", ignoreLoadingBar: true},
                            'getNew': {method: "GET", isArray:true}
                        });

    var userSer = $resource('api/user/', {}, 
                        {
                            'get': {method: "GET"}
                        });

    var groupSer = $resource('api/dashboard/groups/', {},
                        {
                            'get': {method: "GET", isArray:true}
                        });

    return {
        message: {
            get: function(succ){ return messageSer.get(succ);},
            create: function(mes, succ){ return messageSer.create(mes, succ);},
            unread: function(succ){ return unreadSer.unread(succ);},
            getNew: function(group_index, succ){ return unreadSer.getNew({id: group_index}, succ);},
            getAll: function(groupId){return messageSer.getAll({group_id: groupId})}
        },
        user: {
            get: function(){ return userSer.get();}
        },
        groups: {
            get: function(){ return groupSer.get();}
        }
    }
    
});