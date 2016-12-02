angular.module('loginService', [])
    .factory('loginService', function($rootScope, $http) {
        // body...

        var service = {};

        service.verifyLogin = function(user, pass) {
            console.log("in service test");
            var p = new Promise((resolve, reject)=> {
                $http.get('/get_user?username='+user+"&password="+pass).success((res)=> {
                    if (res.status == true) {
                        resolve();
                    }
                });
            });
            return p;
        }

        return service;
    });
