// var phi = Math.atan((ball.loc.y - ball2.loc.y) / (ball.loc.x - ball2.loc.x));

				// var theta0 =  Math.atan(ball.vel.y / ball.vel.x);
				// if (ball.vel.x == 0 && ball.vel.y == 0)
				// {
				// 	theta0 = 0;
				// } 
				// if (ball.vel.x == 0 && ball.vel.y != 0)
				// {
				// 	theta0 = Math.PI / 2;
				// }
				
				// var theta1 = Math.atan(ball2.vel.y / ball2.vel.x)
				// if (ball2.vel.x == 0 && ball2.vel.y == 0)
				// {
				// 	theta1 = 0;
				// } 
				// if (ball2.vel.x == 0 && ball2.vel.y != 0)
				// {
				// 	theta1 = Math.PI / 2;
				// }

				// var v0 = Math.sqrt(Math.pow(ball.vel.x,2) + Math.pow(ball.vel.y, 2))
				// var v1 = Math.sqrt(Math.pow(balls[j].vel.x,2) + Math.pow(balls[j].vel.y, 2))

				// console.log("Before Collision vels are " + ball.vel.x.toString() + ", " + ball.vel.y.toString() + " for ball 1 and " + 
				// 	balls[j].vel.x.toString() + ", " + balls[j].vel.y.toString());
		
				// ball2.vel.x = v0*Math.cos(theta0 - phi)*Math.cos(phi) + v1*Math.sin(theta1 - phi) * Math.cos(phi + (Math.PI / 2));
				// ball2.vel.y = v0*Math.cos(theta0 - phi)*Math.sin(phi) + v1*Math.sin(theta1 - phi) * Math.sin(phi + (Math.PI / 2));
	
				// ball.vel.x = v1*Math.cos(theta1 - phi)*Math.cos(phi) + v0*Math.sin(theta0 - phi) * Math.cos(phi + (Math.PI / 2));
				// ball.vel.y = v1*Math.cos(theta1 - phi)*Math.sin(phi) + v0*Math.sin(theta0 - phi) * Math.sin(phi + (Math.PI / 2));

				// console.log("After Collision vels are "  + ball.vel.x.toString() + ", " + ball.vel.y.toString() + " for ball 1 and " + 
				// 	ball2.vel.x.toString() + ", " + ball2.vel.y.toString());

// balls.forEach(function (ball, index)
// {
// 	// This will only work of there are two balls
// 	var copy = balls.slice();
// 	copy.splice(index,1);
// 	var other_ball = copy[0];

// 	ctx.beginPath();
// 	ctx.arc(ball.loc.x, ball.loc.y, 30, 0, Math.PI*2);

	
// 	if (!overlap) 
// 	{
// 		ctx.fillStyle = ball.colors
// 	} else {		
// 		var phi = tangent(ball.loc.y - other_ball.loc.y, ball.loc.x - other_ball.loc.x);

// 		console.log(theta)
// 		console.log(other_theta)
// 		console.log(phi)
// 		console.log("Before " + ball.vel.x +", " + ball.vel.y) 
// 		store_v = {x: ball.vel.x, y: ball.vel.y}
// 		ball.vel.x = Math.round((other_vel*Math.cos(other_theta - phi)*Math.cos(phi) 
// 				- ball_vel*Math.sin(theta - phi) * Math.sin(phi))*100 / 100);
// 		ball.vel.y = Math.round((other_vel*Math.cos(other_theta - phi)*Math.sin(phi) 
// 				+	ball_vel*Math.sin(theta - phi) * Math.cos(phi))*100 / 100);
// 		debugger;
// 	};

// 	ctx.fill();

// 	if (ball.loc.x >= (canvas.width-30) || ball.loc.x <= 30)
// 	{
// 		ball.vel.x = -ball.vel.x
// 	} 
// 	if (ball.loc.y <= 30 || ball.loc.y >= (canvas.height-30))
// 	{
// 		ball.vel.y = -ball.vel.y
// 	}
// })


// FROM LAST WORKING RUN THROUGH

// var phi_vector = Math.round(Math.sqrt(Math.pow(ball[1].loc.y - ball[0].loc.y,2) + Math.pow(ball[1].loc.x - ball[0].loc.x,2))*100) / 100;
// var chg_x = Math.round(Math.abs(ball[1].loc.x - ball[0].loc.x) * 100) / 100;
// var chg_y = Math.round(Math.abs(ball[1].loc.y - ball[0].loc.y) * 100) / 100;

// console.log(chg_x)
// var x0 = ball[0].vel.x;
// var y0 = ball[0].vel.y;

// var x1 = ball[1].vel.x;
// var y1 = ball[1].vel.y;
// ball[0].vel.x = Math.round( 
// 	( (x1 * chg_x + y1 * chg_y) * chg_x / Math.pow(phi_vector,2) 
// 	+ (y0 * chg_x - x0 * chg_y) * chg_y / Math.pow(phi_vector,2) ) * 100 ) / 100

// ball[0].vel.y = Math.round(
// 	( (x1 * chg_x + y1 * chg_y) * chg_y / Math.pow(phi_vector,2)
// 	- (y0 * chg_x - x0 * chg_y) * chg_x / Math.pow(phi_vector,2) ) * 100 ) / 100 

// ball[1].vel.x = Math.round( 
// 	( (x0 * chg_x + y0 * chg_y) * chg_x / Math.pow(phi_vector,2) 
// 	+ (y1 * chg_x - x1 * chg_y) * chg_y / Math.pow(phi_vector,2) ) * 100 ) / 100

// ball[1].vel.y = Math.round( 
// 	( (x0 * chg_x + y0 * chg_y) * chg_y / Math.pow(phi_vector,2) 
// 	- (y1 * chg_x - x1 * chg_y) * chg_x / Math.pow(phi_vector,2) ) * 100 ) / 100

// if (dist <= 60)
// {
// 	var n = (new Victor(ball[1].loc.x - ball[0].loc.x, ball[1].loc.y - ball[0].loc.y)).normalize();
// 	var n_perp = new Victor(-n.clone().y, n.clone().x);

// 	// Copy so first update doesn't jank the rest of the calculations
// 	var initial_v0 = ball[0].vel.clone();
// 	var initial_v1 = ball[1].vel.clone();

// 	console.log("Before: \n Ball 0: " + ball[0].vel.x + ", " 
// 		+ ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y)

// 	var v0_other = Victor.fromArray([initial_v0.clone().dot(n),initial_v0.clone().dot(n)]).multiply(n);
// 	var v1_other = Victor.fromArray([initial_v1.clone().dot(n),initial_v1.clone().dot(n)]).multiply(n);
// 	var v0_self = Victor.fromArray([initial_v0.clone().dot(n_perp),initial_v0.clone().dot(n_perp)]).multiply(n_perp);
// 	console.log(initial_v0.clone().dot(n_perp))
// 	var v1_self = Victor.fromArray([initial_v1.clone().dot(n_perp),initial_v1.clone().dot(n_perp)]).multiply(n_perp);

// 	ball[1].vel = v0_other.add(v1_self);
// 	ball[0].vel = (v1_other).add(v0_self);

// 	console.log("After: \n Ball 0: " + ball[0].vel.x + ", " + ball[0].vel.y + " \n Ball 1: " + ball[1].vel.x + ", " + ball[1].vel.y )			
// };

// if (ball[0].loc.x >= (canvas.width-30) || ball[0].loc.x <= 30)
// {
// 	ball[0].vel.x = -ball[0].vel.x
// } 
// if (ball[0].loc.y <= 30 || ball[0].loc.y >= (canvas.height-30))
// {
// 	ball[0].vel.y = -ball[0].vel.y
// }

// if (ball[1].loc.x >= (canvas.width-30) || ball[1].loc.x <= 30)
// {
// 	ball[1].vel.x = -ball[1].vel.x
// } 
// if (ball[1].loc.y <= 30 || ball[1].loc.y >= (canvas.height-30))
// {
// 	ball[1].vel.y = -ball[1].vel.y
// }

// ball[0].loc.x += ball[0].vel.x;
// ball[0].loc.y += ball[0].vel.y;
// ball[1].loc.x += ball[1].vel.x;
// ball[1].loc.y += ball[1].vel.y;