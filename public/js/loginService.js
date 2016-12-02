angular.module('loginService', [])
    .factory('loginService', function($rootScope, $http) {
        // body...

        var service = {};

        service.verifyLogin = function(user, pass) {
            var p = new Promise((resolve, reject)=> {
                $http.get('/get_user?username='+user+"&password="+pass).success((res)=> {
                    if (res.status == true) {
                        resolve();
                    } else {
                        reject();
                    }
                });
            });
            return p;
        }

        return service;
    });