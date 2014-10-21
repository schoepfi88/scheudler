angular.module('scheudler').controller("rootCtrl",function($scope,$rootScope,$timeout,$location,Util){
    $scope.Util=Util;
    $scope.error_type="danger";
    $scope.pending_status_requests=0;

    $scope.isLoading = function(){ return ($rootScope.pending_requests - $scope.pending_status_requests)>0; };

    $scope.isActive = function(route) {
        return route === $location.path();
    };

});
