<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

$calumno= $_GET['calumno'];
$capellidop= $_GET['capellidop'];
$capellidom= $_GET['capellidom'];
$carrera= $_GET['carrera'];
$cestatus=$_GET['cestatus'];

function uuid(){
    $data = random_bytes(16);
    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); 
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); 
    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

if(!empty($calumno) && !empty($capellidop) && !empty($capellidom) && !empty($carrera) && !empty($cestatus)){
    
    require_once('private/dbconnect.php');
   
    $consulta = $connection->query("SELECT NOMBRE FROM ALUMNOS WHERE NOMBRE='".($calumno)."' AND APELLIDO_PATERNO='".($capellidop)."' AND APELLIDO_MATERNO='".($capellidom)."';");
    
    if (mysqli_num_rows($consulta)==0){

        date_default_timezone_set("America/Mexico_City");	
        $hoy = date("Y-m-d H:i:s");  

        $consulta = $connection->query("INSERT INTO ALUMNOS VALUES('".uuid()."',1920,'".$carrera."','".strtoupper($calumno)."','".strtoupper($capellidop)."','".strtoupper($capellidom)."',".$cestatus.");");

        if($consulta){
            $outp = array("status"=>"true","codigo"=>"200");
        }else{
            $outp = array("status"=>"false","codigo"=>"500","mensaje"=>"Ha ocurrido un error en el reguistro del usuario");             
        }      
    }else{	

         $outp = array("status"=>"false","codigo"=>"204","mensaje"=>"Usuario ya existente");  
    }
    echo json_encode($outp);
}
?>
