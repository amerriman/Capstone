app.directive('topNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/navigation/top-nav-bar.html',
    controller: ["$scope", "$window", "$auth", "$location", "$route", function ($scope, $window, $auth, $location, $route) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      reloadRoute = function() {
        $route.reload();
      };

      $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
        $location.path('/home');
        $route.reload();
      };

      $scope.toggleNav = false;

      $scope.toggleNavButton = function(){
        $scope.toggleNav = !$scope.toggleNav;
      };


    }],
  };
});
