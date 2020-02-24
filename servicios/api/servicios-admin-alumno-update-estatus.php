<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');


$newestatus=$_GET['newestatus'];
$IdUsr= $_GET['id'];
$edo= $_GET['estatus'];
require_once('private/dbconnect.php');

$result = $connection->query("select UUID from alumnos where UUID='".$IdUsr."';");
$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
	   if ($outp != "") {$outp .= ",";}
	   $outp = $rs["UUID"];
}
/*FECHA_MODIFICACION='".$hoy."'*/
if($IdUsr==$outp){
	date_default_timezone_set("America/Mexico_City");	
	$hoy = date("Y-m-d H:i:s"); 
	$result = $connection->query("UPDATE alumnos SET ESTATUS=".$newestatus."  WHERE UUID='".$IdUsr."' AND ESTATUS=".$edo.";");	
		
	/*echo "UPDATE alumnos SET ESTATUS=".$newestatus."  WHERE UUID='".$IdUsr."' AND ESTATUS=".$edo.";";*/

	if($result){
		$outp ='{"status":"true", "mensaje":"El usuario ha sido modificado"}';
	}else{
		$outp ='{"status":"false", "mensaje":"Ha ocurrido un error en la actualización"}';
	}	
}
else{
	$outp ='{"status":"false", "mensaje":"El usuario no existe"}';
}
	echo($outp);
?>
