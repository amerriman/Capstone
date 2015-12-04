app.directive('studentPieDash', function () {
  return {
    restrict: 'E',
    templateUrl: '/charts/student-pie-dash.html',
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
                height: 500,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: true,
                color: ['green','red', 'blue'],
                legend: {
                    key: 'sample',
                    margin: {
                        top: 5,
                        right: 35,
                        bottom: 5,
                        left: 0
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

        var pieKeys = ["Positive Keywords", "Negative Keywords", "Total Words"];



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
        countWords = function(array){
            var positive = 0;
            var negative = 0;
            var total = 0;
            var words = [];
            for (var i = 0; i < array.length; i++) {
                positive += array[i].positiveWordCount;
                negative += array[i].negativeWordCount;
                total += array[i].textWordCount;
            }
            words.push(positive, negative, total);
            // console.log(totals);
            var finalData = makePieData(pieKeys, words);

        };

        //get all writings for pie chart data
        getData = function(){
            httpFactory.get('/stUser/student/'+ $rootScope.currentUser._id +'/writings')
            .then(function(response){
                var writingData = response.data.success;
                console.log(writingData, "writingData");
                countWords(writingData);
            });
        };

        getData ();


    }]
  };
});
