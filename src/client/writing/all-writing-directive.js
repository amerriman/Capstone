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
              $scope.writings = response.data.success;
              // console.log($scope.writings);
            });
        } else if($rootScope.currentUser.teacher === false){
          httpFactory.get('/stUser/student/' + $rootScope.currentUser._id + '/writings')
            .then(function(response){
              $scope.writings = response.data.success;
              console.log($scope.writings);
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
          console.log("HERE")
          console.log(response2, "response2");

        });
          getWriting();
        });

      };



      // *** remove single writing from teacher ***// sort of working
// router.put('/teacher/:id/:wid', function(req, res) {
//   var teacher = req.params.id;
//   var writing = req.params.wid;

//   var remove = {$pull: {"writings": writing}};
//   var options = {new: true, upsert: true};
//   Teacher.findByIdAndUpdate(teacher, remove, options, function(err, data){
//     if (err){
//       console.log(err);
//         } else {
//       console.log(data);
//       res.send(data);
//         }
// });
// });





    }]
  };
});
