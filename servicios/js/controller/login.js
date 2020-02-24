var app = angular.module("autenticacion-login", ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'blockUI', 'ngRoute', 'ngResource', 'toastr']);

app.controller('autentica-user', ['$scope', 'loginService', 'blockUI', '$timeout', '$window', 'toastr', function ($scope, loginService, blockUI, $timeout, $window, toastr) {


    $scope.variablesDeInicioLogin = function () {
        $scope.obtiensesion = localStorage.getItem("CSRF-TOKEN");
        if ($scope.obtiensesion != undefined && $scope.obtiensesion != "" && $scope.obtiensesion != null) {
            $window.location.href = 'http://localhost/servicios/admin.html';
        }
    };

    $scope.login = function () {

        if (($scope.username != "" && $scope.username != null && $scope.username != undefined) &&
            ($scope.password != "" && $scope.password != null && $scope.password != undefined)) {

            blockUI.start();
            blockUI.message("Autenticando...");
            $timeout(function () {
                loginService.autenticaUsuario($scope.username, $scope.password).then(
                    function (response) {
                        if (response.codigo == "200" && response.estatus == "1") {
                            var jsonAutenticacion = {
                                usuario: response.nombreUsuario,
                                token: response.id,
                                estatus: response.estatus,
                                autenticado: true
                            };
                            var usuario = JSON.stringify(jsonAutenticacion);
                            $scope.guarda = localStorage.setItem("CSRF-TOKEN", usuario);
                            $window.location.href = 'http://localhost/servicios/admin.html';
                        } else if (response.codigo == "200" && response.estatus == "0") {
                            toastr.warning("Usuario sin acceso.");

                        } else if (response.codigo == "204") {
                            toastr.error(response.mensaje);

                        }
                    }
                );
                blockUI.stop();
            }, 1000);
        } else {
            toastr.error("Usuario y contraseña vacios");
        }
    };
		}]);
