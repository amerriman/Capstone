app.directive('teacherPieDash', function () {
  return {
    restrict: 'E',
    templateUrl: '/charts/teacher-pie-dash.html',
    controller: ["$scope", "$rootScope", "$http", "httpFactory", "$auth", function ($scope, $rootScope, $http,  httpFactory, $auth){

    //make sure user is authenticated
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //make sure we can access userid
    $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));


        $scope.pieOptions = {
            chart: {
                type: 'pieChart',
                height: 270,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: false,
                color: ['#F68275','#00C5DE', '#F0AD4E', '#AC92EC', '#34495E'],
                legend: {
                    key: 'sample',
                    margin: {
                        top: 5,
                        right: 5,
                        bottom: 5,
                        left: 5
                    }
                }
            }
        };



        // $scope.pieData = [
        //     {
        //         key: "0-1",
        //         y: 7,
        //     },
        //     {
        //         key: "2-3",
        //         y: 2,
        //     },
        //     {
        //         key: "4-6",
        //         y: 0,
        //     },
        //     {
        //         key: "7-10",
        //         y: 1,
        //     },
        //     {
        //         key: "11+",
        //         y: 0,
        //     },

        // ];

        var pieKeys = ["0-1", "2-3", "4-6", "7-10", "11+"];

        makePieData = function(keys, values) {
            var pieData = [];
            for(var i=0; i < keys.length; i++)  {
            pieData[i] = {};
            pieData[i].key = keys[i];
            pieData[i].y = values[i];
        }
          // console.log(pieData, "data");
            $scope.pieData = pieData;
        };

        //loop through the student array and count the number of writings in their writing array.
        countWriting = function(array){
            var a = 0;
            var b = 0;
            var c = 0;
            var d = 0;
            var e = 0;
            var totals = [];
            for (var i = 0; i < array.length; i++) {
                if(array[i].writings.length <= 1){
                    a++;
                } else if (array[i].writings.length <= 3){
                    b++;
                } else if (array[i].writings.length <= 6) {
                    c++;
                } else if (array[i].writings.length <= 10){
                    d++;
                } else {
                    e++;
                }
            }
            totals.push(a, b, c, d, e);
            // console.log(totals);
            var finalData = makePieData(pieKeys, totals);

        };

        //get all students for pie chart data
        getData = function(){
            httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/students')
            .then(function(response){
                var studentData = response.data.success.students;
                // console.log(studentData, "studentData");
                countWriting(studentData);
            });
        };

        getData ();


    }]
  };
});
