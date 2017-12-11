<?php
/*function POST($index, $default=NULL){
	if(isset($_POST[$index])) {
		if(!empty(trim($_POST[$index])))    
			return $_POST[$index];
	}
	return $default;
}*/

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "invisibleink";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
} 

$title = mysqli_real_escape_string($conn, $_POST['title']);
$author = mysqli_real_escape_string($conn, $_POST['author']);
$storyBody = mysqli_real_escape_string($conn, $_POST['storyBody']);

$type = $_POST['type'];
$decay = $_POST['decay'];
$influ = $_POST['influ'];
$initCycle = $_POST['cycleRate'];

//Calculates the first minor tick based on the initial cycle rate and current time
$nextEvent = time() + ($initCycle * (60*60))/10;

$cycles = 0;
$likes = 1;
$views = 1;

$sql = "INSERT INTO `stories` (`title`, `author`, `body`, `story_type`, `tick_rate`, `influence_rate`, `next_event`, `cycles`, `likes`, `views`) VALUES ('$title', '$author', '$storyBody', '$type', $decay, $influ, $nextEvent, $cycles, $likes, $views)";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>