app.directive('teacherMultibarDash', function () {
  return {
    restrict: 'E',
    templateUrl: '/charts/teacher-multibar-dash.html',
    controller: ["$scope", "$rootScope", "$http", "httpFactory", "$auth", function ($scope, $rootScope, $http,  httpFactory, $auth){

        $scope.multibarOptions = {
            chart: {
                type: 'multiBarChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 45,
                    left: 45
                },
                clipEdge: true,
                // staggerLabels: true,
                duration: 500,
                stacked: true,
                xAxis: {
                    axisLabel: 'Students',
                    showMaxMin: false,
                    // tickFormat: function(d){
                    //     return d3.format(',')(d);
                    // }
                },
                yAxis: {
                    axisLabel: 'Words',
                    axisLabelDistance: -13,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };


// $scope.multibarData = [

// {key: "Total Words", color: 'blue', values: [
//     {key: "Total Words",
//     series: 0,
//     size: 964,
//     x: "Sara",
//     y: 964,
//     y0: 0,
//     y1: 964,
//     color: 'blue'},
//     {key: "Total Words",
//     series: 0,
//     size: 792,
//     x: "Declan",
//     y: 792,
//     y0: 0,
//     y1: 792,
//     color: 'blue'},
//     {key: "Total Words",
//     series: 0,
//     size: 612,
//     x: "Tess",
//     y: 612,
//     y0: 0,
//     y1: 612,
//     color: 'blue'},
//     {key: "Total Words",
//     series: 0,
//     size: 519,
//     x: "Max",
//     y: 519,
//     y0: 0,
//     y1: 519,
//     color: 'blue'},
//     {key: "Total Words",
//     series: 0,
//     size: 858,
//     x: "Maddy",
//     y: 858,
//     y0: 0,
//     y1: 858,
//     color: 'blue'}

// ]},

// {key: "Positive Keywords", color: 'green', values: [
//     {key: "Positive Keywords",
// series: 1,
// size: 185,
// x: "Sara",
// y: 185,
// y0: 964,
// y1: 1149,
// color: 'green'},
//     {key: "Positive Keywords",
// series: 1,
// size: 119,
// x: "Declan",
// y: 119,
// y0: 792,
// y1: 911,
// color: 'green'},
//     {key: "Positive Keywords",
// series: 1,
// size: 143,
// x: "Tess",
// y: 143,
// y0: 612,
// y1: 755,
// color: 'green'},
//     {key: "Positive Keywords",
// series: 1,
// size: 76,
// x: "Max",
// y: 76,
// y0: 519,
// y1: 595,
// color: 'green'},
//     {key: "Positive Keywords",
// series: 1,
// size: 127,
// x: "Maddy",
// y: 127,
// y0: 858,
// y1: 985,
// color: 'green'}
// ]},

// {key: "Negative Keywords", color: 'red', values: [
//     {key: "Negative Keywords",
// series: 2,
// size: 203,
// x: "Sara",
// y: 203,
// y0: 1149,
// y1: 1352,
// color: 'red'},
//     {key: "Negative Keywords",
// series: 2,
// size: 87,
// x: "Declan",
// y: 87,
// y0: 911,
// y1: 998,
// color: 'red'},
//     {key: "Negative Keywords",
// series: 2,
// size: 108,
// x: "Tess",
// y: 108,
// y0: 755,
// y1: 863,
// color: 'red'},
//     {key: "Negative Keywords",
// series: 2,
// size: 110,
// x: "Max",
// y: 110,
// y0: 595,
// y1: 705,
// color: 'red'},
//     {key: "Negative Keywords",
// series: 2,
// size: 82,
// x: "Maddy",
// y: 82,
// y0: 985,
// y1: 1067,
// color: 'red'}
// ]}
// ];


        var keys = ["Total Words", "Positive Keywords", "Negative Keywords"];
        var colors = ['#68DFF0', '#37BC9B', '#DA4453'];

        getStudentData = function(){
            httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/all')
            .then(function(response){
                var studentData = response.data.success.students;
                // console.log(studentData, "Student Data")
                getWordTotals(studentData);
            });
        };


        getWordTotals = function(data){
        var bigData = [];
            for (var i = 0; i < data.length; i++) {
                var littleData = [];
                var name = data[i].username;
                var words = 0;
                var pwords = 0;
                var nwords = 0;

                bigData.push(littleData);

                for (var j = 0; j < data[i].writings.length; j++) {
                    words += data[i].writings[j].textWordCount;
                    pwords += data[i].writings[j].positiveWordCount;
                    nwords += data[i].writings[j].negativeWordCount;
                    if(j === data[i].writings.length-1){
                        littleData.push(name, words, pwords, nwords);
                    }
                };
            };
            makeStreamData(bigData)
            // console.log(bigData, "big data");


        };


        makeStreamData = function(data){
            var streams = [];
            var stream0Data = [];
            for (var i = 0; i < data.length; i++) {
                stream0Data[i] = {};
                stream0Data[i].key = "Total Words";
                stream0Data[i].series = 0;
                stream0Data[i].size = data[i][1];
                stream0Data[i].x = data[i][0];
                stream0Data[i].y = data[i][1];
                stream0Data[i].y0 = 0;
                stream0Data[i].y1 = data[i][1];
                stream0Data[i].color = "#68DFF0";
            }

            var stream1Data = [];
            for (var i = 0; i < data.length; i++) {
                stream1Data[i] = {};
                stream1Data[i].key = "Positive Keywords";
                stream1Data[i].series = 1;
                stream1Data[i].size = data[i][2];
                stream1Data[i].x = data[i][0];
                stream1Data[i].y = data[i][2];
                stream1Data[i].y0 = data[i][1];
                stream1Data[i].y1 = data[i][1]+data[i][2];
                stream1Data[i].color = "#37BC9B";
            }

            var stream2Data = [];
            for (var i = 0; i < data.length; i++) {
                stream2Data[i] = {};
                stream2Data[i].key = "Negative Keywords";
                stream2Data[i].series = 2;
                stream2Data[i].size = data[i][3];
                stream2Data[i].x = data[i][0];
                stream2Data[i].y = data[i][3];
                stream2Data[i].y0 = data[i][1]+data[i][2];
                stream2Data[i].y1 = data[i][2] + data[i][2] + data[i][3];
                stream2Data[i].color = "#DA4453";
            }
            streams.push(stream0Data, stream1Data, stream2Data);
            console.log(streams, 'streams');
            makeChartData(keys, colors, streams);
            return streams;
        };




        makeChartData = function(keys, colors, streams){
            var chartData = [];
            // console.log(streams, "streams in make chart data")
            //create main 3 objects
            for (var i = 0; i < 3; i++) {
                chartData[i] = {};
                chartData[i].key = keys[i];
                chartData[i].color = colors[i];
                chartData[i].values = streams[i];
                chartData[i].values = streams[i];
                chartData[i].values = streams[i];
            }

            // console.log(chartData, "chartData");
            $scope.multibarData = chartData;
            return chartData;
        };

        // $scope.multibarData = getStudentData();

        getStudentData();


//for each student, loop through the writing array, grab the writing id and find the writing, and add up the numbers through each round.





    }]
  };
});
