app.directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: '/dashboard/dashboard.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    getWriting = function(){
        if($rootScope.currentUser.teacher === true){
          httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/writings')
            .then(function(response){
              // console.log(response.data.success, "response data success");
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings);
              wordCount($scope.writings);
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings, "boo");
              wordCount($scope.writings);

            });
        }
      };

      wordCount = function(array){
        $scope.total = 0;
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            $scope.total += array[i].textWordCount;
        }
        return $scope.total;
      };

      getStudentWritingTotals = function(array){
        var writingCount = 0;
        for (var i = 0; i < array.length; i++) {
          writingCount += array[i].writings.length;
          }
          $scope.stWritings = writingCount;
      };

      studentWordTotals = function(array){
        var words = 0;
          for (var i = 0; i < array.length; i++) {
            for (var j = 0; j < array[i].writings.length; j++) {
              words += array[i].writings[j].textWordCount;
            };
          };
         $scope.studentWords = words;
      }

      //get all students for data counts
      getData = function(){
          httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/all')
          .then(function(response){
              var studentData = response.data.success.students;
              // console.log(studentData, "studentData");
              getStudentWritingTotals(studentData);
              studentWordTotals(studentData);
          });
      };

        getData ();

      getWriting();




    }]
  };
});
