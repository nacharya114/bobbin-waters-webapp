// Declares the initial angular module "meanMapApp". Module grabs other controllers and services.
var app = angular.module('meanMapApp', ['addCtrl', 'queryCtrl', 'headerCtrl', 'loginCtrl',
    'editCtrl', 'registerCtrl', 'submitCtrl', 'viewCtrl', 'graphCtrl', 'geolocation', 'gservice', 'ngRoute', 'loginService', 'reportService'])

    // Configures Angular routing -- showing the relevant view and controller when needed.
    .config(function($routeProvider){

        $routeProvider.when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'partials/loginForm.html'
        }).when('/edit', {
            controller: 'editCtrl',
            templateUrl: 'partials/editForm.html'
        }).when('/submit', {
            controller: 'submitCtrl',
            templateUrl: 'partials/submitForm.html'
        }).when('/register', {
            controller: 'registerCtrl',
            templateUrl: 'partials/registerForm.html'
        }).when('/view', {
            controller: 'viewCtrl',
            templateUrl: 'partials/viewForm.html'
        }).when('/graph', {
            controller: 'graphCtrl',
            templateUrl: 'partials/graphForm.html'
        })
        .otherwise({redirectTo:'/login'})
    });



