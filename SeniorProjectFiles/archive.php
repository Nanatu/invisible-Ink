<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="../../favicon.ico">

    <title>Invisible Ink - Ephemeral Art Application</title>

    <!-- Bootstrap core CSS -->
    <link href="bootstrap-3.3.7/dist/css/bootstrap.min.css" rel="stylesheet">
	<!-- Bootstrap theme -->
    <link href="bootstrap-3.3.7/dist/css/bootstrap-theme.min.css" rel="stylesheet">
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <link href="bootstrap-3.3.7/dist/css/ie10-viewport-bug-workaround.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <script type="text/javascript" src="mongoose.js"></script>
  
  <body>

    <nav class="navbar navbar-inverse navbar-static-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="index.html">Invisible Ink</a>
        </div>
        <div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Archives <span class="caret"></span></a>
              <ul class="dropdown-menu">
				<li><a href="archive.php?page=1&type=all">All</a></li>
				<li><a href="exampleStory.html">Example</a></li>
                <li><a href="archive.php?page=1&type=poem">Poems & Sonnets</a></li>
                <li><a href="archive.php?page=1&type=flash">Flash Fiction</a></li>
                <li><a href="archive.php?page=1&type=short">Short Stories</a></li>
				<li><a href="archive.php?page=1&type=novel">Novella</a></li>
              </ul>
            </li>
          </ul>
		  <ul class="nav navbar-nav navbar-right">
			<!-- <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li> -->
			<li><a href="#" data-toggle="modal" data-target="#login-modal"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
		  </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
	
	<!-- Code for login form found on Bootsnipp - "Clean Modal Login Form" by Ashbo @ http://bootsnipp.com/snippets/featured/clean-modal-login-form -->
	<div class="modal fade" id="login-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
	  <div class="modal-dialog">
		<div class="loginmodal-container">
		  <h1>Login to your account.</h1><br>
		  <form>
			<input type="text" name="user" placeholder="Email/Username">
			<input type="password" name="pass" placeholder="Password">
			<input type="submit" name="login" class="login loginmodal-submit" value="Login">
		  </form>
		  
		  <div class="login-help">
		    <a href="#">Register</a> - <a href="#">Forgot Password</a>
		  </div>
		</div> 
	  </div>
	</div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <!-- <div class="jumbotron">
      <div class="container">
        <h1>Invisible Ink</h1>
        <p>Basic info about the project including brief description about the application. Include details relevant to the idea of ephemeral art and the objective of the application. Basic info about the project including brief description about the application. Include details relevant to the idea of ephemeral art and the objective of the application.</p>
        <p><a class="btn btn-primary btn-lg" href="about.html" role="button">Learn more &raquo;</a></p>
      </div>
    </div> -->

    <div class="container">
		<!-- Example row of columns -->
		<div class="row">
			<div class="col-sm-1"></div>
			<!-- Basic list of stories in decending order of submission date. -->
			<div class="col-sm-10">
				<?php
				echo "<ul class=\"list-group\">";
					$stories = getStories($_GET["type"]);
					$i = count($stories);
					$max = $i - (10*($_GET["page"] - 1)) - 1;
					$min = $i - (10*($_GET["page"] - 1)) - 10;
					if($min < 0)
						$min = 0;
					
					for($x = $max; $x >= $min; $x--) {
						echo "<li class=\"list-group-item\">";
							echo "<h3>", getTitle($stories[$x]), "</h3>";
							echo "<h4>", getAuthor($stories[$x]), "<small>3/28/2017 10:21AM</small></h4>";
							echo "<ul class=\"list-inline\">";
								echo "<li><a class=\"btn btn-default\" href=\"story.php?ID=", $stories[$x], "\" role=\"button\">View story &raquo;</a></li>";
								echo "<li>", getLikes($stories[$x]), "<span class=\"glyphicon glyphicon-thumbs-up\"></span></li>";
								echo "<li>", getViews($stories[$x]), "<span class=\"glyphicon glyphicon-eye-open\"></span></li>";
							echo "</ul>";
						echo "</li>";					
					}
				echo "</ul>";
				?>
			</div>
			<div class="col-sm-1"></div>
		</div>

		<ul class="pagination">
			<?php
			$stories = getStories($_GET["type"]);
			$pages = ceil(count($stories)/10);
			
			for($i = 1; $i <= $pages; $i++) {
				if($i == $_GET["page"])
					echo "<li class=\"active\"><a href=\"archive.php?page=", $i, "&type=", $_GET["type"], "\">1</a></li>";
				else
					echo "<li><a href=\"archive.php?page=", $i, "&type=", $_GET["type"], "\">1</a></li>";
			}
			?>
		</ul>
		
		<hr>

		<footer>
			<p>MEAN Machine - Spring Semester 2017</p>
		</footer>
    </div> <!-- /container -->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script> -->
    <script src="bootstrap-3.3.7/dist/js/bootstrap.min.js"></script>
  </body>
</html>