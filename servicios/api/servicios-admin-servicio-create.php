<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');



$nombre= $_GET['nombre'];
$desc= $_GET['desc'];
$costo= $_GET['costo'];
$estatus= $_GET['estatus'];
require_once('private/dbconnect.php');

function uuid(){
   	$data = random_bytes(16);
   	$data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
   	$data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$result = $connection->query("SELECT NOMBRE FROM SERVICIOS WHERE NOMBRE='".$nombre."';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
   if ($outp != "") {$outp .= ",";}
   $outp = $rs["NOMBRE"];
}

if($nombre!=$outp){
	date_default_timezone_set("America/Mexico_City");	
	$hoy = date("Y-m-d H:i:s");  
	
	$result = $connection->query("insert into servicios values('".uuid()."','1920','".$nombre."','".$desc."',".$costo.",'".$hoy."','".$hoy."',".$estatus.");");
	
	
	
	
	if($result){
			$outp ='{"status":"true"}';
		}else{
			$outp ='{"status":"false", "mensaje":"Ha ocurrido un error en el regustro del usuario".$usuario."}';
		}
}else{
	$outp ='{"status":"false", "mensaje":"El usuario ya existe"}';
}

	echo($outp);
?>
