var app = angular.module('app-corpo');

app.constant('url', {
    contexto: 'http://localhost:80/servicios/api/'
});



app.service('loginService', ['url', '$http', '$q', function (url, $http, $q) {

    return {
        cierraSesion: function () {
            return $http.get(url.contexto + 'servicios-admin-user-sig-out.php')
                .then(
                    function successCallback(response) {

                        return response.data;
                    },
                    function errorCallback(errResponse) {

                        return $q.reject(errResponse);
                    }
                );
        },

        obtieneUsuarios: function (nombreUsers, fechaInicio, fechaFin, estatusUser) {


            return $http.get(url.contexto + 'servicios-admin-user-get.php?nombre=' + nombreUsers + '&&fechaInicio=' + fechaInicio + '&&fechaFin=' + fechaFin + '&&estatus=' + estatusUser)
                .then(
                    function successCallback(response) {

                        return response.data.records;
                    },
                    function errorCallback(errResponse) {

                        return $q.reject(errResponse);
                    }
                );
        },

        actualizarContrasena: function (id, estatus, pwd) {

            return $http.get('http://localhost:80/servicios/api/servicios-admin-user-update.php?id=' + id + '&&estatus=' + estatus + '&&pwd=' + pwd)
                .then(
                    function successCallback(response) {
                        return response.data;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        actualizarEstatus: function (id, estatus, estatusUsuario) {


            return $http.get(url.contexto + 'servicios-admin-user-update-estatus.php?id=' + id + '&&estatus=' + estatus + '&&newestatus=' + estatusUsuario)
                .then(
                    function successCallback(response) {
                        return response.data;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        creaUsusario: function (username, password) {

            return $http.get(url.contexto + 'servicios-admin-user-create.php?nombre=' + username + '&&contrasena=' + password)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        $log.error('Error al guardar.');
                        return $q.reject(errResponse);
                    }
                );
        },

        actualizarEstatusAlumno: function (id, estatus, estatusUsuario) {


            return $http.get(url.contexto + 'servicios-admin-alumno-update-estatus.php?id=' + id + '&&estatus=' + estatus + '&&newestatus=' + estatusUsuario)
                .then(
                    function successCallback(response) {
                        return response.data;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        actualizarEstatusServicio: function (id, estatus, estatusUsuario) {


            return $http.get(url.contexto + 'servicios-admin-servicio-update-estatus.php?id=' + id + '&&estatus=' + estatus + '&&newestatus=' + estatusUsuario)
                .then(
                    function successCallback(response) {
                        return response.data;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        descargarPDFalumno: function (id, clave) {

            var url = url.contexto + 'servicios-admin-alumno-genera-pdf.php?idPdfDocument=' + id + '&&claveDocument=' + clave;

            return $http.get(url).then(
                function successCallback(response) {
                    return response.data;
                },
                function errorCallback(errResponse) {

                    var mensajeError = "";
                    if (errResponse.status === -1 || errResponse.status === 12029 || errResponse.status === 0) {
                        mensajeError = "El servicio no se encuentra disponible. Por favor, intentar más tarde.";
                    } else if (errResponse.status === 401 || errResponse.status === 403) {
                        mensajeError = "Permiso denegado, verifique sus credenciales de acceso.";
                    } else if (errResponse.status == 500) {
                        mensajeError = "El servidor no pudo cumplir solicitud.";
                    }
                    if (errResponse.status == 200) {
                        return $q.reject(errResponse.data);
                    } else {
                        return $q.reject(mensajeError);
                    }
                });
        },

        obtieneAlumnos: function (alumClave, alumNombre, alumCarrera, alumEstatus) {
            return $http.get(url.contexto + 'servicios-admin-alumnos.php?clave=' + alumClave + '&&nombre=' + alumNombre + '&&carrera=' + alumCarrera + '&&estatus=' + alumEstatus)
                .then(
                    function successCallback(response) {

                        return response.data.records;
                    },
                    function errorCallback(errResponse) {

                        return $q.reject(errResponse);
                    }
                );
        },

        createalumno: function (calumno, capellidop, capellidom, carrera, cestatus) {
            return $http.get(url.contexto + 'servicios-admin-alumno-create.php?calumno=' + calumno + '&&capellidop=' + capellidop + '&&capellidom=' + capellidom + '&&carrera=' + carrera + '&&cestatus=' + cestatus)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        $log.error('Error al guardar.');
                        return $q.reject(errResponse);
                    }
                );
        },

        createServicio: function (nombreServ, descripcionServ, costoServ, estatusServ) {
            console.info(nombreServ);
            console.info(descripcionServ);
            console.info(costoServ);
            console.info(estatusServ);


            return $http.get(url.contexto + 'servicios-admin-servicio-create.php?nombre=' + nombreServ + '&&desc=' + descripcionServ + '&&costo=' + costoServ + '&&estatus=' + estatusServ)
                .then(
                    function (response) {
                        return response.data;
                    },
                    function (errResponse) {
                        $log.error('Error al guardar.');
                        return $q.reject(errResponse);
                    }
                );
        },

        obtieneServicios: function (servClave, servNombre, servCosto, servEstatus) {

            return $http.get(url.contexto + 'servicios-admin-servicios.php?clave=' + servClave + '&&nombre=' + servNombre + '&&costo=' + servCosto + '&&estatus=' + servEstatus)
                .then(
                    function successCallback(response) {
                        return response.data.records;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        obtieneServiciosAlumnos: function (id) {


            return $http.get(url.contexto + 'servicios-admin-merge-servicio-alumno.php?idMerge=' + id)
                .then(
                    function successCallback(response) {
                        console.info(response);
                        return response.data.records;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        eliminaServiciosAlumnos: function (id) {
            console.info(url.contexto + 'servicios-admin-merge-servicio-alumno-delete.php?idMerge=' + id);

            return $http.get(url.contexto + 'servicios-admin-merge-servicio-alumno.php?idMerge=' + id)
                .then(
                    function successCallback(response) {
                        console.info(response);
                        return response.data.records;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        },

        createMerge: function (aid, aclave, acarrera, anombre, sclave, snombre, scosto) {

            return $http.get(url.contexto + 'servicios-admin-merge.php?aid=' + aid + '&&aclave=' + aclave + '&&acarrera=' + acarrera + '&&anombre=' + anombre + '&&sclave=' + sclave + '&&snombre=' + snombre + '&&scosto=' + scosto)

                .then(
                    function successCallback(response) {
                        return response.data;
                    },
                    function errorCallback(response) {
                        return response.data;
                    }
                );
        }
    }
}]);
