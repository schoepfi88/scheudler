// Angular Config / Routes

angular.module('scheudler', ['ngRoute','ngResource','angles','ui.bootstrap', 'chieffancypants.loadingBar','ui-iconpicker'])
        .config(function($httpProvider, $routeProvider){

  $httpProvider.defaults.headers.common = {'X-CSRF-Token': $("meta[name='csrf-token']").attr("content"),
                                          'Content-Type': 'application/json'};
  $routeProvider.
      when('/dashboard', {
        templateUrl: '/templates/dashboard',
        controller: 'dashboardCtrl'
      }).
      when('/calendar', {
        templateUrl: '/templates/calendar',
        controller: 'calendarCtrl'
      }).
      when('/events', {
        templateUrl: '/templates/events',
        controller: 'eventsCtrl'
      }).
      when('/events_create', {
        templateUrl: '/templates/events_create',
        controller: 'eventsCtrl'
      }).
      when('/events_dashboard',{
        templateUrl: '/templates/events_dashboard',
        controller: 'eventsCtrl'
      }).
      when('/groups', {
        templateUrl: '/templates/groups',
        controller: 'groupsCtrl'
      }).
	  when('/groups_create', {
        templateUrl: '/templates/groups_create',
        controller: 'groupsCtrl'
      }).
	  when('/groups_dashboard/:id', {
		templateUrl: function(params){ return '/templates/groups_dashboard/' + params.id; },
        controller: 'groupsCtrl'
      }).
	  when('/groups_dashboard/:id/invite', {
		templateUrl: function(params){ return '/templates/groups_dashboard/' + params.id + '/invite'; },
        controller: 'groupsCtrl'
      }).
	  when('/groups_dashboard/:id/members', {
		templateUrl: function(params){ return '/templates/groups_dashboard/' + params.id + '/members'; },
        controller: 'groupsCtrl'
      }).
	  when('/groups_dashboard/:id/settings', {
		templateUrl: function(params){ return '/templates/groups_dashboard/' + params.id + '/settings'; },
        controller: 'groupsCtrl'
      }).
      when('/statistic', {
        templateUrl: '/templates/statistic',
        controller: 'statisticCtrl'
      }).
      when('/account', {
        templateUrl: '/templates/account',
        controller: 'accountCtrl'
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
