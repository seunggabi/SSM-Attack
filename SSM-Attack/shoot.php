<?
	header('Content-Type: text/html; charset=utf-8');
	Header('Access-Control-Allow-Origin: *');
	require_once "db-config.php";
	
	extract($_GET);

	$query = "UPDATE shoot SET `check`='Y' WHERE id = '$id'";
	$mysqli->query($query);

?>