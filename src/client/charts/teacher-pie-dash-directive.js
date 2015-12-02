app.directive('teacherPieDash', function () {
  return {
    restrict: 'E',
    templateUrl: '/charts/teacher-pie-dash.html',
    controller: ["$scope", "$rootScope", "$http", "httpFactory", "$auth", function ($scope, $rootScope, $http,  httpFactory, $auth){

        $scope.pieOptions = {
            chart: {
                type: 'pieChart',
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                legend: {
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        $scope.pieData = [
            {
                key: "1-2",
                y: 2
            },
            {
                key: "3-5",
                y: 5
            },
            {
                key: "6-9",
                y: 8
            },
            {
                key: "10-15",
                y: 2
            },
            {
                key: "16+",
                y: 1
            },

        ];



    }]
  };
});
