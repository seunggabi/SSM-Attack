"use strict"


var base = [[],[],[],[]]; // topLeft, topRight, bottomLeft, bottomRight

$(document).ready(function(){
	$.ajaxSetup({cache:false});
	setInterval(function(){
		var Time;
		var User;
		var Id;
		$.ajax({
			url:"http://112.108.39.235/xml.php?user=admin",
			type:"get",
			dataType:"xml",
			success:function(xml){
				$(xml).find("case").each(function(){
					Time = $(this).find("time").text();
					User = $(this).find("user").text();
					Id = $(this).find("id").text();
					$.ajax({
						url:"http://112.108.39.235/shoot.php?id="+Id,
						type:"get",
						data:Id,
						dataType:"html",
						success:function(data){
							var flag = 0;

							if(zeroPoint < 4)
							{
								base[zeroPoint][0] = yellow_midX - magenta_midX;
								base[zeroPoint][1] = yellow_midY - magenta_midY;
								zeroPoint++;
								
								if(zeroPoint == 4)
								{
									console.log(base);
									console.log(yellow_midX+' '+magenta_midX+' '+yellow_midY+' '+magenta_midY);
									pointBase = new PointBase((base[0][0] + base[2][0])/2+2, (base[1][0] + base[3][0])/2-2, (base[0][1] + base[1][1])/2-2, (base[2][1] + base[3][1])/2+2);

									mX = ((yellow_midX - magenta_midX) * (400/(((pointBase.getLeft()-pointBase.getRight())/2))))+400;
									mY = (yellow_midY - magenta_midY - pointBase.getUp())*(600/((pointBase.getDown())-pointBase.getUp()));
									console.log(mX+' '+mY);

									zeroPoint++;

									$(function () {
										var expire_time = new Date();
										expire_time.setSeconds(expire_time.getSeconds()+30);
										$('#clock').countdown({
											until: expire_time,
											layout: '{hnn}:{mnn}:{snn}',
											format: 'hms',
											expiryText: 'Game Over',
											onExpiry: function () {
												alert('Game Over\nScore: '+score);
												location.href = '/SSM_Attack/';
											}
										});
									});
								}	
							}
							else
							{
								console.log(base);
								console.log(mX+' '+mY);
								for(var i=0; i<enemyArray.length; i++)
								{
									var x = enemyArray[i].getX();
									var y = enemyArray[i].getY();
									var w = enemyArray[i].getW();
									var h = enemyArray[i].getH();
									var id = enemyArray[i].getId();

									console.log(x+' '+y+' '+mX+' '+mY);
										
									if(800-x >= mX && 800-(x+w) <= mX && y <= mY &&  (y+h) >= mY)
									{
										flag = 1;
										$('body').css('background-color','white');
										console.log('target:'+id);
										enemyArray[i].kill();
										index = enemyArray.indexOf(enemyArray[i]);
										if (index > -1) {
											enemyArray.splice(index, 1);
										}
										i=0;
										score += 10;
										$('#jumsu').text(score);
										continue;
									}
								}
							}
							var sound = document.getElementById('shoot');
							sound.pause();
							sound.currentTime = 0;
							sound.play();
							console.log('Shoot ID: '+Id);
							if(flag == 0 && score >= 5)
								score -= 5;
							$('#jumsu').text(score);
						}
					});
				});
			}
		});
	}, 100);
});