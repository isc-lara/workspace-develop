<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: FALSE');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
require_once('private/dbconnect.php');

$usuario= $_GET['nombre'];
$pwd=$_GET['contrasena'];


function uuid(){
   	$data = random_bytes(16);
   	$data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
   	$data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

$result = $connection->query("SELECT NOMBRE_USUARIO FROM USUARIO WHERE NOMBRE_USUARIO='".$usuario."';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
   if ($outp != "") {$outp .= ",";}
   $outp = $rs["NOMBRE_USUARIO"];
}

if($usuario!=$outp){
	date_default_timezone_set("America/Mexico_City");	
	$hoy = date("Y-m-d H:i:s");
	
	$pass=md5($pwd);
	$result = $connection->query("insert into usuario values('".uuid()."','".strtoupper($usuario)."','".$pass."','".$hoy."','".$hoy."',0);");
	
		if($result){
			$outp ='{"status":"true","time":"'.$hoy.'"}';
		}else{
			$outp ='{"status":"false", "mensaje":"Ha ocurrido un error en el regustro del usuario".$usuario."}';
		}	
}else{
	$outp ='{"status":"false", "mensaje":"El usuario ya existe"}';
}
	
	echo($outp);

?>
