angular.module('scheudler').controller("statisticCtrl",
	function($scope,Util,$templateCache){

  $scope.onInit = function(){
	$templateCache.remove('/templates/statistic');
  };

  $scope.xkey = 'group';

  $scope.ykeys = ['accepted', 'rejected', 'unanswered'];

  $scope.labels = ['Accepted', 'Rejected', 'Unanswered'];

  $scope.colors = ['#47A447', '#D2322D', '#999999'];

  $scope.myModel3 = [
    { group: '2000', accepted: 5, rejected: 5, unanswered: 1 },
    { group: '2001', accepted: 35, rejected: 8, unanswered: 1 },
    { group: '2002', accepted: 20, rejected: 1, unanswered: 1 },
    { group: '2005', accepted: 20, rejected: 6, unanswered: 1 }
  ];

  $scope.initLine = function(data){
	$scope.lineModel = [];
	for(var i = 0; i < data.length; i++){
		$scope.lineModel.push({group: data[i][0], accepted: data[i][1], rejected: data[i][2], unanswered: data[i][3]});
	}
  };

  $scope.initBar = function(data){
	$scope.barModel = [];
	for(var i = 0; i < data.length; i++){
		$scope.barModel.push({group: data[i][0], accepted: data[i][1], rejected: data[i][2], unanswered: data[i][3]});
	}
  };

  $scope.initDonut = function(data){
	$scope.donutModel = [
        { label: 'Accepted', value: data[0] },
        { label: 'Rejected', value: data[1] },
        { label: 'Unanswered', value: data[2] }];
  };
});
