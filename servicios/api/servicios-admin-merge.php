<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');




	
$idAlum= $_GET['aid'];
$claveAlum=$_GET['aclave'];
$carreraAlum=$_GET['acarrera'];
$nombreAlum=$_GET['anombre'];

$claveServ=$_GET['sclave'];
$nombreServ=$_GET['snombre'];
$costoServ=$_GET['scosto'];
require_once('private/dbconnect.php');


	function uuid(){
		$data = random_bytes(16);
		$data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
		$data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
	return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
	}


	$hoy = date("Y-m-d H:i:s");  	

$queryConcat="INSERT INTO MERGE_SERV_ALUM VALUES('".uuid()."','".$idAlum."','".$claveAlum."','".$carreraAlum."','".$nombreAlum."','".$claveServ."','".$nombreServ."',".$costoServ.",'".$hoy."');";
	

$result = $connection->query($queryConcat);
	
		if($result){
			$outp ='{"status":"true"}';
		}else{
			$outp ='{"status":"false", "mensaje":"Ha ocurrido un error en el registro."}';
		}	
	echo($outp);

?>