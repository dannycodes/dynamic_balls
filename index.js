"use strict"

var balls;
var canvas;
var start = null;
function draw()
{
	canvas = document.getElementById("canvas");
	if (canvas.getContext)
	{
		var ctx = canvas.getContext('2d');

  	var test1 = new TestBall1();
  	var test2 = new TestBall2();
		balls = [ new TestBall1, new TestBall2]

		var animation = window.requestAnimationFrame(step)

		function step (timestamp) 
		{
			if (!start) {start = timestamp};
			var progress = timestamp - start;
			ctx.clearRect(0,0,canvas.width, canvas.height);

			var dist = Math.sqrt(Math.pow(balls[0].loc.x - balls[1].loc.x,2) + Math.pow(balls[0].loc.y - balls[1].loc.y,2));
			var overlap;
			if (dist <= 60)
			{
				ctx.fillStyle = "rgb(255,0,0)" 	
				overlap = true;
			}
			
			var store_v = {};
			balls.forEach(function (ball, index)
			{
				// This will only work of there are two balls
				var copy = balls.slice();
				copy.splice(index,1);
				var other_ball = copy[0];
		
				ctx.beginPath();
				ctx.arc(ball.loc.x, ball.loc.y, 30, 0, Math.PI*2);

				
				if (!overlap) 
				{
					ctx.fillStyle = ball.colors
				} else {
					
					var other_theta = tangent(other_ball.vel.y, other_ball.vel.x);
					var theta = tangent(ball.vel.y, ball.vel.x)
					var phi = tangent(ball.loc.y - other_ball.loc.y, ball.loc.x - other_ball.loc.x);
					var other_vel = vel(other_ball.vel.x, other_ball.vel.y);
					var ball_vel = vel(ball.vel.x, ball.vel.y)
					console.log(theta)
					console.log(other_theta)
					console.log(phi)
					console.log("Before " + ball.vel.x +", " + ball.vel.y) 
					store_v = {x: ball.vel.x, y: ball.vel.y}
					ball.vel.x = Math.round((other_vel*Math.cos(other_theta - phi)*Math.cos(phi) 
							- ball_vel*Math.sin(theta - phi) * Math.sin(phi))*100 / 100);
					ball.vel.y = Math.round((other_vel*Math.cos(other_theta - phi)*Math.sin(phi) 
							+	ball_vel*Math.sin(theta - phi) * Math.cos(phi))*100 / 100);
					debugger;
				};

				ctx.fill();

				if (ball.loc.x >= (canvas.width-30) || ball.loc.x <= 30)
				{
					ball.vel.x = -ball.vel.x
				} 
				if (ball.loc.y <= 30 || ball.loc.y >= (canvas.height-30))
				{
					ball.vel.y = -ball.vel.y
				}
			})
			

		
			balls[0].loc.x += balls[0].vel.x;
			balls[0].loc.y += balls[0].vel.y;
			balls[1].loc.x += balls[1].vel.x;
			balls[1].loc.y += balls[1].vel.y;

			if (progress < 1000) 
			{
				window.requestAnimationFrame(step)	
			}
		}
	}
}

function vel(x,y)
{
	return Math.round(Math.sqrt(Math.pow(x,2) + Math.pow(y,2))*100) / 100;
}
function tangent(y,x)
{
	return Math.round(Math.atan2(y,x) * 100) / 100;
}	
function Ball()
{
	this.loc = { x : Math.floor((Math.random()* (w-100)) + 50), y : Math.floor((Math.random()*(h-100)) + 50) }
	this.vel = { x : Math.floor(Math.random() * 4 + 1), y : Math.floor(Math.random() * 4 + 1) }
	this.colors = [0, Math.floor(Math.random()*40), Math.floor(Math.random()*255)]
}
function TestBall1()
{
	this.loc = { x : 100, y : 100 }
	this.vel = { x : 4, y : 0 }
	this.colors = "rgb(0,0,255)"
}
function TestBall2()
{
	this.loc = { x : 200, y : 100 }
	this.vel = { x : 0, y : 0 }
	this.colors = "rgb(0,255,0)"
}
