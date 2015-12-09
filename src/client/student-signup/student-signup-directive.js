app.directive('studentSignup', function () {
  return {
    restrict: 'E',
    templateUrl: '/student-signup/studentSignup.html',
    controller: ["$scope", "$http", "$auth", "$location", "$timeout", function ($scope, $http, $auth, $location, $timeout) {

      $scope.studentSignup = {};
      $scope.error = false;
      $scope.message= "";

        function messageTimeout(){
          $scope.success = false;
        }

      $scope.studentSignup = function() {
        var student = {
          username: $scope.studentSignup.username,
          password: $scope.studentSignup.password,
          code: $scope.studentSignup.code,
          section: $scope.studentSignup.section,
        };

      $http.post('/auth/register', student)
        .then(function(response){
          // console.log(response, 'RESPONSE');
          $scope.studentSignup = {};
          if(!response.data.token){
            $scope.error = true;
            $scope.message= "Whoops! Invalid code!";
            $timeout(messageTimeout, 3000);
          } else{
            $location.path('/login');
          }
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

