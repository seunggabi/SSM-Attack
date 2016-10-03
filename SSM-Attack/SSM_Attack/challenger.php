<?php
	extract($_GET);
?>
<!DOCTYPE html>
<html>
	<head>
		<script src="/SSM_Attack/js/tracking.js"></script>
		<script src="/SSM_Attack/js/dat.gui.min.js"></script>
		<script src="/SSM_Attack/js/gun.js"></script>
		<script src="/SSM_Attack/js/kalman.js"></script>
		<title>SSM | ATTACK</title>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<!--<link rel="stylesheet" href="css/core.css">-->
		<link rel="stylesheet" href="css/challenger.css">
		<script src="/SSM_Attack/js/jquery.min.js"></script>
		<script src="/SSM_Attack/js/jquery.plugin.js"></script>
		<script src="/SSM_Attack/js/jquery.countdown.js"></script>
		<script src="/SSM_Attack/js/signal.js"></script>
		<script src="/SSM_Attack/js/enemy.js"></script>
		<script src="/SSM_Attack/js/pointBase.js"></script>
	</head>
	<body>
		<div id="content">
			<div id="side">
				<video id="self" preload autoplay loop muted controls src=""></video>
				<div id="challenger" class="info">challenger
				<div id="username" class="info2"><?=$name?></div></div>
				<div id="score" class="info">score<div id="jumsu" class="info2">0</div></div>
				<div id="timer" class="info">timer<div id="clock" class="info2">Setting...</div></div>
			</div>
			<video id="gameCam" width="800" height="600" preload autoplay loop muted controls src=""></video>
			<canvas id="game" width="800" height="600"></canvas>
			<footer>SSM ATTACK</footer>
<script>
	var yellow, magenta;
	var yellow_midX, yellow_midY, magenta_midX, magenta_midY, tempX, tempY;
	var index;
	var enemyArray = [];
	var pointBase;
	var score = 0;
	var context;
	var zeroPoint = 0;

	window.onload = function() {
		var gameCam = document.getElementById('gameCam');
		var game = document.getElementById('game');
		var self = document.getElementById('self');
		context = game.getContext('2d');

		var tracker = new tracking.ColorTracker(	);
		tracking.track(gameCam, tracker, { camera: true });

		tracker.on('track', function(event) {
		context.clearRect(0, 0, game.width, game.height);

		event.data.forEach(function(rect) {
			if(rect.color == 'yellow' && rect.width >= 13 && rect.height >= 13)
			{
				yellow = rect;
				context.strokeStyle = rect.color;						
				context.strokeRect(rect.x, rect.y, rect.width, rect.height);
				context.font = '15px Helvetica';
				context.fillStyle = "#ff0000";
				yellow_midX = yellow.x + (yellow.width/2);
				yellow_midY = yellow.y + (yellow.height/2);
			}
			else if(rect.color == 'magenta' && rect.width >= 3 && rect.height >= 8)
			{
				magenta = rect;
				context.strokeStyle = rect.color;						
				context.strokeRect(rect.x, rect.y, rect.width, rect.height);
				context.font = '15px Helvetica';
				context.fillStyle = "#ff0000";
				magenta_midX = magenta.x + (magenta.width/2);
				magenta_midY = magenta.y + (magenta.height/2);

				if(zeroPoint > 4)
				{
					tempX = ((yellow_midX - magenta_midX) * (400/(((pointBase.getLeft()-pointBase.getRight())/2))))+400;
					tempY = (yellow_midY - magenta_midY - pointBase.getUp())*(600/((pointBase.getDown())-pointBase.getUp()));
				}
				console.log(tempX+' '+tempY);
				kalman(tempX, tempY);
				context.fillStyle = "#ffff00";
				context.fillText('X', mX, mY);	
			}
			context.font = '30px Helvetica';
			context.fillStyle = "#ff0000";
			switch(zeroPoint)
			{
			case 0: context.fillText('+', 761, 40); break;
			case 1: context.fillText('+', 40, 40); break;
			case 2: context.fillText('+', 761, 561); break;
			case 3: context.fillText('+', 40, 561); break;
			}
		});
	});

	 gunColorTracking(tracker);
	 replaceGame();
	 selfCam(self);
	};

	function replaceGame()
	{
		var leftMargin = (parseInt($('body').css('width')) - 1200)/2;
		var game = $('#game').css('left');
		$('#gameCam, #game').css('left', leftMargin + 320); 
	}

	function selfCam(camera)
	{
			var errorCallback = function(e) {
			console.log('Reeeejected!', e);
			};
		navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
			camera.src = window.URL.createObjectURL(localMediaStream);

		camera.onloadedmetadata = function(e) {
			};
		}, errorCallback);
	}

	function sleep(delay)
	{
		var start = new Date().getTime();
		while(new Date().getTime() < start + delay);
	}

	setInterval(function(){
		if(zeroPoint >= 4 && enemyArray.length <= 15)
		{
			var leftMargin = (parseInt($('body').css('width')) - 1200)/2 + 320;
			var topMargin = (parseInt($('html').css('height')) - 620);
			var enemy = new Enemy($('#game'), leftMargin, topMargin, 0, 0, 0, 0, 0, 0, 0, 0, 0);
			enemyArray.push(new Enemy($('#game'), leftMargin, topMargin, enemy.getId(), enemy.getX(), enemy.getY(), enemy.getW(), enemy.getH(), enemy.getRect(), 1, enemy.getDx(), enemy.getDy()));
		}
	}, 1000);	

	setInterval(function(){
		$('body').css('background-color','black');
		for(var i=0; i<enemyArray.length; i++)
				enemyArray[i].draw();
	}, 100);
</script>
		</div>
		<audio id="shoot" controls="controls">  
			<source src="/SSM_Attack/sound/shoot.wav" />  
		</audio> 
	</body>
</html>