var submitCtrl = angular.module('submitCtrl',['gservice', 'loginService']);
submitCtrl.controller('submitCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.user = loginService.user;
    $scope.formData = {};
    $scope.reportType = "Source";

    $scope.checkPermission = function(user) {
        if (user.accountType == "User") {
            return false;
        }
        return true;
    }

    $scope.submit = function() {
        //TODO.. PUT request to DB
    }
});