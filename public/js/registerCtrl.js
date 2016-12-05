var registerCtrl = angular.module('registerCtrl',['gservice']);
registerCtrl.controller('registerCtrl', function($scope, $http, $rootScope, $location, $window, gservice){


    $scope.formData = {};
    $scope.types = ["User", "Worker", "Manager", "Administrator"];

    $scope.addUser = function() {
        if ($scope.formData.password != $scope.formData.confPassword) {
            alert("Passwords do not match");
            return false;
        }
        $http.get('/checkUser?username='+ $scope.formData.username).success((res)=> {
            if (res.length > 0) {
                alert("That username already exists");
                return false;
            } else {
                var data = {
                    firstName: $scope.formData.firstName,
                    lastName: $scope.formData.lastName,
                    username: $scope.formData.username,
                    password: $scope.formData.password,
                    email: $scope.formData.email,
                    accountType: $scope.formData.accountType
                }

                $http.put('/addUser',data).success(()=> {
                    $window.location.href = '/#/login';
                    console.log('it worked');
                });
            }
        });
    }
});