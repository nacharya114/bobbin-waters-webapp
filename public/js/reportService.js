angular.module('reportService', ['loginService'])
    .factory('reportService', function($rootScope, $http, loginService) {
        // body...

        var service = {};

        service.getReports = function() {

            var p = new Promise((resolve, reject) => {

                var reports = [];

                if (loginService.user) {
                    if (loginService.user.accountType == "User") {
                        $http.get("/sourceReportList").then((response)=> {
                            reports = response;
                            //console.log(reports);
                            resolve(reports);
                        });
                    } else {
                        $http.get("/sourceReportList").then((response)=> {
                            reports = response;
                            $http.get("qualityReportList").then((resp)=> {
                                console.log(resp);
                                reports.data = reports.data.concat(resp.data);
                                console.log(reports);
                                resolve(reports);
                            });
                        });
                    }
                } else {
                    console.log("did not retrieve reports");
                    reject();
                }



            });

            return p;
        }



        return service;
    });