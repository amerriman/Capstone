app.directive('writingAnalysis', function() {
  return {
    restrict: 'E',
    templateUrl: '/writing-analysis/writing-analysis.html',
    controller: ['$rootScope', '$scope', '$http', '$auth', '$location', '$route', '$window', 'httpFactory', function ($rootScope, $scope, $http, $auth, $location, $route, $window, httpFactory){

      $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));

      $scope.writingInput = '';

      $scope.writingSample = {};


      //sorts the keywords into postive and negative chuncks
      sortSentiment = function(data){
        $scope.writingSample.textWordCount = $scope.writingInput.split(' ').length;
        $scope.writingSample.positiveWords = [];
        $scope.writingSample.negativeWords = [];

        for (var i = 0; i < data.length; i++) {
          if(data[i].sentiment.type === "positive"){
            $scope.writingSample.positiveWords.push(data[i].text);
          } else if (data[i].sentiment.type === "negative"){
            $scope.writingSample.negativeWords.push(data[i].text);
          }
        }

        // console.log($scope.positiveWords, 'positiveWords');
        $scope.writingSample.positiveWordCount = $scope.writingSample.positiveWords.length;
        $scope.writingSample.negativeWordCount = $scope.writingSample.negativeWords.length;

        var positive = $scope.writingSample.positiveWords.join(' ').split(' ');
        var negative = $scope.writingSample.negativeWords.join(' ').split(' ');
        //in main.js - reconstructs the writing sample

        postParagraph(positive, negative);
        saveWriting();
        return positive, negative;
      };

      //appends the analyzed paragraph to the DOM
      appendText = function(text) {
        var myEl = angular.element( document.querySelector( '#result-paragraph' ) );
        myEl.append(text);
      };

      //removes the analyzed paragraph from the DOM
      unappendText = function() {
        var myEl = angular.element( document.querySelector( '#result-paragraph' ) );
        myEl.empty();
      };

      $scope.getText = function(){
        httpFactory.get('/analyze/'+ $scope.writingInput)
        .then(function(response){
          // console.log(response, "response.data");
          sortSentiment(response.data);
          $scope.writingSample.text = coloredParagraph;
          // console.log(coloredParagraph, "Colored paragraph in directive");

          appendText(coloredParagraph);

        });
      };

      //add new writing to appropriate user
      saveWriting = function(){
        var payload = $scope.writingSample;
        // console.log(payload, 'payload');
        $scope.title = $scope.writingSample.title;
        $scope.wordCount = $scope.writingSample.textWordCount;
        $scope.positiveWordCount = $scope.writingSample.positiveWordCount;
        $scope.negativeWordCount = $scope.writingSample.negativeWordCount;

        if($rootScope.currentUser.teacher === true){
          httpFactory.post('/teaUser/teacher/'+ $rootScope.currentUser._id + '/writings', payload)
            .then(function(response){
              // console.log(response.data.SUCCESS, "RESPONSE ID");

              $scope.writingSample = {};
              $scope.writingInput = '';
        });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.post('/stUser/student/' + $rootScope.currentUser._id + '/writings', payload)
          .then(function(response){
            // console.log(response);
            $scope.writingSample = {};
            $scope.writingInput = '';
            $scope.writingid = response.data.SUCCESS._id;

          });
        }
      };


      $scope.reloadRoute = function() {
          // $route.reload();
          $window.location.reload();
      };

    }]
  };
});
