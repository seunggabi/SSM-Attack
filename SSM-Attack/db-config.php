<?php
	$db_server = "localhost";
	$db_user = "root";
	$db_passwd = "autoset";
	$db_name = "ssm_attack";
	
	$mysqli = new mysqli($db_server, $db_user, $db_passwd, $db_name);

	$mysqli->query("set session character_set_connection=utf8;");
	$mysqli->query("set session character_set_results=utf8;");
	$mysqli->query("set session character_set_client=utf8;");
?>
