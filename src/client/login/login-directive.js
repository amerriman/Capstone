app.directive('login', function () {
  return {
    restrict: 'E',
    templateUrl: '/login/login.html',
    controller: ["$scope", "$auth", "$rootScope", "$window", "$location", function ($scope, $auth, $rootScope, $window, $location) {
      //$auth is for satellizer

        $scope.login = {};

        $scope.login = function() {
          var user = {
            username: $scope.login.username,
            password: $scope.login.password
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

        $scope.isAuthenticated = function() {
            // console.log("HERE")
          return $auth.isAuthenticated();
        };

        $scope.logout = function() {
          $auth.logout();
          delete $window.localStorage.currentUser;
          $location.path('/home');
        };





    }],
  };
});
