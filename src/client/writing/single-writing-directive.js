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
      $scope.loading = true;


      $scope.reloadRoute = function() {
          // $route.reload();
        $window.location.reload();
      };

      appendText = function(text) {
        var myEl = angular.element( document.querySelector( '#writing-sample' ) );
        myEl.append(text);
      };

      getWriting = function(id){
        httpFactory.get('/writing/sample/'+ id)
        .then(function(response){
          // console.log(response)
          $scope.writing = response.data;
          $scope.comments = (response.data.comments);
          // console.log($scope.comments, "comments");
          appendText($scope.writing.text);
          $scope.loading = false;

        });
      };

      getWriting(id);

      $scope.addComment = function(things){
        $scope.comment = $scope.commentForm;
        var payload = {
          'comments': $scope.commentForm
        };
        // console.log("yolo", $scope.comment, payload, id);
        httpFactory.put('/writing/sample/'+ id +'/comment', payload)
        .then(function(response){
          // console.log(response.data, "RESPONSE>DATA");
          reloadRoute();
        })


      };


    }]
  };
});
