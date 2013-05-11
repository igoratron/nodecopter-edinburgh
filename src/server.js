var //http = require('http'),
	arDrone =  require("ar-drone"),
	client = arDrone.createClient();

//x:0,y:0 is bottom left, x:800,y:600 is top right
//x:400,y:0 is drone start 
var zeroBoundary = 2;
var pixelsPerSecondVertical = 100;
var pixelsPerSecondHorizontal = 250;
var flying = false;

var currentPosPx = {x:400,y:0};
var example = [{x:400,y:200},{x:200,y:200},{x:200,y:0},{x:400,y:0}];
var target = example.shift();

var calculateTargetDiff = function() {
	return {
		x: currentPosPx.x - target.x,
		y: currentPosPx.y - target.y
	};
};

var updateTarget = function() {
	client.stop();
	
	target = example.shift();			
	if (!target) {
		client.land();
		flying = false;
		return false;
	}
	
	flying = false;
	setTimeout(function() {
		flying = true;
	}, 1000);
	
	return true;
};

client.takeoff();

client
	.after(5000, function() {
		console.log('flying');
		flying = true;
	})
	.after(60000, function() {
		client.stop();
		client.land();
		flying = false;
	});
	
var vertSpeed = 0,
	horiSpeed = 0,
	prevTime = Number(new Date());
	
setInterval(function() {
	if (!flying || !target)
		return;
	
	var newTime = Number(new Date()),
		timeDiff = newTime - prevTime,
		vertDiff = timeDiff/1000 * pixelsPerSecondVertical,
		horzDiff = timeDiff/1000 * pixelsPerSecondHorizontal;
	prevTime = newTime;
	
	if (horiSpeed > 0) {
		currentPosPx.x = currentPosPx.x + horzDiff;
	} else if (horiSpeed < 0) {
		currentPosPx.x = currentPosPx.x - horzDiff;
	}
	
	if (vertSpeed > 0) {
		currentPosPx.y = currentPosPx.y + vertDiff;
	} else if (vertSpeed < 0) {
		currentPosPx.y = currentPosPx.y - vertDiff;
	}
		
	var diff = calculateTargetDiff();
	console.log(diff);
	
	if (diff.y < 0) {
		if (diff.y > -zeroBoundary)
		{
			vertSpeed = 0;
		}
		else 
		{
			vertSpeed = 0.3;
		}
	}
	else if (diff.y > 0) {
		if (diff.y < zeroBoundary)
		{
			vertSpeed = 0;
		}
		else 
		{
			vertSpeed = -0.3;
		}
	}
	
	if (diff.x < 0) {
		if (diff.x > -zeroBoundary)
		{
			horiSpeed = 0;
		}
		else 
		{
			horiSpeed = 0.3;
		}
	}
	else if (diff.x > 0) {
		if (diff.x < zeroBoundary)
		{
			horiSpeed = 0;
		}
		else 
		{
			horiSpeed = -0.3;
		}
	}
	
	if (vertSpeed == 0 && horiSpeed == 0)
	{
		console.log('point reached');
		updateTarget();
	} else {
		client.up(vertSpeed);
		client.right(horiSpeed);
	}
},20);