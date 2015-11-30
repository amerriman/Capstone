app.directive('sideNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/navigation/side-nav-bar.html',
    controller: ["$scope", "$window", "$auth", "$location", function ($scope, $window, $auth, $location) {

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

    }],
  };
});
