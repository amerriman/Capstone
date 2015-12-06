app.directive('singleWriting', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing/single-writing.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', '$routeParams', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, $routeParams, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      var id = $routeParams.id;


      getWriting = function(id){
        httpFactory.get('/writing/sample/'+ id)
        .then(function(response){
          console.log(response)
          $scope.writing = response.data;
          console.log($scope.writing);
        });
      };

      getWriting(id)


    }]
  };
});
