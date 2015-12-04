app.directive('allStudents', function() {
  return {
    restrict: 'E',
    templateUrl: '/students/all-students.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      getStudents = function(){
        httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/students')
        .then(function(response){
          // console.log(response.data.success[0].writings.length);
          $scope.students = response.data.success;
          // console.log($scope.students)
        });
      };

      getStudents();



    }]
  };
});