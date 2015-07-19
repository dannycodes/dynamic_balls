"use strict"

var num_balls = 4;
var balls = [];
var canvas;
var ctx;
var start = null;
var animation;                     

// On content load set event listeners and grap elements
document.addEventListener("DOMContentLoaded", function (event)
{
	canvas = document.getElementById("canvas"); // define global var

	if (canvas.getContext)
	{
		ctx = canvas.getContext('2d');
	} else {
		alert("Couldn't get canvas context, check your browser's compatibility")
		return false
	}

	var select = document.getElementById("select");
	var opt = document.createElement('option');
	for (var i=1;i<10; i++)
	{
		// Preset number of balls option to selected num_balls
		var opt = document.createElement('option')
		if (i == num_balls)
		{
			opt.setAttribute('selected', true);
		}
		var textNode = document.createTextNode(i.toString());
		opt.appendChild(textNode)
		select.appendChild(opt)
	}

	var qty = document.getElementById('qty');
	var start = document.getElementById('start');

	var stop = document.getElementById('stop');
	stop.addEventListener("click", function ()
	{
		console.log("stop clicked")
		window.cancelAnimationFrame(animation)

		console.dir(animation)
	});

	var resume = document.getElementById('resume');
	resume.addEventListener("click", function ()
	{
		console.log("resume clicked")

		window.cancelAnimationFrame(animation)
		animation = window.requestAnimationFrame(step)	

		console.dir(animation)
	});

	// var clear = document.getElementById('clear');
	// clear.addEventListener("click", function()
	// {
	// 	console.log("clear canvas");
	// 	window.cancelAnimationFrame(animation);
	// 	ctx.clearRect(0,0, canvas.width, canvas.height);
	// })
	
	// qty.addEventListener("click", function () { get_qty() }, false);
	start.addEventListener("click", function () { spawn_balls(num_balls) }, false);
});

function spawn_balls(num)
{
	window.cancelAnimationFrame(animation)
	var select = document.getElementById("select")
	if (select.selectedIndex == -1)
	{
		alert("Please select a ball #");
		return null
	}
	var integer = parseInt(select.options[select.selectedIndex].text)
	num = integer

	balls = [];

	for (var i=0;i<num;i++)
	{
		var ball = generate_ball(balls, i);
		balls.push(ball)
	}

	animation = window.requestAnimationFrame(step)
}

function step (timestamp) 
{

	if (!start) {start = timestamp};
	var progress = timestamp - start;
	ctx.clearRect(0,0,canvas.width, canvas.height);

	balls.map(function (ball, index, originalArray)
	{
		// http://stackoverflow.com/questions/12104226/pairwise-combinations-of-entries-in-a-javascript-array
		var tmp = originalArray.map(function (_ball)
		{
			if (ball != _ball)
			{
				var dist =  Math.sqrt(Math.pow(ball.loc.x - _ball.loc.x,2) + Math.pow(ball.loc.y - _ball.loc.y,2));
				if (dist <= 60)
				{
					var n = (new Victor(_ball.loc.x - ball.loc.x, _ball.loc.y - ball.loc.y)).normalize();
					var n_perp = new Victor(-n.clone().y, n.clone().x);

					// Copy so first update doesn't jank the rest of the calculations
					var initial_v0 = ball.vel.clone();
					var initial_v1 = _ball.vel.clone();

					// console.log("Before: \n Ball 0: " + ball.vel.x + ", "  + ball.vel.y + " \n Ball 1: " + _ball.vel.x + ", " + _ball.vel.y)

					var v0_other = Victor.fromArray([initial_v0.clone().dot(n),initial_v0.clone().dot(n)]).multiply(n);
					var v1_other = Victor.fromArray([initial_v1.clone().dot(n),initial_v1.clone().dot(n)]).multiply(n);
					var v0_self = Victor.fromArray([initial_v0.clone().dot(n_perp),initial_v0.clone().dot(n_perp)]).multiply(n_perp);
					console.log(initial_v0.clone().dot(n_perp))
					var v1_self = Victor.fromArray([initial_v1.clone().dot(n_perp),initial_v1.clone().dot(n_perp)]).multiply(n_perp);

					_ball.vel = v0_other.add(v1_self);
					ball.vel = (v1_other).add(v0_self);

					// console.log("After: \n Ball 0: " + ball.vel.x + ", " + ball.vel.y + " \n Ball 1: " + _ball.vel.x + ", " + _ball.vel.y )						
				}
			}
		});

		if (ball.loc.x >= (canvas.width-30) || ball.loc.x <= 30)
		{
			ball.vel.x = -ball.vel.x
		} 
		if (ball.loc.y <= 30 || ball.loc.y >= (canvas.height-30))
		{
			ball.vel.y = -ball.vel.y
		}

		ctx.beginPath();
		ctx.arc(ball.loc.x,ball.loc.y, 30, 0, Math.PI * 2);
		ctx.fillStyle = 'rgb(' + Math.floor(ball.colors[0]) + ', ' + Math.floor(ball.colors[1]) + ', ' + Math.floor(ball.colors[2]) + ' )';
		ctx.fill();

		ball.loc.x += ball.vel.x;
		ball.loc.y += ball.vel.y;

		// To Do: check to make sure no balls are overlapping after iteration
		// IE: Do a distance force so the next pass doesn't run the vector code

	});

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


	if (progress < 50000) 
	{				// ball[0].vel.x = Math.round(
		// 	ball[1].vel.x * chg_x * chg_x / Math.pow(phi_vector,2) * 100 ) / 100

		// ball[1].vel.x = Math.round( 
		// 	store.x
		animation = requestAnimationFrame(step)	
	}
}

function Ball(id, loc_x, loc_y, vel_x, vel_y, color)
{
	this.id = id
	this.loc = new Victor(loc_x, loc_y)
	this.vel = new Victor(vel_x, vel_y)
	this.colors = color
}

function generate_ball(all_balls, id)
{
	var ball = instantiate_ball(id);

	if (all_balls.length < 2)
	{
		return ball
	} else {
		console.log(all_balls)
		all_balls.map(function (_ball)
		{
			// http://stackoverflow.com/questions/12104226/pairwise-combinations-of-entries-in-a-javascript-array
			if (ball.id != _ball.id)
			{
				while ((Math.abs(ball.loc.x-_ball.loc.x) < 80) || (Math.abs(ball.loc.y-_ball.loc.y)) < 80)
				{
					ball = instantiate_ball(id);
				} 
			}
		});
		return ball
	}
}

function instantiate_ball (id)
{
	var ball = new Ball( 
				id,
				Math.random()*(canvas.width - 100) + 50, 
				Math.random()*(canvas.height - 100) + 50, 
				Math.random()*3 + 1, 
				Math.random()*3 + 1, 
			 	[Math.random()*255, Math.random()*255, Math.random()*255])
	return ball
}