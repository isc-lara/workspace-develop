var app = angular.module("app-corpo", ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngSlimScroll', 'blockUI', 'ngRoute', 'ngResource', 'toastr']);

app.controller('administracion-servicios-corpo', ['$scope', 'loginService', 'blockUI', '$timeout', '$window', '$filter', 'toastr', function ($scope, loginService, blockUI, $timeout, $window, $filter, toastr) {


    $scope.variablesDeInicio = function () {
        $scope.obtiensesion = localStorage.getItem("CSRF-TOKEN");

        if ($scope.obtiensesion == undefined || $scope.obtiensesion == "" || $scope.obtiensesion == null) {
            $scope.token = localStorage.removeItem("CSRF-TOKEN");
            $window.location.href = 'http://localhost/servicios/index.html';
            console.info("index.html");

        } else {
            $scope.convierteLocalStorage = JSON.parse($scope.obtiensesion);
            $scope.nombreHeader = $scope.convierteLocalStorage.usuario
            $scope.mensajeLogin = "";

            $scope.userLogin = false;
            $scope.numeroPoliza = '';
            $scope.fechaInicio = "";
            $scope.rangoFechas = "";
            $scope.fechaFin = "";
            $scope.alumClave = "";
            $scope.alumNombre = "";
            $scope.alumCarrera = "";
            $scope.alumEstatus = "";
            $scope.servClave = "";
            $scope.servNombre = "";
            $scope.servCosto = "";
            $scope.servEstatus = "";

            $scope.estatusUser = "";
            $scope.nombreUsers = "";
            $scope.fechaFormateadaInicio = "";
            $scope.fechaFormateadaFinal = "";

            $scope.licenciatura = [
                {
                    "nombre": "Licenciatura en Medico Cirujano"
                },
                {
                    "nombre": "Licenciatura en Enfermeria"
                },
                {
                    "nombre": "Licenciatura en Psicologia"
                },
                {
                    "nombre": "Licenciatura en Gerontologia"
                },
                {
                    "nombre": "Licenciatura en Terapia Fisica"
                }
			];


            $scope.client = {
                idServicio: null,
                servicio: null,
                costo: null,
                typeAheadFlag: false,
                readonly: true
            };
        }
    };

    $scope.limpiaCampos = function () {
        $scope.numeroPoliza = '';
        $scope.fechaInicio = "";
        $scope.rangoFechas = "";
        $scope.fechaFin = "";
        $scope.nombreUsers = "";
        $scope.estatusUser = "";
        $scope.estatusUser = "";
        $scope.nombreUsers = "";
    }

    $scope.logout = function () {

        blockUI.start();
        blockUI.message("Recuperando");
        $timeout(function () {
            loginService.cierraSesion().then(
                function successCallback(response) {
                    console.info(response);
                    $scope.token = localStorage.removeItem("CSRF-TOKEN");
                    $window.location.href = 'http://localhost/servicios/index.html';
                },
                function errorCallback(response) {
                    console.info(response);
                }
            );
            blockUI.stop();
        }, 1000);



    }

    $scope.clear = function () {
        $scope.fechaInicio = "";
        $scope.fechaFin = "";
    };

    $scope.abrirInicio = function () {
        $scope.fhInicio.abierto = true;
    };

    $scope.abrirFin = function () {
        $scope.dateOptions = {
            minDate: $scope.fechaInicio
        };
        $scope.fhFin.abierto = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.fechaInicio = new Date(year, month, day);
        $scope.fechaFin = new Date(year, month, day);
    };

    $scope.fhInicio = {
        abierto: false
    };

    $scope.fhFin = {
        abierto: false
    };

    $scope.limpiarFecha = function () {
        if ($scope.fechaInicio === null || $scope.fechaInicio === '') {
            $scope.fechaFin = "";
        }
    };

    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
    };

    $scope.descargapdf = function (data) {
        blockUI.start();
        blockUI.message("Recuperando");
        $timeout(function () {
            loginService.descargarPDFalumno(data.id, data.clave).then(
                function successCallback(response) {
                    $scope.descarga = response;
                    $scope.autenticado = true;
                    $scope.guardarArchivoPDF(response, data.clave, data.nombre);
                },
                function errorCallback(response) {
                    $scope.tablaUSuarios = false;
                }
            );
            blockUI.stop();
        }, 1000);
    }

    $scope.guardarArchivoPDF = function (d, clave, nombreFormato) {
        var file = new Blob([d], {
            type: 'application/pdf'
        });
        file.name = 'Portal de descarga';
        fileURL = URL.createObjectURL(file);
        $window.saveAs(file, clave + '-' + nombreFormato + '.pdf');
    };

    $scope.recuperaUsuarios = function () {
        $scope.fechaFormateadaInicio = $filter('date')($scope.fechaInicio, 'yyyy-MM-dd');
        $scope.fechaFormateadaFinal = $filter('date')($scope.fechaFin, 'yyyy-MM-dd');

        blockUI.start();
        blockUI.message("Recuperando");
        $timeout(function () {
            loginService.obtieneUsuarios($scope.nombreUsers, $scope.fechaFormateadaInicio, $scope.fechaFormateadaFinal, $scope.estatusUser).then(
                function successCallback(response) {
                    $scope.usuarios = response;
                    $scope.autenticado = true;
                },
                function errorCallback(response) {
                    console.info(response);
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.recuperaAlumnos = function () {
        blockUI.start();
        blockUI.message("Recuperando");
        
        $timeout(function () {
            loginService.obtieneAlumnos($scope.alumClave, $scope.alumNombre, $scope.alumCarrera, $scope.alumEstatus).then(
                function successCallback(response) {
                    if (response == "") {
                        toastr.warning("Sin coincidencias!");
                    }
                    $scope.alumnos = response;
                    $scope.autenticado = true;
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.resetEstatusAlumnos = function (sa, estatusUsuario) {
        blockUI.start();
        blockUI.message("Actualizando");
        $timeout(function () {
            loginService.actualizarEstatusAlumno(sa.id, sa.estatus, estatusUsuario).then(
                function successCallback(response) {
                    $scope.reseteapassword = response;
                    $scope.autenticado = true;
                    $scope.recuperaAlumnos();
                    toastr.success("Usuario modificado");
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    }

    $scope.resetEstatusServicio = function (sa, estatusUsuario) {

        blockUI.start();
        blockUI.message("Actualizando");
        $timeout(function () {
            loginService.actualizarEstatusServicio(sa.id, sa.estatus, estatusUsuario).then(
                function successCallback(response) {

                    $scope.autenticado = true;
                    $scope.recuperaServicios();
                    toastr.success("Usuario modificado");
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    }

    $scope.createUser = function () {
        if ($scope.username != "" && $scope.password != "") {
            if ($scope.password == $scope.confpassword) {
                blockUI.start();
                blockUI.message("Creando");
                $timeout(function () {
                    loginService.creaUsusario($scope.username, $scope.password).then(
                        function successCallback(response) {
                            $scope.autenticado = true;
                            $scope.username = "";
                            $scope.password = "";
                            $scope.confpassword = "";
                            toastr.success("Usuario creado exitosamente!");
                            $scope.recuperaUsuarios();
                        },
                        function errorCallback(response) {
                            console.info(response);
                            /*$scope.tablaUSuarios = false;*/
                        }
                    );
                    blockUI.stop();
                }, 1000);
            } else {

                toastr.error("Contraseñas incorrectas!");
            }
        } else {
            console.info("Error")
        }
    }

    $scope.resetpwd = function (usersReset, pwd) {
        blockUI.start();
        blockUI.message("Actualizando");
        $timeout(function () {
            loginService.actualizarContrasena(usersReset.id, usersReset.estatus, pwd).then(
                function successCallback(response) {
                    $scope.reseteapassword = response;
                    $scope.autenticado = true;
                    toastr.success("Contraseña seteada para: " + usersReset.usuario);
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    }

    $scope.resetEstatus = function (su, estatusUsuario) {
        blockUI.start();
        blockUI.message("Actualizando");
        $timeout(function () {
            loginService.actualizarEstatus(su.id, su.estatus, estatusUsuario).then(
                function successCallback(response) {
                    $scope.reseteapassword = response;
                    $scope.autenticado = true;
                    $scope.recuperaUsuarios();
                    toastr.success("Usuario Activado");
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    }

    $scope.createAlumno = function () {
        blockUI.start();
        blockUI.message("Creando");
        $timeout(function () {
            loginService.createalumno($scope.calumno, $scope.capellidop, $scope.capellidom, $scope.carrera, $scope.cestatus).then(
                function successCallback(response) {
                    if (response.codigo == "200") {
                        toastr.success("Alumno creado exitosamente");
                    } else if (response.codigo == "204" || response.codigo == "500") {
                        toastr.error(response.mensaje);
                    }
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.createService = function () {
        blockUI.start();
        blockUI.message("Creando");
        $timeout(function () {

            loginService.createServicio($scope.nombreServ, $scope.descripcionServ, $scope.costoServ, $scope.estatusServ).then(
                function successCallback(response) {
                    toastr.success("Servicio creado exitosamente");
                    $scope.autenticado = true;
                },
                function errorCallback(response) {
                    toastr.error("Error al crear el usuario");
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.recuperaServicios = function (alumnos) {

        if (alumnos != undefined) {
            $scope.alumnoCrateMerge = {
                id: alumnos.id,
                clave: alumnos.clave,
                carrera: alumnos.carrera,
                nombre: alumnos.nombre
            };
        }


        blockUI.start();
        blockUI.message("Actualizando");
        $timeout(function () {
            loginService.obtieneServicios($scope.servClave, $scope.servNombre, $scope.servCosto, $scope.servEstatus).then(

                function successCallback(response) {

                    $scope.servicios = response;
                    $scope.autenticado = true;
                    $scope.clients = response;
                    /*$scope.idAlumno = id;*/
                    if (response == "") {
                        toastr.error("Sin coincidencias!");
                    }
                    $scope.selectTypeAhead = function ($item) {
                        $scope.client.idServicio = $item.id;
                        $scope.client.costo = $item.costo
                        $scope.client.servicio = $item.servicio;
                        $scope.client.typeAheadFlag = true;
                    };
                    $scope.$watch('client.servicio', function (newVal, oldVal) {
                        if ($scope.client.typeAheadFlag) {
                            $scope.client.typeAheadFlag = false;
                        } else {
                            //if not informed by typeahead we delete the id
                          /*  $scope.client.idServicio = null;
                            $scope.client.costo = "";*/

                        }
                    });
                },
                function errorCallback(response) {
                    console.info(response);
                    /*$scope.tablaUSuarios = false;*/
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.createServiceAlumno = function () {

        blockUI.start();
        blockUI.message("Creando");
        $timeout(function () {
            var str = $scope.client.costo;
            var costo = str.replace(",", "");
            loginService.createMerge($scope.alumnoCrateMerge.id, $scope.alumnoCrateMerge.clave, $scope.alumnoCrateMerge.carrera, $scope.alumnoCrateMerge.nombre, $scope.client.idServicio, $scope.client.servicio, costo).then(

                function successCallback(response) {
                    toastr.success("Relacion creada exitosamente");
                    $scope.autenticado = true;
                },
                function errorCallback(response) {
                    toastr.error("Error al crear el usuario");
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.recuperaServiciosAlumnos = function (alumnoServicios) {
        blockUI.start();
        blockUI.message("Recuperando");
        $timeout(function () {
            loginService.obtieneServiciosAlumnos(alumnoServicios.id).then(
                function successCallback(response) {
                    $scope.servicesAlumnos = response;
                    $scope.autenticado = true;
                    if (response == "") {
                        toastr.error("Sin coincidencias!");
                    }
                },
                function errorCallback(response) {
                    console.info(response);
                }
            );
            blockUI.stop();
        }, 1000);
    };

    $scope.eliminaSerAlumno = function (alumServ) {
        blockUI.start();
        blockUI.message("Eliminando");
        $timeout(function () {
            loginService.eliminaServiciosAlumnos(alumServ.id).then(
                function successCallback(response) {
                    $scope.autenticado = true;

                    toastr.success("Eliminado");

                },
                function errorCallback(response) {
                    console.info(response);
                }
            );
            blockUI.stop();
        }, 1000);
    };
		}]);
