// Articles (a, an, the)
// List of Conjunctions found at: http://www.marshall.k12.il.us/data/webcontent/245/file/realname/files/List-of-Conjunctions.pdf
var con = ["a", "an", "the", "and", "or", "but", "nor", "so", "for", "yet", "after", "although", "as", "because", "before", "if", "even", "once", "since", "so", "though", "till", "unless", "until", "what", "when", "whenever", "wherever", "whether", "while"];

// List of influences for P-Nouns, Nouns, Verbs, Adj, Adv, and Other
var influ = [10000, 5000, 3000, 1000, 1000, 100];

/* NOTES
 * For variables and equations,
 * 		For math f[x] denotes "f subscript x" while f(x) denotes "f of x".
 *		Clock ticks (k) are calculated while cycles (c) are just increments for counting.
 *		Number of cycles every tick calculate should be ten times the number of clock ticks.
 */


/* VARIABLES
 * W, w[x] = story, word at space x.
 * k = clock tick; "epoch".
 * m[0], m[c] = initial minor tick, minor tick at cycle c.
 * t, t[k] = current time, time at clock tick k; assume t[0] is 0.
 * n[t], n[0] = current number of words, initial number of words.
 * v = views, constatnt increasing from 1.
 * r[i], r[k] = rate at which influence decays, rate at which clock tick decays.
 * i[t] = influence of the word at time t.
 * c = cycles, number of decay cycles the system has gone through.
 */
 
/* EQUATIONS
 * DECAY CHANCE => D(t[k]) = 1/v * i(t[k])/100 
 * 		Inverse of the views times the percent influence remaining, which is exponential.
 * INFLUENCE SIMPLE => i(t[k]) = i[0]/(2^c)
 *		Influence is halved at each clock tick.
 * CALCULATE NEXT CLOCK TICK => t[k+1] = t[k]/(r[k]^c)
 * 		Next clock tick is simply exponential, depending on the variable the user set beforehand.
 * CALCULATE NEXT MINOR TICK => m[c] = ((c mod 10) + 1) * m[0] where m[0] = (t[k+1] - t[k])/10
 * 		Since the number of minor ticks are ten per major clock tick, the initial tick should be 1/10 the way through with each one after being additive.
 */

var curTime = Date.now();	// Current

// STORY DATABASE ACCESS FOR FOLLOWING VARS
var nextEvent;				// nextEvent

if(curTime >= nextEvent) {
	var story; 				// story
	var views;				// views
	var cycle;				// cycle
	
	cycle++;

	
	// Block to determine a word at a random position in the current string.
	var storyLen = story.length();
	var startPos;
	
	do { startPos = Math.floor(Math.random() * storyLen); } while(story.charAt(startPos) == ' ')
	while(story.charAt(startPos) != ' ' && startPos != 0) { startPos--; }

	var endPos = story.indexOf(" ", startPos);
	endPos--;
	var word = story.substring(startPos, endPos);
	
	word = word.replace(/[^a-zA-Z0-9]/g, '');
	
	var inf;
	
	// Block to determine word influence.
	var i = 0;
	// Loop to detemine if article or conjunction.
	do {
		if(word == con[i]) {
			inf = influ[5];
			i = con.length();
		}
		else
			i++;
	} while(i < con.length())	
	// Block to determine if noun, verb, adj, or adv using WordNet API.
	if(inf == NULL) {
		// Database check to determine POS of word.
		/* DATABASE ACCESS */
	}
	// Final case if proper noun or numerical.
	if(influence == NULL) {
		inf = influ[0];
	}
			
	// Decay algorithm; calculate decay for the word and then compares it to a random number that is generated.	Decays if less than random generated.
	var decay = 1/views * (inf/(Math.pow(2, cycle/10)))/100;

	// End calculations to determine clock ticks and rate decreases.
	if(cycle%10 == 0) {
		//nextMajor = curTime + majorTick/tickRate;	// Update the time of the next major clock tick.
		nextMajor = nextEvent + majorTick/tickRate	// Update the time of the next major clock tick. 
		majorTick = nextMajor - curTime;			// Update length of the major tick.
		minorTick = majorTick/10;					// Update the length of each minor tick.
	}
	
	nextEvent = nextEvent + minorTick;				// Update the time of the next event.
}




