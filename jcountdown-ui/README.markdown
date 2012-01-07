# jCountdown UI - jQuery Countdown UI Widget


##Version 1.0+

## Options

	date - Default: null
	       (Must be a valid date string or Date object)

	updateTime - Default: 1000
	       (Interval in milliseconds when the Countdown should update the time)

	minus - Default: false
	        (Boolean. Whether the Countdown should have to go into minus figures, especially when counting down to a date)

	onChange - Default: null
	           (Callback function for when the Countdown time updates)

	onComplete - Default: null
	             (Callback function for when the Countdown time updates)

	onPause - Default: null
	          (Callback function for when the Countdown Plugin is paused )

	onResume - Default: null
	           (Callback function for when the Countdown Plugin is resumed from pause)

	leadingZero - Default: false
	              (Boolean. Whether time values should have a leading zero for values < 10. e.g 09)

	offset - Default: null
	         int or float (Offset in hours, can be used for setting countdownui time to match server time)

	servertime - Default: null
			 int or function (servertime in milliseconds, e.g (time() * 1000) in PHP. Or a callback function that sets the time, via an ajax request for example. Used to match countdownui across devices where local time can be different.
	
	direction - Default: "down"
	            Countdown Direction, "down" for down to a date, and up for "up" from a date

	hoursOnly - Default: false
	            (Boolean. If set to true, jCountdown ignores days left and add converts to hours and adds this to the hours left)
				
	minsOnly - Default: false
				(Boolean. If set to true, jCountdown ignores days/hours and add converts to minutes and adds this to the minutes left)
				
	secsOnly - Default: false
	            (Boolean. If set to true, jCountdown ignores days/hours/minutes left and converts to seconds and adds this to seconds left)

	yearsAndMonths - Default: false
	            (Boolean. If set to true, jCountdown counts down the years/months as well)
			
	yearsText -  Default: 'years'
				(String)
				
	monthsText - Default: 'months'
				(String)
	
	daysText - Default: 'days'
				(String)
				
	hoursText - Default 'hours'
				(String)
				
	minutesText - Default 'minutes'
				(String)
				
	secondsText - Default 'seconds'
				(String)
							
## Methods

	changeSettings - Accepts an object map, the same as when first initialising the plugin
	    Example: $("#time").countdownui("changeSettings", options);

	getSettings - Returns setting/settings from countdownui plugin, as well as the timer
	    Example: var currentSettings = $("#time").countdownui("getSettings");
	    Example: var dateSetting = $("#time").countdownui("getSettings", "date");

	resume - Resumes the countdownui, if previously pauses, otherwise this method does nothing
	    Example: $("#time").countdownui("resume");

	pause - Pauses the countdownui, simple as
	    Example: $("#time").countdownui("pause");

	complete - Triggers the complete event and ends the countdownui early. Also removes timer and unbinds any events.
	    Example: $("#time").countdownui("complete");

	destroy - Removes timer and unbinds any events, puts the DOM Element back to its original HTML state
	    Example: $("#time").countdownui("destroy");


	Settings you can access in onChange event through settings object:

	originalHTML (string)
	date (date string)
	hoursOnly (boolean)
	minsOnly (boolean)
	secsOnly (boolean)
	yearsAndMonths (boolean)
	leadingZero (boolean)
	offset (int)
	servertime (function or date object)
	updateTime (int)
	direction (string)
	minus (boolean)
	onChange (function or null)
	onComplete (function or null)
	onResume (function or null)
	onPause (function or null)
	timer (id for Interval)
	prevYears (undefined or int)
	prevMonths (undefined or int)
	prevDays (undefined or int)
	prevHrs (undefined or int)
	prevMins (undefined or int)
	prevSec (undefined or int)
	yearsText (string)
	monthsText (string)
	daysText (string)
	hoursText (string)
	minutesText (string)
	secondsText (string)
	speed (int)
	fx (string)
	hasCompleted (boolean)

## Usage

```javascript

//Simple
$(document.ready(function(){
	$("#time").countdownui({
	    "date" : "july 30, 2011"
	});
});

//Advanced
$(document.ready(function(){

    //Count DOWN to a date, set via ajax
	$("#time2").countdownui({
		date: "december 19, 2012 16:00:00",
		yearsAndMonths: true,
		servertime: function() { 
		    var time = null; 
		    $.ajax({url: 'get_time.php', 
		        async: false, 
				dataType: 'text', 
		        success: function( data, status, xhr ) {  
					time = data; 
		        }, 
				error: function(xhr, status, err) { 
		            time = new Date(); 
					time = time.getTime();
		    	}
			});
		    return time; 
		},
		hoursOnly: false,
		leadingZero: true
	});
	
});

```

## License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2012 [Tom Ellis](http://www.webmuse.co.uk)
