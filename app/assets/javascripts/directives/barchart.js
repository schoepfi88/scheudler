angular.module('scheudler').directive('barchart', function() {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs) {

            var data = $scope[attrs.data],
                xkey = $scope[attrs.xkey],
                ykeys= $scope[attrs.ykeys],
                labels= $scope[attrs.labels],
				colors= $scope[attrs.colors];

            var setData = function(){
                console.log('inside setData function');
				Morris.Bar({
                    element: element,
                    data: data,
                    xkey: xkey,
                    ykeys: ykeys,
                    labels: labels,
					resize: true,
					barColors: colors
                });
            };

            // The idea here is that when data variable changes, 
            // the setData() is called. But it is not happening.
            attrs.$observe('data',setData);
        }

    };

});
