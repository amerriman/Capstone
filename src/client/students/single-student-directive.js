app.directive('singleStudents', function() {
  return {
    restrict: 'E',
    templateUrl: '/students/single-students.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));



      //May use to get the date of last writing upload...
      // dateFromObjectId = function (objectId) {
      //   return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
      // };


    }]
  };
});
