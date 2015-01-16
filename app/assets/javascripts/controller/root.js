angular.module('scheudler').controller("rootCtrl",function($scope,$rootScope,$timeout,$location,Util,cfpLoadingBar){
    $scope.Util=Util;
    $scope.error_type="danger";

    $scope.startBar = function() {
        if ($scope.checkLoading() > 0)
            cfpLoadingBar.start();
    };

    $scope.completeBar = function () {
      cfpLoadingBar.complete();
    };
   
    $scope.isLoading = function(){
            if (($rootScope.pending_requests - $rootScope.pending_status_requests)<=0)
                $scope.completeBar();
            return ($rootScope.pending_requests - $rootScope.pending_status_requests)>0;
    };
    // used to show something with ng-show
    $scope.checkLoading = function(){ return ($rootScope.pending_requests - $rootScope.pending_status_requests)>0; };

    $scope.isActive = function(route) {
        return route === $location.path();
    };

    $scope.checkPolling=function(){
        var path = $location.path();
        if (path.indexOf("/dashboard") >= 0){
            $rootScope.dash_is_active = true;
            $rootScope.dash_groups_is_active = false;
        }
        else if (path.indexOf("groups_dash") >= 0){
            $rootScope.dash_groups_is_active = true;
            $rootScope.dash_is_active = false;
        }
        else {
            $rootScope.dash_groups_is_active = false;
            $rootScope.dash_is_active = false;
        }
    }

    $scope.startBar();

});
