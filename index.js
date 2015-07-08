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


		var ball1 = new Ball(100,100,1,3,[0,0,255]);
		var ball2 = new Ball(100,300,3,4,[0,255,0]);
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

			// ctx.beginPath();
			// ctx.moveTo(ball[0].loc.x, ball[0].loc.y);
			// ctx.lineTo(ball[1].loc.x, ball[1].loc.y);
			// var xTip = ball[1].loc.x + ball[1].vel.x*10
			// var yTip = ball[1].loc.y + ball[1].vel.y*10
			// ctx.lineTo(ball[1].loc.x + ball[1].vel.x*10, ball[1].loc.y + ball[1].vel.y*10);


			// ctx.moveTo(ball[0].loc.x, ball[0].loc.y);
			// ctx.lineTo(ball[0].loc.x + ball[0].vel.x*10, ball[0].loc.y + ball[0].vel.y*10);

			// ctx.strokeStyle = "#000";
			// ctx.lineWidth = 2;
			// ctx.stroke();

			var dist = Math.sqrt(Math.pow(ball[0].loc.x - ball[1].loc.x,2) + Math.pow(ball[0].loc.y - ball[1].loc.y,2));
			var overlap;
			if (dist <= 60)
			{
				ctx.fillStyle = "rgb(255,0,0)" 	
				overlap = true;	
				var n = (new Victor(ball[1].loc.x - ball[0].loc.x, ball[1].loc.y - ball[0].loc.y)).normalize();
				var n_perp = new Victor(-n.clone().y, n.clone().x);

				console.dir(n);
				console.dir(n_perp)
				// Copy so first update doesn't jank the rest of the calculations
				var initial_v0 = ball[0].vel.clone();
				var initial_v1 = ball[1].vel.clone();

				console.log("Before: \n Ball 0: " + ball[0].vel.x + ", " 
					+ ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y)

				var v0_other = Victor.fromArray([initial_v0.clone().dot(n),initial_v0.clone().dot(n)]).multiply(n);
				console.log(v0_other);
				var v1_other = Victor.fromArray([initial_v1.clone().dot(n),initial_v1.clone().dot(n)]).multiply(n);
				var v0_self = Victor.fromArray([initial_v0.clone().dot(n_perp),initial_v0.clone().dot(n_perp)]).multiply(n_perp);
				console.log(v0_self)
				console.log(n_perp)
				console.log(initial_v0.clone().dot(n_perp))
				var v1_self = Victor.fromArray([initial_v1.clone().dot(n_perp),initial_v1.clone().dot(n_perp)]).multiply(n_perp);

				ball[1].vel = v0_other.add(v1_self);
				ball[0].vel = (v1_other).add(v0_self);
	
				// ball[0].vel.x = 0 
				// ball[0].vel.y = 0

				// ball[1].vel.x = 0
				// ball[1].vel.y = 0

				console.log("After: \n Ball 0: " + ball[0].vel.x + ", " + ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y )			
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
	this.loc = Victor(loc_x, loc_y)
	this.vel = Victor(vel_x, vel_y)
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