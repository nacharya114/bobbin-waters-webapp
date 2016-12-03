angular.module('loginService', [])
    .factory('loginService', function($rootScope, $http) {
        // body...

        var service = {};

        service.user = null;

        service.isLoggedin = function(){
            //console.log(user.isEmpty());
            if (!service.user) return false;
            return true;
        }

        service.verifyLogin = function(user, pass) {
            console.log("in service test");
            var p = new Promise((resolve, reject)=> {
                $http.get('/getUser?username='+user+"&password="+pass).success((res)=> {
                    //console.log(res);
                    if (res.length > 0) {
                        service.user = res[0];
                        console.log(service.user);
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
