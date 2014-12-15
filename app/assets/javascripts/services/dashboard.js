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

    return {
        messages: {
            get: function(quantity){ return messageSer.get({quantity: quantity});}
        },
        user: {
            get: function(){ return userSer.get();}
        }
    }
    
});