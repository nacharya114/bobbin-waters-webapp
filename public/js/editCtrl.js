var editCtrl = angular.module('editCtrl',['gservice', 'loginService']);
editCtrl.controller('editCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.formData = loginService.user;


    $scope.submit = function() {
        //TODO.. PUT request to DB
    }
});