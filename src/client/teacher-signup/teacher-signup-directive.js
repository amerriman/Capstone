app.directive('signup', function () {
  return {
    restrict: 'E',
    templateUrl: 'teacher-signup/teacherSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", function ($scope, $http, $auth, $location) {

      $scope.teacherSignUpForm = {};

      $scope.signup = function() {
        var teacherUser = {
          name: $scope.teacherSignUpForm.name,
          email: $scope.teacherSignUpForm.email,
          password: $scope.teacherSignUpForm.password,
          code: $scope.teacherSignUpForm.code
        };

        $auth.signup(teacherUser)
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
