	<?php	
		ob_start();  require_once ('dompdf/dompdf_config.inc.php');	
		$conn = new mysqli("localhost", "U$3RUN$4", "123456", "curso");
		$result = $conn->query("SELECT NOMBRE_USUARIO,iD_USUARIO FROM USUARIO ORDER BY NOMBRE_USUARIO LIMIT 0");	
		$rs = "";
		$row= '';	
	?>
			<html><body>
			<table><thead>
			<tr><th>USUARIO</th></tr>
			</thead><tbody>
				<?php 	
					while($rs = $result->fetch_array(MYSQLI_ASSOC)) {	
					  echo '<tr><td>'.$rs['NOMBRE_USUARIO'].'</td></tr>';
					}
				?>		
			</tbody></table>
			</body></html>
	<?php			
		$dompdf = new DOMPDF();
		$dompdf->set_paper("Carta", "landscape");	
		$dompdf->load_html(utf8_decode(ob_get_clean()));
		ini_set("memory_limit","50M"); 	
		$dompdf->render();	
		$dompdf->stream('FicheroEjemplo.pdf', array('Attachment'=>'0'));
	?>

