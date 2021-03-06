app.directive('studentPieDash', function () {
  return {
    restrict: 'E',
    templateUrl: '/charts/student-pie-dash.html',
    controller: ["$scope", "$rootScope", "$http", "httpFactory", "$auth", '$routeParams', function ($scope, $rootScope, $http,  httpFactory, $auth, $routeParams){

    //make sure user is authenticated
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };

    //make sure we can access userid
    $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));


        $scope.pieOptions = {
            chart: {
                type: 'pieChart',
                height: 250,
                margin: {left:0,top:0,bottom:0,right:0},
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: false,
                duration: 500,
                labelThreshold: 0.01,
                labelSunbeamLayout: false,
                color: ['#F68275', '#34495E'],
                legend: {
                    key: 'sample',
                    margin: {
                        top: 5,
                        right: 25,
                        bottom: 5,
                        left: 0
                    }
                }
            }
        };

        var pieKeys = ["Positive Words", "Negative Words"];

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
            words.push(positive, negative);
            // console.log(totals);
            var finalData = makePieData(pieKeys, words);

        };

        //get all writings for pie chart data
        // getData = function(){
            // httpFactory.get('/stUser/student/'+ $rootScope.currentUser._id +'/writings')
            // .then(function(response){
            //     var writingData = response.data.success.writings;
            //     console.log(writingData, "writingData");
            //     countWords(writingData);
            // });
        // };

        getData = function(){
            if($routeParams.id){
            httpFactory.get('/stUser/student/'+ $routeParams.id +'/writings')
            .then(function(response){
              // console.log(response.data.success.writings, "RESPONSE IN SSD")
                var writingData = response.data.success.writings;
                // console.log(writingData, "writingData");
                countWords(writingData);
            });
                // console.log($routeParams.id, "routeparamsid")
            } else {
                httpFactory.get('/stUser/student/'+ $rootScope.currentUser._id +'/writings')
                .then(function(response){
                    var writingData = response.data.success.writings;
                    // console.log(writingData, "writingData");
                countWords(writingData);
            });
            }
        };

        getData ();


    }]
  };
});

//For reference - pie chart data needs to look like below (can also have color as a key):

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
