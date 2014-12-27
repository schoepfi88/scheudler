angular.module('scheudler').service("dashboardService", function($resource) {
    var messageSer = $resource('api/messages/',{},
                        {
                            'get': {method: "GET", isArray:true},
                            'create': {method: "POST"}                            
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
            get: function(quantity){ return messageSer.get();},
            create: function(mes, succ){ return messageSer.create(mes, succ);}
        },
        user: {
            get: function(){ return userSer.get();}
        },
        groups: {
            get: function(){ return groupSer.get();}
        }
    }
    
});