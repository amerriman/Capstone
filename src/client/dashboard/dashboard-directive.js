app.directive('dashboard', function() {
  return {
    restrict: 'E',
    templateUrl: '/dashboard/dashboard.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    getWriting = function(){
        if($rootScope.currentUser.teacher === true){
          httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/writings')
            .then(function(response){
              // console.log(response.data.success, "response data success");
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings);
              wordCount($scope.writings);
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings);
              wordCount($scope.writings);

            });
        }
      };

      wordCount = function(array){
        $scope.total = 0;
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            $scope.total += array[i].textWordCount;
        }
        return $scope.total;
      };

      getWriting();




    }]
  };
});
