<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

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


require_once('private/dbconnect.php');



$queryConcat = "SELECT UUID, CLAVE,CARRERA, CONCAT(UPPER(SUBSTRING(APELLIDO_PATERNO,1,1)),LOWER(SUBSTRING(APELLIDO_PATERNO,2)),' ',UPPER(SUBSTRING(APELLIDO_MATERNO,1,1)),LOWER(SUBSTRING(APELLIDO_MATERNO,2)),' ',UPPER(SUBSTRING(NOMBRE,1,1)),LOWER(SUBSTRING(NOMBRE,2))) AS NOMBRE, ESTATUS  FROM ALUMNOS WHERE 1=1";

if (!empty($_GET['clave'])) {
    $queryConcat .= " AND CLAVE=" . $_GET['clave'];
}
if (!empty($_GET['nombre'])) {
    $queryConcat .= " AND NOMBRE='" . $_GET['nombre'] . "'";
}
if (!empty($_GET['carrera'])) {
    $queryConcat .= " AND CARRERA='" . $_GET['carrera'] . "'";
}
if (!empty($_GET['estatus'])) {
    $queryConcat .= " AND ESTATUS =" . $_GET['estatus'] . "";
}



$result = $connection->query($queryConcat.";");

$outp = "";
while ($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {
        $outp .= ",";
    }
    
    $outp .= '{"id":"' . $rs["UUID"] . '",';
    $outp .= '"clave":"' . $rs["CLAVE"] . '",';
    $outp .= '"carrera":"' . $rs["CARRERA"] . '",';
    $outp .= '"nombre":"' . $rs["NOMBRE"] . '",';
    $outp .= '"estatus":"' . $rs["ESTATUS"] . '"}';
    
}
$outp = '{"records":[' . $outp . ']}';

echo ($outp);
?>