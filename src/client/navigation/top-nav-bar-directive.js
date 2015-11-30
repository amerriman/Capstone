app.directive('topNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/navigation/top-nav-bar.html',
    controller: ["$scope", "$window", "$auth", "$location", function ($scope, $window, $auth, $location) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $location.path('/home');
      };

      $scope.toggleNav = false;

      $scope.toggleNavButton = function(){
        $scope.toggleNav = !$scope.toggleNav;
      };

    }],
  };
});
