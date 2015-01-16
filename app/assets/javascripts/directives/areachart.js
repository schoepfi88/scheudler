angular.module('scheudler').directive('areachart', function() {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs) {

            var data = $scope[attrs.data],
                xkey = $scope[attrs.xkey],
                ykeys= $scope[attrs.ykeys],
                labels= $scope[attrs.labels];

            var setData = function(){
                console.log('inside setData function');
                Morris.Area({
                    element: element,
                    data: data,
                    xkey: xkey,
                    ykeys: ykeys,
                    labels: labels,
					resize: true,
					lineColors: ['#47A447', '#D2322D', '#999999']
                });
            };

            // The idea here is that when data variable changes, 
            // the setData() is called. But it is not happening.
            attrs.$observe('data',setData);
        }

    };

});
