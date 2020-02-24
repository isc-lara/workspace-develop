var app = angular.module('autenticacion-login').service('loginService', function ($http, $q) {

    return {
        /* return $http({
                method: 'POST',
                url: 'http://localhost:80/servicios/api/servicios-admin-user-sig-in.php',
                data: {
                    user: usuario,
                    password: pwd
                }
            })*/
        autenticaUsuario: function (usuario, pwd) {

            return $http.get('http://localhost:80/servicios/api/servicios-admin-user-sig-in.php?user=' + usuario + '&&password=' + pwd)
                .then(
                    function successCallback(response) {

                        return response.data;
                    },
                    function errorCallback(errResponse) {

                        return $q.reject(errResponse);
                    }
                );
        }


    }
});
