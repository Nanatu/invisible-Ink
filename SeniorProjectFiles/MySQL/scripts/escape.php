<?php

$host = "localhost";
$username = "root";
$password = "";
$dbname = "invisibleink";


$conn=mysqli_connect($host,$username,$password,$dbname);

// Check connection
if (mysqli_connect_errno()) {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

// escape variables for security
// the POST is getting the actual values, im not sure exactly how you're grabbing these values.
$title = mysqli_real_escape_string($conn, $_POST['firstname']);
$author = mysqli_real_escape_string($conn, $_POST['lastname']);
$body = mysqli_real_escape_string($conn, $_POST['age']);

$query="INSERT INTO Persons (FirstName, LastName, Age)
VALUES ('$firstname', '$lastname', '$age')";

//You may have to remove id if auto increment works right.
$query="INSERT INTO `stories` (`id`, `title`, `author`, `body`, `story_type`, `date_created`, `tick_rate`, `influence_rate`, `next_event`, `cycles`, `likes`, `views`) VALUES
(1, '$title', '$author', '$body', 'Poems & Sonnets', '2017-12-07 03:11:25', '0.25', '0.25', 1, 1, 1, 1)"

if (!mysqli_query($conn,$query)) {
  die('Error: ' . mysqli_error($conn));
}
echo "Story Successfully Uploaded!";

mysqli_close($conn);
?>