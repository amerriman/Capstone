app.directive('teacherSignup', function () {
  return {
    restrict: 'E',
    templateUrl: '/teacher-signup/teacherSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", function ($scope, $http, $auth, $location) {

      $scope.teacherSignup = {};
      $scope.error = false;
      $scope.message= "";

      function messageTimeout(){
        $scope.success = false;
      }

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
            $location.path('/login');
          })
          .catch(function(response) {
            // console.log(response, "RESPONSE.DATA in teacher register");
              $scope.error = true;
              $scope.message= "Whoops! The Email, name or code you entered is already taken!";
              $timeout(messageTimeout, 3000);
          });
      };
    }],
  };
});

