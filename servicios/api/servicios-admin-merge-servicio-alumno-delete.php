<?php

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

		$id= $_GET['idMerge'];
		


	require_once('private/dbconnect.php');
$queryConcat="DELETE FROM MERGE_SERV_ALUM WHERE UUID='".$id."';";
					   
	   echo $queryConcat;
		
/*$result = $connection->query($queryConcat);

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}

    $outp .= '{"id":"'. $rs["UUID"]. '",';	
	$outp .= '"nombre":"'. $rs["SNOMBRE"]. '",';		
	$outp .= '"costo":"'. $rs["SCOSTO"]. '"}';
}
$outp ='{"records":['.$outp.']}';
echo($outp);*/


?>