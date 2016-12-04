var editCtrl = angular.module('editCtrl',['gservice', 'loginService']);
editCtrl.controller('editCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.formData = loginService.user;


    $scope.updateUser = function() {
        var userPassword = loginService.user.password;
        if ($scope.formData.newPassword != userPassword) {
            userPassword = $scope.formData.newPassword;
        }

        var data = {
            firstName: $scope.formData.firstName,
            lastName: $scope.formData.lastName,
            username: loginService.user.username,
            password: userPassword,
            email: $scope.formData.email,
            accountType: loginService.user.accountType,
            address: $scope.formData.address,
            title: $scope.formData.title
        }

        $http.put('/editUser',data).success(()=> {
            console.log('it worked');
        });
    }
});