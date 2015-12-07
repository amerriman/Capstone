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


      getWriting = function(){
        httpFactory.get('/stUser/student/' + id + '/writings')
          .then(function(response){
            // console.log(response.data.success.writings);
            $scope.writings = response.data.success.writings;
            var writings = response.data.success.writings;
            $scope.studentName = response.data.success.username;
            $scope.studentImage = response.data.success.userImage;
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














    }]
  };
});
