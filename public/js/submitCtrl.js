var submitCtrl = angular.module('submitCtrl',['gservice', 'loginService']);
submitCtrl.controller('submitCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.user = loginService.user;
    $scope.formData = {};
    $scope.reportType = 'Scope';

    $scope.checkPermission = function(user) {
        console.log(user.accountType);
        if (user.accountType == "User") {
            return false;
        }
        return true;
    }

    $scope.checkReport = function() {
        console.log($scope.reportType);
    }

    $scope.submit = function() {
        //TODO.. PUT request to DB
    }
});