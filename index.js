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

		var ball1 = new Ball(100,100,2,1,[0,0,255]);
		var ball2 = new Ball(200,200,4,4,[0,255,0]);
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

				var phi_vector = Math.round(Math.sqrt(Math.pow(ball[1].loc.y - ball[0].loc.y,2) + Math.pow(ball[1].loc.x - ball[0].loc.x,2))*100) / 100;
				var chg_x = Math.round(Math.abs(ball[1].loc.x - ball[0].loc.x) * 100) / 100;
				var chg_y = Math.round(Math.abs(ball[1].loc.y - ball[0].loc.y) * 100) / 100;

				// var v0 = velVector(ball[0].vel.x, ball[0].vel.y);
				// var v1 = velVector(ball[1].vel.x, ball[1].vel.y);
				// console.log(phi)
				console.log("Before: \n Ball 0: " + ball[0].vel.x + " \n Ball 1: " + ball[1].vel.x)

				// console.log(ball[1].theta)  Math.cos(ball[1].theta - phi)
				console.log(chg_x)
				var x0 = ball[0].vel.x;
				var y0 = ball[0].vel.y;

				var x1 = ball[1].vel.x;
				var y1 = ball[1].vel.y;
				// ball[0].vel.x = Math.round(
				// 	ball[1].vel.x * chg_x * chg_x / Math.pow(phi_vector,2) * 100 ) / 100

				// ball[1].vel.x = Math.round( 
				// 	store.x * chg_x  * chg_x / Math.pow(phi_vector,2) * 100 ) / 100
				
				// console.log(store.x)
				ball[0].vel.x = Math.round( 
					( (x1 * chg_x + y1 * chg_y) * chg_x / Math.pow(phi_vector,2) 
					+ (y0 * chg_x - x0 * chg_y) * chg_y / Math.pow(phi_vector,2) ) * 100 ) / 100

				ball[0].vel.y = Math.round(
					( (x1 * chg_x + y1 * chg_y) * chg_y / Math.pow(phi_vector,2)
					- (y0 * chg_x - x0 * chg_y) * chg_x / Math.pow(phi_vector,2) ) * 100 ) / 100 

				ball[1].vel.x = Math.round( 
					( (x0 * chg_x + y0 * chg_y) * chg_x / Math.pow(phi_vector,2) 
					+ (y1 * chg_x - x1 * chg_y) * chg_y / Math.pow(phi_vector,2) ) * 100 ) / 100

				ball[1].vel.y = Math.round( 
					( (x0 * chg_x + y0 * chg_y) * chg_y / Math.pow(phi_vector,2) 
					- (y1 * chg_x - x1 * chg_y) * chg_x / Math.pow(phi_vector,2) ) * 100 ) / 100

				// ball[0].vel.x = Math.round( velVector(ball[1].vel.x, ball[1].vel.y) * (cos(ball[1].vel.x, ball[1].vel.y)*phi_cos + sin(ball[1].vel.x, ball[1].vel.y)*phi_sin) * phi_cos
				// 		- velVector(ball[0].vel.x, ball[0].vel.y)* (sin(ball[0].vel.x, ball[0].vel.y)*phi_cos - cos(ball[0].vel.x, ball[0].vel.y)*phi_sin) * phi_sin ) * 100 / 100;

				// ball[0].vel.y = ball[0].vel.y

				// // Math.round(ball[1].velVector*ball[1].cos*(phi_cos + phi_sin)*phi_sin 
				// 		// +	ball[0].velVector*ball[0].sin*(phi_cos - phi_sin) * phi_cos)*100 / 100;

				// ball[1].vel.x = Math.round( velVector(ball[0].vel.x, ball[0].vel.y) * (cos(ball[0].vel.x, ball[0].vel.y)*phi_cos + sin(ball[0].vel.x, ball[0].vel.y)*phi_sin) * phi_cos
				// 		- velVector(ball[1].vel.x, ball[1].vel.y)* (sin(ball[1].vel.x, ball[1].vel.y)*phi_cos - cos(ball[1].vel.x, ball[1].vel.y)*phi_sin) * phi_sin ) * 100 / 100;

				// ball[1].vel.y = ball[1].vel.y
				// Math.round((ball[0].velVector*ball[0].cos*(phi_cos + phi_sin)*phi_sin 
						// +	ball[1].velVector*ball[1].sin*(phi_cos - phi_sin) *phi_cos)*100 / 100);

				// ball[0].vel.x = 
				console.log("After: \n Ball 0: " + ball[0].vel.x + " \n Ball 1: " + ball[1].vel.x )				
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

			if (progress < 50000) 
			{				// ball[0].vel.x = Math.round(
				// 	ball[1].vel.x * chg_x * chg_x / Math.pow(phi_vector,2) * 100 ) / 100

				// ball[1].vel.x = Math.round( 
				// 	store.x
				window.requestAnimationFrame(step)	
			}
		}
	}
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
	this.colors = "rgb(," + color[0] + ", " + color[1] + ", " + color[2] + ")";
}

function velVector ( vel_x, vel_y)
{
	var velVector = Math.round(Math.sqrt(Math.pow(vel_x,2) + Math.pow(vel_y,2))*100) / 100;
	return velVector
}

function cos (vel_x, vel_y)
{
	var cos;
	if (vel_x == 0 && vel_y == 0)
	{
		cos = 0;
	} else {
		cos = Math.round(vel_x / Math.sqrt(Math.pow(vel_x,2) + Math.pow(vel_y,2)) * 100) / 100;
	}
	return cos
}

function sin (vel_x, vel_y)
{
	var sin;
	if (vel_x == 0 && vel_y == 0)
	{
		sin = 0;
	} else {
		var sin = Math.round(vel_y / Math.sqrt(Math.pow(vel_x,2) + Math.pow(vel_y, 2)) * 100) / 100;
	}
	return sin
}