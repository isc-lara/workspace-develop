var app = angular.module("autenticacion-login", ['ui.bootstrap','blockUI','ngRoute','ngResource']);

   	app.controller('autentica-user', ['$scope', 'loginService', 'blockUI', '$timeout','$window', function ($scope, loginService, blockUI, $timeout,$window) {

					
	
			
   	$scope.variablesDeInicioLogin = function () {   			   			   						
			$scope.mensajeLogin="";
			$scope.userLogin=false;				
			$scope.obtiensesion = localStorage.getItem("CSRF-TOKEN");			
		
			if($scope.obtiensesion!=undefined && $scope.obtiensesion!="" && $scope.obtiensesion!=null){		   						
				$window.location.href = 'http://localhost//servicios/admin.html';
		   	}
   		};
				   		   		   		
   		$scope.login = function () {				   			

   			if (($scope.username != "" || $scope.username != null || $scope.username != undefined) &&
   				($scope.password != "" || $scope.password != null || $scope.password != undefined)) {
				
				$scope.mensajeLogin="";
				$scope.userLogin=false;
				
   				blockUI.start();
   				blockUI.message("Autenticando");
   				$timeout(function () {
   					loginService.autenticaUsuario($scope.username, $scope.password).then(
   						function (response) {
							console.info(response)
							
   							if (response.estatus=="0") {
   								$scope.mensajeLogin="Sin permisos de acceso";
								$scope.userLogin=true;
								
   							} else if (response.estatus=="1") {

   								$scope.autenticado = true;
								
   								var jsonAutenticacion = {
   									usuario: response.nombreUsuario,
   									token: response.id,
   									estatus: response.estatus
   								};
   								var usuario = JSON.stringify(jsonAutenticacion);
   								$scope.guarda = localStorage.setItem("CSRF-TOKEN", usuario);
								$scope.nombre=response.nombreUsuario;
								$window.location.href = 'http://localhost//servicios/admin.html';
   							}
   						},
   						function (response) {
   							console.info(response);
   							if (response.estatus = undefined) {
   								//toastr.error("Usuario no existente");
   							}
   						}
   					);
   					blockUI.stop();
   				}, 1000);
   			}
   		};
	

		}]);

   			
	