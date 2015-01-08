angular.module('scheudler').controller("statisticCtrl",
	function($scope,Util){

  $scope.xkey = 'range';

  $scope.ykeys = ['total_tasks',     'total_overdue'];

  $scope.labels = ['Total Tasks', 'Out of Budget Tasks'];

  $scope.myModel3 = [
    { range: '2000', total_tasks: 5, total_overdue: 5 },
    { range: '2001', total_tasks: 35, total_overdue: 8 },
    { range: '2002', total_tasks: 20, total_overdue: 1 },
    { range: '2005', total_tasks: 20, total_overdue: 6 }
  ];

  $scope.myModel2 = [
    { range: 'January', total_tasks: 5, total_overdue: 5 },
    { range: 'January', total_tasks: 35, total_overdue: 8 },
    { range: 'January', total_tasks: 20, total_overdue: 1 },
    { range: 'January', total_tasks: 20, total_overdue: 6 }
  ];

  $scope.myModel = [
    { label: 'January', value: 5 },
    { label: 'February', value: 35 },
    { label: 'March', value: 20 },
    { label: 'April', value: 20 }
  ];
});
