angular.module('scheudler').service("dashboardService", function($resource) {
    var messageSer = $resource('api/messages/',{},
                        {
                            'get': {method: "GET", isArray:true},
                            'create': {method: "POST", isArray:true},
                            'destroy': {method: "DELETE"}                            
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
        messages: {
            get: function(quantity){ return messageSer.get({quantity: quantity});}
        },
        user: {
            get: function(){ return userSer.get();}
        },
        groups: {
            get: function(){ return groupSer.get();}
        }
    }
    
});