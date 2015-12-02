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
                    axisLabelDistance: -20,
                    tickFormat: function(d){
                        return d3.format(',.1f')(d);
                    }
                }
            }
        };


$scope.multibarData = [

{key: "Total Words", values: [
    {key: "Total Words",
    series: 0,
    size: 964,
    x: "Sara",
    y: 964,
    y0: 0,
    y1: 964},
    {key: "Total Words",
    series: 0,
    size: 792,
    x: "Declan",
    y: 792,
    y0: 0,
    y1: 792},
    {key: "Total Words",
    series: 0,
    size: 612,
    x: "Tess",
    y: 612,
    y0: 0,
    y1: 612},
    {key: "Total Words",
    series: 0,
    size: 519,
    x: "Max",
    y: 519,
    y0: 0,
    y1: 519},
    {key: "Total Words",
    series: 0,
    size: 858,
    x: "Maddy",
    y: 858,
    y0: 0,
    y1: 858}

]},

{key: "Positive Keywords", values: [
    {key: "Positive Keywords",
series: 1,
size: 185,
x: "Sara",
y: 185,
y0: 964,
y1: 1149},
    {key: "Positive Keywords",
series: 1,
size: 119,
x: "Declan",
y: 119,
y0: 792,
y1: 911},
    {key: "Positive Keywords",
series: 1,
size: 143,
x: "Tess",
y: 143,
y0: 612,
y1: 755},
    {key: "Positive Keywords",
series: 1,
size: 76,
x: "Max",
y: 76,
y0: 519,
y1: 595},
    {key: "Positive Keywords",
series: 1,
size: 127,
x: "Maddy",
y: 127,
y0: 858,
y1: 985}
]},

{key: "Negative Keywords", values: [
    {key: "Negative Keywords",
series: 2,
size: 203,
x: "Sara",
y: 203,
y0: 1149,
y1: 1352},
    {key: "Negative Keywords",
series: 2,
size: 87,
x: "Declan",
y: 87,
y0: 911,
y1: 998},
    {key: "Negative Keywords",
series: 2,
size: 108,
x: "Tess",
y: 108,
y0: 755,
y1: 863},
    {key: "Negative Keywords",
series: 2,
size: 110,
x: "Max",
y: 110,
y0: 595,
y1: 705},
    {key: "Negative Keywords",
series: 2,
size: 82,
x: "Maddy",
y: 82,
y0: 985,
y1: 1067}
]}
];


        // $scope.multibarData = generateData();

        /* Random Data Generator (took from nvd3.org) */
        function generateData() {
            return stream_layers(3,5+Math.random()*5,.1).map(function(data, i) {
                console.log("Returned", {
                    key: 'Stream' + i,
                    values: data
                });
                return {
                    key: 'Stream' + i,
                    values: data
                };
            });
        }

        /* Inspired by Lee Byron's test data generator. */
        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        /* Another layer generator using gamma distributions. */
        function stream_waves(n, m) {
            return d3.range(n).map(function(i) {
                return d3.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }

        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }





    }]
  };
});
