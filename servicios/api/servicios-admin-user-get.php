<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

	$nombre= $_GET['nombre'];
	$fechaInicio= $_GET['fechaInicio'];
	$fechaFin= $_GET['fechaFin'];
	$estatus= $_GET['estatus'];
	require_once('private/dbconnect.php');

	$queryConcat="SELECT iD_USUARIO,CONCAT(UPPER(SUBSTRING(NOMBRE_USUARIO,1,1)),LOWER(SUBSTRING(NOMBRE_USUARIO,2))) AS NOMBRE_USUARIO,DATE_FORMAT(FECHA_CREACION_ALTA,'%Y-%m-%d') AS FCREATE, DATE_FORMAT(FECHA_MODIFICACION,'%Y-%m-%d') AS FUPDATE, ESTATUS FROM USUARIO WHERE 1=1 ";
					   
				if($fechaInicio != null && $fechaFin != null){
					$queryConcat .=" AND FECHA_CREACION_ALTA>='".$fechaInicio."' AND FECHA_CREACION_ALTA<='".$fechaFin."'";
				}	   
				if($nombre != null){
					$queryConcat .=" AND NOMBRE_USUARIO='".$nombre."'";
				}	   
				if($estatus != null){
					$queryConcat .=" AND ESTATUS =".$estatus."";
				}	   
		
	$result = $connection->query($queryConcat);

	$outp = "";
	while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
		if ($outp != "") {$outp .= ",";}

		$outp .= '{"id":"'. $rs["iD_USUARIO"]. '",';	
		$outp .= '"nombreUsuario":"'. $rs["NOMBRE_USUARIO"]. '",';	
		$outp .= '"fechaCreacion":"'. $rs["FCREATE"]. '",';	
		$outp .= '"fechaModificacion":"'. $rs["FUPDATE"]. '",';		
		$outp .= '"estatus":"'. $rs["ESTATUS"]. '"}';
	}
	$outp ='{"records":['.$outp.']}';
	echo($outp);


/*
$method = $_SERVER['REQUEST_METHOD'];
echo $method;
switch ($method) {
  case 'GET':
    echo 'Here Handle GET Request';
    break;
  case 'POST':
    echo 'Here Handle POST Request';
    break;
  case 'DELETE':
    echo 'Here Handle DELETE Request ';
    break;
  case 'PUT':
    echo 'Here Handle PUT Request';
  break;
}
*/
?>