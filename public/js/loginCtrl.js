var loginCtrl = angular.module('loginCtrl',['gservice', 'loginService']);
loginCtrl.controller('loginCtrl', function($scope, $http, $rootScope, $location, gservice, loginService){

    //Initializing form data
    $scope.formData = {};

    $scope.testRelocate = function() {
        $location.path('/#/test');
    }

    $scope.verifyLogin = function() {
        var user = $scope.formData.username;
        var pass = $scope.formData.password;
        loginService.verifyLogin(user, pass).then(()=>{
            console.log("inside promise");
            $location.path('/#/test');
            $scope.apply();
            gservice.empty();
        }, () => {
            console.log("error in promise");
        });
        console.log("in loingCtrl");
    }
});