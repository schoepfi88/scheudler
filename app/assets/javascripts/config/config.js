// Angular Config / Routes
var app = angular.module('scheudler', ['ngRoute','ngResource','angles','ui.bootstrap', 'chieffancypants.loadingBar','ui-iconpicker', 'checklist-model', 'ngAutocomplete']);

app.config(function($httpProvider, $routeProvider){
	$httpProvider.defaults.headers.common = {'X-CSRF-Token': $("meta[name='csrf-token']").attr("content"), 'Content-Type': 'application/json'};
	
	$routeProvider.
	when('/dashboard', {
		templateUrl: '/templates/dashboard',
		controller: 'dashboardCtrl'
	}).
  when('/dashboard/messages/:id/:index', {
        templateUrl: function(id, index){ return '/templates/dashboard/messages/' + id.id + index; },
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
	when('/events_dashboard/:id',{
		templateUrl: function(params){ return '/templates/events_dashboard/' + params.id;},
		controller: 'eventsCtrl'
	}).
	when('/events_location/:id',{
		templateUrl: function(params){ return '/templates/events_location/' + params.id;},
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
	when('/groups_dashboard/:id/:index', {
		templateUrl: function(params){ return '/templates/groups_dashboard/' + params.id + "/" + params.index; },
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
	when('/statistic_groups/:id', {
		templateUrl: function(params){ return '/templates/statistic_groups/' + params.id; },
		controller: 'statisticCtrl'
	}).
	when('/friends', {
		templateUrl: '/templates/friends',
		controller: 'friendsCtrl'
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
  $rootScope.dash_is_active = true;
  $rootScope.dash_groups_is_active = false;
  $rootScope.$on('$routeChangeStart',function(){
    Util.clear_server_errors();     //clear errors on view change
    $('.modal.in').modal('hide');   //dirty nasty ugly hack!!! DON'T DO THIS AT
    fix_android_stock_select();
  });
});
