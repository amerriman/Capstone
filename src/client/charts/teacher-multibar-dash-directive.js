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
                    //     return d3.format(',f')(d);
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


$scope.multibarData = [

{key: "Total Words", color: 'blue', values: [
    {key: "Total Words",
    series: 0,
    size: 964,
    x: "Sara",
    y: 964,
    y0: 0,
    y1: 964,
    color: 'blue'},
    {key: "Total Words",
    series: 0,
    size: 792,
    x: "Declan",
    y: 792,
    y0: 0,
    y1: 792,
    color: 'blue'},
    {key: "Total Words",
    series: 0,
    size: 612,
    x: "Tess",
    y: 612,
    y0: 0,
    y1: 612,
    color: 'blue'},
    {key: "Total Words",
    series: 0,
    size: 519,
    x: "Max",
    y: 519,
    y0: 0,
    y1: 519,
    color: 'blue'},
    {key: "Total Words",
    series: 0,
    size: 858,
    x: "Maddy",
    y: 858,
    y0: 0,
    y1: 858,
    color: 'blue'}

]},

{key: "Positive Keywords", color: 'green', values: [
    {key: "Positive Keywords",
series: 1,
size: 185,
x: "Sara",
y: 185,
y0: 964,
y1: 1149,
color: 'green'},
    {key: "Positive Keywords",
series: 1,
size: 119,
x: "Declan",
y: 119,
y0: 792,
y1: 911,
color: 'green'},
    {key: "Positive Keywords",
series: 1,
size: 143,
x: "Tess",
y: 143,
y0: 612,
y1: 755,
color: 'green'},
    {key: "Positive Keywords",
series: 1,
size: 76,
x: "Max",
y: 76,
y0: 519,
y1: 595,
color: 'green'},
    {key: "Positive Keywords",
series: 1,
size: 127,
x: "Maddy",
y: 127,
y0: 858,
y1: 985,
color: 'green'}
]},

{key: "Negative Keywords", color: 'red', values: [
    {key: "Negative Keywords",
series: 2,
size: 203,
x: "Sara",
y: 203,
y0: 1149,
y1: 1352,
color: 'red'},
    {key: "Negative Keywords",
series: 2,
size: 87,
x: "Declan",
y: 87,
y0: 911,
y1: 998,
color: 'red'},
    {key: "Negative Keywords",
series: 2,
size: 108,
x: "Tess",
y: 108,
y0: 755,
y1: 863,
color: 'red'},
    {key: "Negative Keywords",
series: 2,
size: 110,
x: "Max",
y: 110,
y0: 595,
y1: 705,
color: 'red'},
    {key: "Negative Keywords",
series: 2,
size: 82,
x: "Maddy",
y: 82,
y0: 985,
y1: 1067,
color: 'red'}
]}
];


        // $scope.multibarData = generateData();
        var sample;
        // $scope.writingsArray = [];
        getStudentData = function(){
            httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/all')
            .then(function(response){
                var studentData = response.data.success.students;
                console.log(studentData, "Student Data")
                getWordTotals(studentData);
            });
        };


        getWordTotals = function(wrArray, stArray){
            console.log("yoikes");

        };


        getStudentData();


//for each student, loop through the writing array, grab the writing id and find the writing, and add up the numbers through each round.





    }]
  };
});
