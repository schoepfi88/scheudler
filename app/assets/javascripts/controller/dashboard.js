angular.module('scheudler').controller("dashboardCtrl",
    function($scope,Util,dashboardService){

    $scope.messages = dashboardService.user.get();

});
