Ball Collision Physics in Canvas
================================

A simple implementation of a 2D ball physics simulation using canvas and [Victor](http://victorjs.org/)

Method
------
Collision detection between balls is accomplished by calculating the distance between the centers of the balls. When the distance drops below r1 + r2, where r1 and r2 are the radii of each ball.
The collision physics itself was done using vector algebra. As an outline of the process, first note that when the balls touch you can define a line tangent to each ball. Using this as a normal, you can split up the initial momentum of each ball into two components: momentum aligned with the normal, and momentum perpendicular to the tangent line. By considering what would happen if one ball had no initial velocity, we can ascertain that the momentum aligned with the normal will be transfered to the other ball, while the perpendicular momentum must necessarily be retained by the initial ball.

To Do
-----
Put up a graphic describing the mathematics.