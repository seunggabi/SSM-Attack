<?
	header('Content-Type: text/html; charset=utf-8');
	require_once "db-config.php";
	
	extract($_GET);
	$time = explode(" ", microtime());
	$time = $time[0] + $time[1];
	
	echo "현재시간: ".$time."<br/>";
	if(isset($user))
	{
		$query = "INSERT INTO shoot (`time`, user ) VALUES (".$time.", '".$user."')";
		$mysqli->query($query);
		echo $user;
	}
	else
	{
		echo "사용자 정보가 없습니다.";
	}
?>

<script type="text/javascript">
	<?=$time?>//location.href = '/SSM_Attack/tracking/examples/color_camera.html';
</script>