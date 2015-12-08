app.directive('singleStudent', function() {
  return {
    restrict: 'E',
    templateUrl: '/students/single-student.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', '$routeParams', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, $routeParams, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      var id = $routeParams.id;

      $scope.sortType = "title";
      $scope.sortReverse = false;
      $scope.loading = true;



      getWriting = function(){
        httpFactory.get('/stUser/student/' + id + '/writings')
          .then(function(response){
            // console.log(response.data.success.writings);
            $scope.writings = response.data.success.writings;
            var writings = response.data.success.writings;
            $scope.studentName = response.data.success.username;
            $scope.studentImage = response.data.success.userImage;
            $scope.loading = false;
            wordCount(writings);
          });
      };
            // console.log($scope.writings, "writings")

      wordCount = function(array){
        $scope.total = 0;
        var total = 0;
        for (var i = 0; i < array.length; i++) {
            $scope.total += array[i].textWordCount;
        }
        return $scope.total;
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
