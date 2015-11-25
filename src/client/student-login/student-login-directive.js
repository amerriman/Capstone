app.directive('studentLogin', function () {
  return {
    restrict: 'E',
    templateUrl: '/student-login/studentLogin.html',
    controller: ["$scope", "$auth", "$rootScope", "$http", "$window", "$location", function ($scope, $auth, $rootScope, $http, $window, $location) {
      //$auth is for satellizer

        $scope.studentLogin = {};

        $scope.login = function() {
          var user = {
            username: $scope.studentLogin.username,
            password: $scope.studentLogin.password
          };
          console.log(user, "USER")
          $http.post('/auth/studentLogin', user)
            .then(function(response){
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              console.log(response, "THEN response");
              $location.path('/home');
            })
            .catch(function(response){
              console.log('catch ', response);
            });
        };

          $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };





    }],
  };
});

