app.directive('sideNavBar', function () {
  return {
    restrict: 'E',
    templateUrl: '/navigation/side-nav-bar.html',
    controller: ["$rootScope", "$scope", "$window", "$auth", "$location", function ($rootScope, $scope, $window, $auth, $location) {

      // $scope.isAuthenticated = function() {
      //   console.log($rootScope.currentUser.teacher, 'rscu teacher')
      //   return $auth.isAuthenticated();
      // };
      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

    }],
  };
});
