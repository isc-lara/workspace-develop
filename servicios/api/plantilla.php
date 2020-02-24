<html>
	<head></head>
<body>
	<table>
		<thead>
			<tr>
				<th>ID</th>
				<th>USUARIO</th>
			</tr>
		</thead>
		<tbody>
			<?php 		  
				$conn = new mysqli("localhost", "root", "123456", "curso");
				$result = $conn->query("SELECT NOMBRE_USUARIO,iD_USUARIO FROM USUARIO ORDER BY NOMBRE_USUARIO LIMIT 5");	
				$rs = "";
				while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
					echo '<tr><td>'.$rs['iD_USUARIO'].'</td><td>'.$rs['NOMBRE_USUARIO'].'</td></tr>';
				}	
			?>
		</tbody>
	</table>
</body>
</html>
