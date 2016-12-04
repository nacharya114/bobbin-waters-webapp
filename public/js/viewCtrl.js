var viewCtrl = angular.module('viewCtrl',['gservice']);
viewCtrl.controller('viewCtrl', function($scope, $http, $rootScope, $location, $window, gservice){
    $http.get("/sourceReportList").then(function(response) {
        $scope.sourceReports = response.data;
    });
    $http.get("/qualityReportList").then(function(response) {
        $scope.qualityReports = response.data;
    });
});