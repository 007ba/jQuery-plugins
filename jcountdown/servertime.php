<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Date Countdown jQuery Plugin</title>
<script src="script/jquery-1.6.1.js" type="text/javascript"></script>
<script src="script/jquery.jcountdown.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<script type="text/javascript">
$(document).ready(function() {		
	<?php

	/*
	Pass either of these to the plugin:
	
	$test = (time() * 1000 ) + date("s");
	$test2 = (time() * 1000 );

	jCountdown compares the local date/time with the server date/time to match the 
	countdown across different devices where the local time may not be the same
	
	*/

	$test = (time() * 1000 );

	?>	
	$("#time").countdown({
		//updateTime : 800,
		date: "december 30, 2011",
		servertime: <?php echo $test;?>,
		hoursOnly: false,
		onComplete: function( event ) {
		
			$(this).html("Completed");
		},
		onPause: function( event, timer ) {

			$(this).html("Pause");
		},
		onResume: function( event ){
		
			$(this).html("Resumed");
		},
		leadingZero: true
	});
	
	
	//$("#time2").countdown('pause');
	
	//$("#time2").countdown('resume');

});
</script>
</head>
<body>
	<div id="container">
		<h1>Date Countdown jQuery Plugin</h1><br />
		<p id="time" class="time"></p>
	</div>
</body>
</html>

