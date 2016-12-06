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
                            console.log(reports);
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

        service.getLocationsforQuality = function() {
            var p = new Promise((resolve, reject) => {

                var reports = [];

                if (loginService.user && loginService.user.accountType == "Manager") {

                            $http.get("qualityReportList").then((resp)=> {
                                //reports.data = reports.data.concat(resp.data);

                                for (var i = 0; i < resp.data.length; i++) {
                                    var n = resp.data[i];
                                    var latlon = {lat: n.latitude, lon: n.longitude, stringify: function() {
                                        return "{ " + this.lat + ", " + this.lon + " }";
                                    }};
                                    //if (!latlon in reports)
                                        reports.push(latlon);
                                }


                                resolve(reports);
                            });


                } else {
                    console.log("did not retrieve reports");
                    reject();
                }



            });

            return p;
        }

        service.getQualityReports = function() {
            var p = new Promise((resolve, reject) => {
                if (loginService.user && loginService.user.accountType != "User") {

                            $http.get("qualityReportList").then((resp)=> {
                                //reports.data = reports.data.concat(resp.data);

                                // for (var i = 0; i < resp.data.length; i++) {
                                //     var n = resp.data[i];
                                //     var latlon = {lat: n.latitude, lon: n.longitude, stringify: function() {
                                //         return "{ " + this.lat + ", " + this.lon + " }";
                                //     }};
                                //     //if (!latlon in reports)
                                //         reports.push(latlon);
                                // }

                                //console.log(resp.data);
                                resolve(resp.data);
                            });


                } else {
                    console.log("did not retrieve reports");
                    reject();
                }
            });
            return p;
        }



        return service;
    });