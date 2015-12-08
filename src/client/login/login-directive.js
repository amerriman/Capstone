app.directive('login', function () {
  return {
    restrict: 'E',
    templateUrl: '/login/login.html',
    controller: ["$scope", "$auth", "$rootScope", "$window", "$location", function ($scope, $auth, $rootScope, $window, $location) {
      //$auth is for satellizer

        $scope.login = {};
        $scope.error = false;
        $scope.message= "";

        function messageTimeout(){
          $scope.success = false;
        }

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
              $location.path('/dashboard');
            })
            .catch(function(response) {
              console.log(response);
              $scope.error = true;
              $scope.message= "Incorrect username or password!";
              $timeout(messageTimeout, 3000);

            });
        };

        $scope.authenticate = function(provider) {

          $auth.authenticate(provider)
            .then(function(response) {
              $window.localStorage.currentUser = JSON.stringify(response.data.user);
              $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
              console.log($rootScope.currentUser, "Root scope current user");
              console.log(response);
              $location.path('/dashboard');
            })
          .catch(function(response) {
            console.log(response);
            $scope.error = true;
            $scope.message= "You must be registered with a Gmail account to sign in with Google";
            $timeout(messageTimeout, 3000);
          });

        };

        $scope.isAuthenticated = function() {
            // console.log("HERE")
          console.log($rootScope.currentUser, "Root scope current user in isAuthenticated");

          return $auth.isAuthenticated();
        };

        $scope.logout = function() {
          $auth.logout();
          delete $window.localStorage.currentUser;
          $location.path('/');
        };

    }],
  };
});
