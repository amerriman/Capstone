var app = angular.module('myApp', ['ngRoute', 'satellizer', 'nvd3']);

app.config(['$routeProvider', '$authProvider', '$locationProvider', function($routeProvider, $authProvider, $locationProvider) {

  // *** satellizer settings ***
  $authProvider.google({
    url: '/auth/google',
    clientId: '481835593158-qnuddr7o808dfveslk68n6ang1pd1jeg.apps.googleusercontent.com',
    redirectUri: window.location.origin
  });


  $routeProvider
    .when('/', {
      templateUrl: 'partials/dashboard.html',
      access: {restricted: false}
    })
    .when('/teacher-signup', {
      templateUrl: 'partials/teacherSignup.html',
      // controller: 'signupCtrl',
      access: {restricted: false}
    })
    .when('/student-signup', {
      templateUrl: 'partials/studentSignup.html',
      // controller: 'signupCtrl',
      access: {restricted: false}
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      // controller: 'loginCtrl',
      access: {restricted: false}
    })
    .when('/writing-analysis', {
      templateUrl: 'partials/writingAnalysis.html',
      access: {restricted: true}
    })
    .when('/writing-analysis-sample', {
      templateUrl: 'partials/writingAnalysisSample.html',
      access: {restricted: false}
    })
    .when('/all-students', {
      templateUrl: 'partials/allStudents.html',
      access: {restricted: true}
    })
    .when('/student/:id', {
      templateUrl: 'partials/singleStudent.html',
      access: {restricted: true}
    })
    .when('/all-writing', {
      templateUrl: 'partials/allWriting.html',
      access: {restricted: true}
    })
    .when('/writing/:id', {
      templateUrl: 'partials/singleWriting.html',
      access: {restricted: true}
    })
    .when('/sample-dash', {
      templateUrl: 'partials/sampleDashboard.html',
      access: {restricted: false}
    })
    .otherwise('/');

}]);

app.run(function ($rootScope, $location, $route, $auth) {
  $rootScope.$on('$routeChangeStart', function (event, next, current) {
    if (next.access.restricted && !$auth.isAuthenticated()) {
      $location.path('/login');
      $route.reload();
    }
  });
});
