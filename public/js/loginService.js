angular.module('loginService', [])
    .factory('loginService', function($rootScope, $http) {
        // body...

        var service = {};

        service.verifyLogin = function(user, pass) {
            console.log("in service test");
            var p = new Promise((resolve, reject)=> {
                $http.get('/getUser?username='+user+"&password="+pass).success((res)=> {
                    console.log(res);
                    if (res.status == true) {
                        resolve();
                    } else {
                        console.log("failed");
                        reject();
                    }
                });
            });
            return p;
        }

        return service;
    });
