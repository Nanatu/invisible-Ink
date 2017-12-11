var initTime = Date.now();

var curTime;
var nextMajor;
var nextMinor;

var majorTick;
var minorTick;

var curEvent;


var tickRate = 2;

var 

cycle++;

// MEAT AND POTATOES OF CODE

if(cycle%10 == 0) {
	nextMajor = curTime + majorTick/tickRate;	// Update the time of the next major clock tick.
	majorTick = nextMajor - curTime;			// Update length of the major tick.
	minorTick = majorTick/10;					// Update the length of each minor tick.
	nextEvent = curTime + minorTick; 			// Update the time of the next event.
}
else {
	nextEvent = curEvent + minorTick;			// Update the time of the next event.
}

