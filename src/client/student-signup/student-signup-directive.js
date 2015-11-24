app.directive('studentSignup', function () {
  return {
    restrict: 'E',
    templateUrl: 'student-signup/studentSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", function ($scope, $http, $auth, $location) {

      $scope.studentSignUpForm = {};

      $scope.signup = function() {
        var studentUser = {
          name: $scope.studentSignUpForm.name,
          password: $scope.studentSignUpForm.password,
          code: $scope.studentSignUpForm.code
        };

        $auth.signup(studentUser)
          .then(function(response){
            $location.path('/login');
          })
          .catch(function(response) {
            console.log(response.data, "RESPONSE.DATA in teacher register");
          });
      };
    }],
  };
});


//location path needs to be a student login route...
