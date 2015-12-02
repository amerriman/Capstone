app.directive('allWriting', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing/all-writing.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      // getWriting = function(){
      //   httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/writings')
      //   .then(function(response){
      //     console.log(response.data.success);
      //     $scope.writings = response.data.success;
      //     console.log($scope.writings);
      //   });
      // };

      getWriting = function(){
        if($rootScope.currentUser.teacher === true){
          httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/writings')
            .then(function(response){
              console.log(response.data.success);
              $scope.writings = response.data.success;
              console.log($scope.writings);
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success;
              console.log($scope.writings);
            });
        };
      };

      getWriting();

      $scope.deleteWriting = function(id){
        // alert('are you sure?');
        var writingId = id;
        console.log(id, "ID");
        httpFactory.delete('/writing/sample/' + writingId)
        .then(function(response){
          console.log(response, "RESPNSE");
          getWriting()
        });
      };





    }]
  };
});
