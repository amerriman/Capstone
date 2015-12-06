app.directive('allWriting', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing/all-writing.html',
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
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success.writings;
              console.log($scope.writings, "scope.writings");
            });
        }
      };


      getWriting();


      $scope.deleteWriting = function(id){
        // alert('are you sure?');
        var userID = $rootScope.currentUser._id;
        var writingId = id;
        console.log(writingId, "writingid");
        console.log(id, "ID");
        httpFactory.delete('/writing/sample/' + writingId)
        .then(function(response){
          console.log(response, "RESPONSE");
        httpFactory.putRemove('/teaUser/teacher/' +userID + "/" +writingId)
        .then(function(response2){
          // console.log("HERE")
          // console.log(response2, "response2");
        });
          getWriting();
        });
      };


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
