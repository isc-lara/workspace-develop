<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');
require_once('private/dbconnect.php');

$usuario= htmlspecialchars($_GET["user"]);
$pwd=htmlspecialchars($_GET["password"]);
$pass=md5($pwd);


$consulta = $connection->query("SELECT UPPER(NOMBRE_USUARIO) AS NOMBRE_USUARIO,iD_USUARIO, ESTATUS FROM USUARIO WHERE NOMBRE_USUARIO='".$usuario."' AND CONTRASENA='".$pass."';");

if (mysqli_num_rows($consulta)!=0){
    while($rs = $consulta->fetch_array(MYSQLI_ASSOC)) {
        $token = $rs["iD_USUARIO"];
        $outp = array("nombreUsuario"=>$rs["NOMBRE_USUARIO"], 
                      "id"=>$rs["iD_USUARIO"], 
                      "estatus"=>$rs["ESTATUS"],
                      "codigo"=>"200");
    }    
    session_start();
    $_SESSION["PHPSESSIONID"]=$token;
    
}else{	
	 $outp = array("mensaje"=>"Usuario y contraseña incorrectas","codigo"=>"204");
}

echo json_encode($outp);
?>