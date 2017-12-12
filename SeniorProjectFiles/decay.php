<?php
// Articles (a, an, the)
// List of Conjunctions found at: http://www.marshall.k12.il.us/data/webcontent/245/file/realname/files/List-of-Conjunctions.pdf
$con = array("a", "an", "the", "and", "or", "but", "nor", "so", "for", "yet", "after", "although", "as", "because", "before", "if", "even", "once", "since", "so", "though", "till", "unless", "until", "what", "when", "whenever", "wherever", "whether", "while", "aint", "arent", "cant", "couldve", "couldnt", "doesnt", "dont", "gonna", "gotta", "hadnt", "hasnt", "havent", "hed", "hes", "howd", "im", "ive", "isnt", "itd", "itll", "its", "lets", "maynt", "mayve", "mightnt", "mustnt", "mustve", "neednt", "oclock", "ol", "oughtnt", "shes", "should've", "shouldnt", "somebodys", "someones", "somethings", "thatll", "thatre", "thats", "thered", "therere", "theres", "thesere", "theyd", "theyll", "theyll", "theyre", "theyve", "thiss", "thosere", "tis", "twas", "twasnt", "wasnt", "wedve", "were", "weve", "werent", "whatd", "whatll", "whatre", "whats", "whatve", "whens", "whered", "wherere", "wheres", "whereve", "whichs", "whod", "whodve", "wholl", "whos", "whove", "whyd", "whyre", "whys", "wont", "wouldve", "wouldnt", "yall", "youd", "youll", "youre", "youve");

// List of influences for P-Nouns, Nouns, Verbs, Adj, Adv, and Other
$influ = array(10000, 5000, 3000, 1000, 1000, 100);

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

$storyID = $_GET["ID"];
				
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "invisibleink";
					
// Create connection
$conn1 = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn1->connect_error) {
	die("Connection failed: " . $conn1->connect_error);
} 

$sql = "SELECT body, tick_rate, influence_rate, next_event, cycles, likes, views FROM stories WHERE id = $storyID";
 
$curTime = getDate();	// Current time of the system, NON database value

$stories = $conn1->query($sql);
				
$row = $stories->fetch_assoc();

// DATABASE FETCH
$nextEvent = $row["next_event"];			// nextEvent

if(curTime >= nextEvent) {
	// DATABASE FETCH
	$story = $row["body"]; 					// story 
	$views = $row["views"];					// views
	$cycle = $row["cycles"];				// cycle
	$likes = $row["likes"];					// likes
	$tickRate = $row["tick_rate"];         // minorTick
	
	$cycle++;

	// Block to determine a word at a random position in the current string.
	$storyLen = strlen($story);
	$startPos = 0;
	
	do { $startPos = rand(0, $storyLen) } while(strcmp(substr($story, $startPos, 1), " "))
	while(strcmp(substr($story, $startPos, 1), " ") && $startPos != 0) { $startPos--; }

	$endPos = $startPos;
	while(!strcmp(substr($story, $endPos, 1), " ")) { $endPos++; }
	
	$word = substr($story, $startPos, $endPos-$startPos);

	$word = preg_replace('/[^A-Za-z0-9\-]/', '', $word); // Removes special chars.
	
	$inf = 0;
	
	// Block to determine word influence.
	$i = 0;
	// Loop to detemine if article or conjunction.
	do {
		if(strcmp($word, $con[$i])) {
			$inf = $influ[5];
			$i = count($con);
		}
		else
			$i++;
	} while($i < count($con))	
	// Block to determine if noun, verb, adj, or adv using WordNet API.
	if($inf == 0) {
		// Create connection
		$conn2 = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn1->connect_error) {
			die("Connection failed: " . $conn2->connect_error);
		} 

		$sqlWords = "SELECT nouns, verbs, adjectives, adverbs FROM words WHERE nouns = $word OR verbs = $word OR adjectives = $word OR adverb = $word";
		
		$thatWord = $conn2->query($sqlWords);
		
		$selection = $thatWord->fetch_assoc()
		if(strcmp($selection[""], $word)) { $inf = $influ[4]; }
		else if(strcmp($selection[""], $word)) { $inf = $influ[3]; }
		else if(strcmp($selection[""], $word)) { $inf = $influ[2]; }
		else if(strcmp($selection[""], $word)) { $inf = $influ[1]; }
	}
	// Final case if proper noun or numerical.
	if(influence == 0) {
		$inf = $influ[0];
	}
			
	// Decay algorithm; calculate decay for the word and then compares it to a random number that is generated.	Decays if less than random generated.
	$decay = $likes/$views * ($inf/(pow(2, $cycle/10)))/100;
	
	// Decay happens to word if decay value is less than the random number range [0.0, 1.0)
	
	// End calculations to determine clock ticks and rate decreases.
	if($cycle%10 == 0) {
		$nextMajor = $nextEvent + $majorTick/$tickRate	// Update the time of the next major clock tick. 
		$majorTick = $nextMajor - $curTime;				// Update length of the major tick.
		$minorTick = $majorTick/10;						// Update the length of each minor tick.
	}
	
	$nextEvent = $nextEvent + $minorTick;				// Update the time of the next event.
	
	// DATABASE UPDATE
	// Update cycle
	// Update next_event
	// Update story_body
	// Update minor_tick_rate
}
?>