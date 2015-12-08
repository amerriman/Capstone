app.directive('allStudents', function() {
  return {
    restrict: 'E',
    templateUrl: '/students/all-students.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      $scope.sortType = "username";
      $scope.sortReverse  = false;
      $scope.loading = true;

      getStudents = function(){
        httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/students')
        .then(function(response){
          // console.log(response.data.success[0].writings.length);
          $scope.students = response.data.success.students;
          // console.log($scope.students)
          $scope.loading = false;
        });
      };

      getStudents();

      $scope.editStudent = function(newClass, id){
        // console.log(newTitle, id)
        var studentId = id;
        var payload = {
          'section': newClass
        };
        // console.log(payload)
        httpFactory.put('/stUser/student/'+ studentId, payload)
        .then(function(response){
          getStudents();
          // console.log(response, "RESPNSE");
        });
      };


      $scope.deleteStudent = function(id){
        var userID = $rootScope.currentUser._id;
        var studentID = id;
        httpFactory.delete('stUser/student/' + studentID)
        .then(function(response){
          httpFactory.putRemove('teaUser/teacher/'+userID +"/students/"+studentID)
          .then(function(response2){

          });
          getStudents();
        })
      }





    }]
  };
});
