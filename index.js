"use strict"

var ball;
var canvas;
var start = null;
function draw()
{
	canvas = document.getElementById("canvas");
	if (canvas.getContext)
	{
		var ctx = canvas.getContext('2d');

		var ball1 = new Ball(100,100,4,0,[0,0,255]);
		var ball2 = new Ball(200,100,0,0,[0,255,0]);
		ball = [ ball1, ball2 ]

		var animation = window.requestAnimationFrame(step)

		function step (timestamp) 
		{
			if (!start) {start = timestamp};
			var progress = timestamp - start;
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.beginPath();
			ctx.arc(ball[0].loc.x,ball[0].loc.y, 30, 0, Math.PI * 2);
			ctx.fillStyle = "rgb(0,255,0)";
			// ctx.fillStyle = "rgb(" + ball[0].colors[0].toString() + "," + ball[0].colors[1].toString() + "," + ball[0].colors[2].toString() + ")" 
			ctx.fill();
			
			ctx.beginPath();
			ctx.arc(ball[1].loc.x,ball[1].loc.y, 30, 0, Math.PI * 2);
			ctx.fillStyle =  "rgb(0,0,255)" 	
			ctx.fill();

			var dist = Math.sqrt(Math.pow(ball[0].loc.x - ball[1].loc.x,2) + Math.pow(ball[0].loc.y - ball[1].loc.y,2));
			var overlap;
			if (dist <= 60)
			{
				ctx.fillStyle = "rgb(255,0,0)" 	
				overlap = true;
			}
			

			if (!overlap) 
			{
				ctx.fillStyle = ball.colors
			} else {		
				var phi = tangent(ball[0].loc.y - ball[1].loc.y, ball[0].loc.x - ball[1].loc.x);
				// console.log(phi)
				console.log("Before: \n Ball 0: " + ball[0].vel.x + ", " + ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y)

				console.log(ball[1].theta)
				ball[0].vel.x = Math.round((ball[1].velVector*Math.cos(ball[1].theta - phi)*Math.cos(phi) 
						- ball[0].velVector*Math.sin(ball[0].theta - phi) * Math.sin(phi))*100 / 100);
				ball[0].vel.y = Math.round((ball[1].velVector*Math.cos(ball[1].theta - phi)*Math.sin(phi) 
						+	ball[0].velVector*Math.sin(ball[0].theta  - phi) * Math.cos(phi))*100 / 100);

				ball[1].vel.x = Math.round((ball[0].velVector*Math.cos(ball[0].theta - phi)*Math.cos(phi) 
						- ball[1].velVector*Math.sin(ball[1].theta - phi) * Math.sin(phi))*100 / 100);
				ball[1].vel.y = Math.round((ball[0].velVector*Math.cos(ball[0].theta - phi)*Math.sin(phi) 
						+	ball[1].velVector*Math.sin(ball[1].theta  - phi) * Math.cos(phi))*100 / 100);

				// ball[0].vel.x = 
				console.log("After: \n Ball 0: " + ball[0].vel.x + ", " + ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y)				
			};

			if (ball[0].loc.x >= (canvas.width-30) || ball[0].loc.x <= 30)
			{
				ball[0].vel.x = -ball[0].vel.x
			} 
			if (ball[0].loc.y <= 30 || ball[0].loc.y >= (canvas.height-30))
			{
				ball[0].vel.y = -ball[0].vel.y
			}

			if (ball[1].loc.x >= (canvas.width-30) || ball[1].loc.x <= 30)
			{
				ball[1].vel.x = -ball[1].vel.x
			} 
			if (ball[1].loc.y <= 30 || ball[1].loc.y >= (canvas.height-30))
			{
				ball[1].vel.y = -ball[1].vel.y
			}

			ball[0].loc.x += ball[0].vel.x;
			ball[0].loc.y += ball[0].vel.y;
			ball[1].loc.x += ball[1].vel.x;
			ball[1].loc.y += ball[1].vel.y;

			if (progress < 2000) 
			{
				window.requestAnimationFrame(step)	
			}
		}
	}
}

function vel(x,y)
{
	var velVector = Math.round(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))*100) / 100;
	console.log(velVector);
	return velVector
}
function tangent(y,x)
{
	return Math.round(Math.atan2(y,x) * 100) / 100;
}	
// function Ball()
// {
// 	this.loc = { x : Math.floor((Math.random()* (w-100)) + 50), y : Math.floor((Math.random()*(h-100)) + 50) }
// 	this.vel = { x : Math.floor(Math.random() * 4 + 1), y : Math.floor(Math.random() * 4 + 1) }
// 	this.colors = [0, Math.floor(Math.random()*40), Math.floor(Math.random()*255)]
// }
function Ball(loc_x, loc_y, vel_x, vel_y, color)
{
	this.loc = { x : loc_x, y : loc_y };
	this.vel = { x : vel_x, y : vel_y };
	this.velVector = Math.round(Math.sqrt(Math.pow(vel_x,2) + Math.pow(vel_y,2))*100) / 100;
	this.theta = Math.round(Math.atan2(vel_y,vel_x) * 100) / 100;
	this.colors = "rgb(," + color[0] + ", " + color[1] + ", " + color[2] + ")";
}
