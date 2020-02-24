<?php
require_once('config.php');

$connection = new mysqli($servidor, $usuario, $pass, $bbdd)
or die('Error: Database to host connection: '.mysql_error());

?>