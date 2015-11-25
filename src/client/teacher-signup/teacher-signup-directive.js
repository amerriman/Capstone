app.directive('teacherSignup', function () {
  return {
    restrict: 'E',
    templateUrl: '/teacher-signup/teacherSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", function ($scope, $http, $auth, $location) {

      $scope.teacherSignup = {};

      $scope.signup = function() {
        var user = {
          name: $scope.teacherSignup.name,
          email: $scope.teacherSignup.email,
          password: $scope.teacherSignup.password,
          code: $scope.teacherSignup.code
        };

        $auth.signup(user)
          .then(function(response){
            $scope.teacherSignupForm = {};
            $location.path('/teacher-login');
          })
          .catch(function(response) {
            console.log(response.data, "RESPONSE.DATA in teacher register");
          });
      };
    }],
  };
});

//location path needs to be for teacher login
