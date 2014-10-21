// Angular Config / Routes

angular.module('scheudler', ['ngRoute','ngResource','google-maps','angles','ui.bootstrap'])
        .config(function($httpProvider, $routeProvider){

  $httpProvider.defaults.headers.common = {'X-CSRF-Token': $("meta[name='csrf-token']").attr("content"),
                                          'Content-Type': 'application/json'};
  $routeProvider.
      when('/search/:term', {
        templateUrl: '/templates/search',
        controller: 'searchCtrl'
      }).
      otherwise({
        redirectTo: '/dashboard'
      });

      $httpProvider.interceptors.push(function($q,$rootScope,Util) {
          return {
              request: function(config){
                        $rootScope.pending_requests++;
                        return config;
                      },
              response: function(response) {
                        $rootScope.pending_requests--;
                        return response;
                      },
              responseError: function(rejection) {
                        $rootScope.pending_requests--;
                        return $q.reject(rejection);
                      }
          };
      });


}).run(function($rootScope,Util){
  $rootScope.pending_requests=0;
  $rootScope.$on('$routeChangeStart',function(){
    Util.clear_server_errors();     //clear errors on view change
    $('.modal.in').modal('hide');   //dirty nasty ugly hack!!! DON'T DO THIS AT
    fix_android_stock_select();
  });
});
