angular.module('scheudler').service("dashboardService", function($resource) {
    var messageSer = $resource('api/messages/:group_id',{},
                        {
                            'get': {method: "GET", isArray:true},
                            'create': {method: "POST"},
                            'getAll': {method: "GET", isArray:true}
                        });
    var unreadSer = $resource('api/messages/unread/:id', {},
                        {
                            'unread': {method: "GET", ignoreLoadingBar: true}
                        });

    var userSer = $resource('api/user/', {}, 
                        {
                            'get': {method: "GET"}
                        });

    var groupSer = $resource('api/dashboard/groups/', {},
                        {
                            'get': {method: "GET", isArray:true}
                        });

    var inviteSer = $resource('api/dashboard/invites/', {},
                        {
                            'get_invites': {method: "GET", isArray:true}
                        });

    var eventSer = $resource('api/dashboard/events/', {}, 
                        {
                            'get_events': {method: "GET", isArray:true},
                            'accepted': {method: "POST"}
                        });


    return {
        message: {
            get: function(succ){ return messageSer.get(succ);},
            create: function(mes, succ){ return messageSer.create(mes, succ);},
            unread: function(succ){ return unreadSer.unread(succ);},
            getAll: function(groupId){return messageSer.getAll({group_id: groupId})}
        },
        user: {
            get: function(){ return userSer.get();}
        },
        groups: {
            get: function(){ return groupSer.get();}
        },
        events: {
            get_invites: function(succ){ return inviteSer.get_invites(succ);},
            get_events: function(succ){ return eventSer.get_events(succ);},
            accepted: function(acceptedData, succ){return eventSer.accepted(acceptedData, succ);}
        } 
    }
    
});