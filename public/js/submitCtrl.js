var submitCtrl = angular.module('submitCtrl',['gservice', 'loginService']);
submitCtrl.controller('submitCtrl', function($scope, $http, $rootScope, $location, $window, gservice, loginService){

    //Initializing form data
    $scope.user = loginService.user;
    $scope.formData = {};
    $scope.types = ["Bottled", "Well", "Stream", "Lake", "Spring", "Other"];
    $scope.sourceConds = ["Waste", "Treatable Clear", "Treatable Muddy", "Potable"];
    $scope.qualityConds = ["Safe", "Treatable", "Unsafe"];

    $scope.checkPermission = function(user) {
        if (user.accountType == "User") {
            return false;
        }
        return true;
    }

    $scope.checkReport = function() {

        //console.log(num +1);
    }

    $scope.submit = function() {
        var num = 0
        if ($scope.opt == "source") {
            $http.get("/sourceReportCount").success(function(response) {
                num = response[0].rowcount + 1;
             });
            var data = {
                date: /*todo*/,
                reportNumber: num,
                username: loginService.user.username,
                latitude: $scope.formData.latitude,
                longitude: $scope.formData.longitude,
                type: $scope.formData.waterType,
                condition: $scope.formData.sourceCondition
            }
            $http.put('/addSourceReport',data).success(()=> {
                console.log('it worked');
            });
        } else if ($scope.opt == "quality") {
            $http.get("/qualityReportCount").success(function(response) {
                num = response[0].rowcount + 1;
             });
            var data = {
                date: /*todo*/,
                reportNumber: num,
                username: loginService.user.username,
                latitude: $scope.formData.latitude,
                longitude: $scope.formData.longitude,
                condition: $scope.formData.qualityCondition,
                virus: $scope.formData.virusppm,
                chem: $scope.formData.chemppm
            }
            $http.put('/addQualityReport',data).success(()=> {
                console.log('it worked');
            });
        }
    }
});