app.directive('sampleDashboard', function() {
  return {
    restrict: 'E',
    templateUrl: '/dashboard/sample-dashboard.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));






    }]
  };
});
