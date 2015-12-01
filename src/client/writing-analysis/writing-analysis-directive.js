app.directive('writingAnalysis', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing-analysis/writing-analysis.html',
    controller: ['$rootScope', '$scope', '$http', '$location', 'httpFactory', function($rootScope, $scope, $http, $location, httpFactory){

      $scope.text = '';

      $scope.getText = function(){
        console.log('here!')
        console.log($scope.text, "scope.text")
        httpFactory.get('/analyze/'+ $scope.text)
        .then(function(response){
          console.log(response.data, "response");
        });
      };

    }]
  };
});
