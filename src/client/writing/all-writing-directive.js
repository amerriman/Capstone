app.directive('allWriting', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing/all-writing.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      $scope.sortType = "title";
      $scope.sortReverse  = false;

      getWriting = function(){
        if($rootScope.currentUser.teacher === true){
          httpFactory.get('/teaUser/teacher/'+ $rootScope.currentUser._id +'/writings')
            .then(function(response){
              // console.log(response.data.success, "response data success");
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings);
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success.writings;
              // console.log($scope.writings, "scope.writings");
            });
        }
      };


      getWriting();


      $scope.deleteWriting = function(id){
        var userID = $rootScope.currentUser._id;
        var writingId = id;
        httpFactory.delete('/writing/sample/' + writingId)
        .then(function(response){
          if($rootScope.currentUser.teacher === true){
            httpFactory.putRemove('/teaUser/teacher/' +userID + "/" +writingId)
            .then(function(response2){
              getWriting();
          })
          } else if ($rootScope.currentUser.teacher === false){
              httpFactory.putRemove('/stUser/student/'+userID + "/" +writingId)
              .then(function(response3){
                getWriting();
              })
            }
        });
      };


        // httpFactory.putRemove('/teaUser/teacher/' +userID + "/" +writingId)
        // .then(function(response2){
        // });
        //   getWriting();



      $scope.editTitle = function(newTitle, id){
        // console.log(newTitle, id)
        var writingId = id;
        var payload = {
          'title': newTitle
        };
        // console.log(payload)
        httpFactory.put('/writing/sample/'+ writingId, payload)
        .then(function(response){
          getWriting();
          // console.log(response, "RESPNSE");
        });
      };




    }]
  };
});
