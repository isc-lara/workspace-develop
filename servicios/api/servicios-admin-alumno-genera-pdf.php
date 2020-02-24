<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

ob_start();  


	

		$id= $_GET['idPdfDocument'];
		$clave= $_GET['claveDocument'];
		require_once ('dompdf/dompdf_config.inc.php');	
		
		$result = $connection->query("SELECT CONCAT(APELLIDO_PATERNO,' ',APELLIDO_MATERNO,' ',NOMBRE) AS NOMBRE FROM ALUMNOS WHERE UUID='".$id."';");
		$outp = "";
		while($rs = $result->fetch_array(MYSQLI_ASSOC)) {												
			$outp .= $rs["NOMBRE"];						
		}

		 $html =    
			'<html><body>'.    
			'<p>Nombre'.$outp.'</p>'. 						
			'</body></html>';
		
		$dompdf = new DOMPDF();
		$dompdf->set_paper("Carta", "portrait");	
		$dompdf->load_html(utf8_decode($outp));
		ini_set("memory_limit","50M"); 	
		$dompdf->render();			

		return $dompdf->stream('FicheroEjemplo.pdf', array('Attachment' =>1));
		
	
		


		
		/*$result = $conn->query("SELECT APELLIDO_PATERNO,APELLIDO_MATERNO,NOMBRE FROM ALUMNOS");

		$result = $conn->query("SELECT CONCAT(APELLIDO_PATERNO,' ',APELLIDO_MATERNO,' ',NOMBRE) AS NOMBRE FROM ALUMNOS WHERE UUID='".$id."';");

		$outp = "";
		$loadHTML='<html><body><table width="100%" border="1">';
		$loadHTML.='<thead><tr><th>AP</th><th>AM</th><th>NOMBRE</th></tr></thead>';
		while($rs = $result->fetch_array(MYSQLI_ASSOC)) {															 
			$loadHTML .='<tr>';
			$loadHTML .='<td>'.$rs["APELLIDO_PATERNO"].'</td>';
			$loadHTML .='<td>'.$rs["APELLIDO_MATERNO"].'</td>';
			$loadHTML .='<td>'.$rs["NOMBRE"].'</td>';
			$loadHTML .='</tr>';				
		}			
		$loadHTML.= '</table></body></html>';
		

		 $html =    
			'<html><body>'.    
			'<p>Some text</p>'.    
			'</body></html>';   */
?>




