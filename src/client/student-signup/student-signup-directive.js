app.directive('studentSignup', function () {
  return {
    restrict: 'E',
    templateUrl: '/student-signup/studentSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", function ($scope, $http, $auth, $location) {

      $scope.studentSignup = {};

      $scope.studentSignup = function() {
        var student = {
          username: $scope.studentSignup.username,
          password: $scope.studentSignup.password,
          code: $scope.studentSignup.code,
          section: $scope.studentSignup.section,
        };

      $http.post('/auth/register', student)
        .then(function(response){
          console.log(response, 'RESPONSE');
          $scope.studentSignup = {};
          $location.path('/login');
        })
        .catch(function(response){
            console.log(response, 'response');
        });

        // $auth.signup(student)
        //   .then(function(response){
        //     $location.path('/student-login');
        //   })
        //   .catch(function(response) {
        //     console.log(response.data, "RESPONSE.DATA in student signup");
        //   });
      };
    }],
  };
});

