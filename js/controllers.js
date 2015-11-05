'use strict';

/* Controllers */

var app = angular.module('quizControllers', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
          .when('/', {
            templateUrl: 'userdetails.html'
          })
          .when('/quiz', {
            templateUrl: 'quiz.html'
          })
          .when('/editquiz', {
            templateUrl: 'editquiz.html'
          })
          .otherwise({
            template: "<h2 class='app-title'>404 - page not found :(</h2>"
          });
        //$locationProvider.html5Mode(true);
    });


app.controller('quizCtrl',
    function loadQuizController($scope, $http){
      $http.get('quiz.json').success(function(data) {

          $scope.quiz=data.quiz;
      });
        console.log($scope.quiz);
    }
);

app.controller('addQuizCtrl', ['$scope', function($scope) {
  $scope.bgcolor = '000000';
  $scope.minanswers=1;
  $scope.quiznew = {'name': '', 'img' : '', 'text': '', 'answers': [], 'minanswers' : 1, 'bgcolor': '000000' };
  $scope.submit = function() {
    if ($scope.name) {
      $scope.quiznew.name = this.name;
      $scope.quiznew.text = this.text;
      $scope.quiznew.bgcolor = this.bgcolor;
      $scope.quiznew.img = this.img;
      $scope.quiznew.minanswers = this.minanswers;
      $scope.quiznew.answers.push(this.answer1);

      $scope.quiz.push($scope.quiznew);
        console.log('quiz', $scope.quiz);
        console.log('new', $scope.quiznew);
      $scope.name="";
      $scope.text='';
      $scope.bgcolor='000000';
      $scope.img='';
      $scope.minanswers=1;
      $scope.answers=[];
    }


      $scope.save = function (quiz){
          $http.post("postfile.php", quiz).success(function (answ) {
              answ=quiz;
          });
          console.log(quiz);
      };

  };


}]);


/*
var storeQuiz = function($scope, $http) {
  //$http.post('quizzz.json', JSON.stringify($scope.quiz));
      $http.post("postfile.php", quiz).success(function (answ) {
          answ = $scope.quiz;
          $scope.quiz=answ;

      });
    /*
    json: JSON.stringify({
      newquiz : $scope.quiz
    })
  });
  $http.post("quizzz.json", data).success(function(data, status) {
    data: newquiz;
};*/
