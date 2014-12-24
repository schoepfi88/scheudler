angular.module('scheudler').controller("rootCtrl",function($scope,$rootScope,$timeout,$location,Util,cfpLoadingBar){
    $scope.Util=Util;
    $scope.error_type="danger";
    $scope.pending_status_requests=0;

    $scope.startBar = function() {
      cfpLoadingBar.start();
    };

    $scope.completeBar = function () {
      cfpLoadingBar.complete();
    };
   
    $scope.isLoading = function(){
            if (($rootScope.pending_requests - $scope.pending_status_requests)<=0)
                $scope.completeBar();
            return ($rootScope.pending_requests - $scope.pending_status_requests)>0;
    };
    // used to show something with ng-show
    $scope.checkLoading = function(){ return ($rootScope.pending_requests - $scope.pending_status_requests)>0; };

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.startBar();

});
