<?php
	require_once "db-config.php";
	
	$xml = new SimpleXMLElement('<xml/>');
	$time = explode(" ", microtime());
	$time = $time[0] + $time[1];
	$user = $_GET['user'];

	$query = "SELECT * FROM shoot WHERE user='$user' AND `time` > ($time - 0.2) AND `check` = 'N'";
	$result = $mysqli->query($query);
	$num = $result->num_rows;
	while($num--)
	{
		$row = $result->fetch_assoc();
		$track = $xml->addChild('case');
		$track->addChild('time', $row['time']);
		$track->addChild('user', $row['user']);
		$track->addChild('id', $row['id']);
	}
	Header('Content-type: text/xml');
	Header('Access-Control-Allow-Origin: *');
	print($xml->asXML());

?>