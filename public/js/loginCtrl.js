var loginCtrl = angular.module('loginCtrl',['gservice', 'loginService']);
loginCtrl.controller('loginCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.formData = {};




    $scope.verifyLogin = function() {
        var user = $scope.formData.username;
        var pass = $scope.formData.password;
        loginService.verifyLogin(user, pass).then(()=>{
            console.log("inside promise");

            $window.location.href = '/#/edit';
            console.log($location.path());
            gservice.refresh();
        }, () => {
            alert("Invalid username or password");
            console.log("error in promise");
        });
        console.log("in loingCtrl");
    }
});