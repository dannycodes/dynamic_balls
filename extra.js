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