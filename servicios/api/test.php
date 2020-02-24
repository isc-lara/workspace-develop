<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');



$conn = new mysqli("www.db4free.net", "admin_mexico", "sysadmin_18", "pruebas_mexico1");


if($conn){
echo "Conexión exitosa";		
}

$conn->close();


/*$result = $conn->query("select iD_USUARIO from usuario where iD_USUARIO='".$IdUsr."';");*/



?>
