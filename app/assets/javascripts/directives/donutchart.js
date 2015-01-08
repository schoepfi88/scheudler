angular.module('scheudler').directive('donutchart', function() {

    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,
        link: function($scope, element, attrs) {

            var data = $scope[attrs.data];

            var setData = function(){
                console.log('inside setData function');
                Morris.Donut({
                    element: element,
                    data: data,
					resize: true
                });
            };

            // The idea here is that when data variable changes, 
            // the setData() is called. But it is not happening.
            attrs.$observe('data',setData);
        }

    };

});
