var registerCtrl = angular.module('registerCtrl',['gservice']);
registerCtrl.controller('registerCtrl', function($scope, $http, $rootScope, $location, $window, gservice){


    $scope.formData = {};
    $scope.types = ["User", "Worker", "Manager", "Administrator"];

    $scope.addUser = function() {
        var data = {
            firstName: $scope.formData.firstName,
            lastName: $scope.formData.lastName,
            username: $scope.formData.username,
            password: $scope.formData.password,
            email: $scope.formData.email,
            accountType: $scope.formData.accountType
        }

        $http.put('/addUser',data).success(()=> {
            console.log('it worked');
        });
    }
});