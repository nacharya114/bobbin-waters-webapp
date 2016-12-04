// Create the headerCtrl module and controller. Note that it depends on $location service
var headerCtrl = angular.module('headerCtrl', ['loginService']);
headerCtrl.controller('headerCtrl', function($scope, $location, $window, loginService) {

    // Sets the isActive value based on the current URL location
    $scope.loggedin = loginService.isLoggedin();

    // $scope.logOut = function() {
    //     $scope.loggedin = false;
    // }

    // $scope.logIn = function() {
    //     $scope.loggedin = true;
    // }

    $scope.logOut = function() {
        loginService.logOut();
        $window.location.href = '/#/leave';
    }

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.show = function() {
        return loginService.isLoggedin();
    }
});