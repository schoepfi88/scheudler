angular.module('scheudler').factory("Util",function($rootScope,$location) {
    return {
        has_server_errors: function(){ return ($rootScope.server_errors=!null); },
        get_server_errors: function(){ return $rootScope.server_errors;},
        set_server_errors: function(errors){$rootScope.server_errors=errors;},
        clear_server_errors: function(){$rootScope.server_errors=null;},
        delete_server_error: function(i){$rootScope.server_errors.splice(i,1);},
        redirect_to: {
            dashboard: function(){$location.path("dashboard");},
            back: function(url){if (url !== undefined) $location.path(url); else history.back();}
        }
    };


});
