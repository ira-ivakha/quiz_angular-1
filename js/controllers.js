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
          .when('/feedback', {
              templateUrl: 'feedback.html'
          })
          .otherwise({
            template: "<h2 class='app-title'>404 - page not found :(</h2>"
          });
        //$locationProvider.html5Mode(true);
    });


app.controller('quizCtrl',
    function loadQuizController($scope, $http){
      $http.get('quizzz.json').success(function(data) {

          $scope.quiz=data;

      });

        $scope.back = function(){
            var indent,
                activeItem = 0,
                length = this.quiz.length-1,
                leftIndent = parseInt($('.quiz-slider').css('left'))*(-1),
                slideWidth = parseInt($('.quiz-slider li').width());
            console.log(slideWidth);
            if (leftIndent>0){
                indent = parseInt($('.quiz-slider').css('left')) + slideWidth;
                activeItem=leftIndent/slideWidth ;
                $( '.quiz-slider' ).css('left', indent);
            }
            else {
                $scope.activeItem=0;
            }
            console.log(activeItem);
            return activeItem;
        };
        $scope.next = function(){
            var indent,
                activeItem = 0,
                slideWidth = parseInt($('.quiz-slider li').width()),
                length = this.quiz.length-1,
                leftIndent = parseInt($('.quiz-slider').css('left'))*(-1);

            if (leftIndent < length*slideWidth){
                indent = parseInt($('.quiz-slider').css('left')) - slideWidth;
                $( '.quiz-slider' ).css('left', indent);

            }
            activeItem=leftIndent/slideWidth +1;
            console.log(activeItem);
            return activeItem;
        };
    });



app.controller('addQuizCtrl', ['$scope','$http', function($scope, $http) {
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
      var message = JSON.stringify($scope.quiz);

      $http.post('postfile.php', {message:message}).
          success(function(data, status, headers, config) {
              alert('We received your message');
          }).
              error(function(data, status, headers, config) {
                  alert('An Error Occured. Try later!');
              });
      /*
      using jquery:
      $.post('postfile.php', {message:message}, function(data)	{
          alert('Сервер ответил: '+data);
      });
      */
  };




}]);

app.controller('feedbackCtrl',
    function sendContacts($scope, $http) {
        $scope.submit = function() {
            $scope.contacts={'name': '', 'email': '', 'mesage' : ''};
        if ($scope.name && $scope.email) {
            $scope.contacts.name = this.name;
            $scope.contacts.message = this.message;
            $scope.contacts.email = this.email;
            $scope.name="";
            $scope.message='';
            $scope.email='';
        }
        var message = JSON.stringify($scope.contacts);
            $http.post('mail.php', message).
                success(function(data, status, headers, config) {
                 alert('We received your message');
                }).
                error(function(data, status, headers, config) {
                    alert('An Error Occured. Try later!');
                });

    }
    });

/*
 $('#feedbackForm').submit(function(){
 $ajax({
 type: "POST",
 url: "mail.php",
 data: $this.serialize()
 }).done(function(){
 alert('We will connect You!');
 });
 });


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
