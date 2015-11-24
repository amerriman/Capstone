app.directive('login', function () {
  return {
    restrict: 'E',
    templateUrl: 'teacher-login/teacherLogin.html',
    controller: ["$scope", "$auth", "$rootScope", "$window", "$location", function ($scope, $auth, $rootScope, $window, $location) {
      //$auth is for satellizer

        $scope.teacherLogin = {};

        $scope.login = function() {
          var user = {
            email: $scope.teacherLogin.email,
            password: $scope.teacherLogin.password
          };

          $auth.login(user)
            .then(function(response) {
              console.log(response);
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              $location.path('/home');
            })
            .catch(function(response) {
              console.log(response);
            });
        };

        $scope.authenticate = function(provider) {

          $auth.authenticate(provider)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              console.log(response);
              $location.path('/home');
            })
          .catch(function(response) {
            console.log(response);
          });

        };
    }],
  };
});
