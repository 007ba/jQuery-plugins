module("jCountdown Countdown Plugin");

var temp,
	pastDate,
	futureDate,
	future60Date,
	newSettings,
	settings,
	events;
	
asyncTest("Events Fire", 4, function() {
	
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ); //1 day in the past
	futureDate = new Date( temp.getTime() + ( 1000 ) );
	
	$("#test").countdown({
		date: pastDate,
		onChange: function( event, timer ) {
			ok( true, "Change Event Fired" );
		},
		onPause: function( event ) {
			ok( true, "Paused Event Fired" );
		},
		onResume: function( event ) {
			ok( true, "Resumed Event Fired" );
		},	
		onComplete: function() {
			ok( true, "Complete Event Fired" );
			start();
		},
		leadingZero: true
	}).countdown('pause').countdown('resume');
	
});


asyncTest("Change Settings", 3, function() {
	
	$("#test").countdown('destroy');
	
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) ); //1 day in the past
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	$("#test").countdown({
		date: futureDate
	});

	$("#test").countdown('changeSettings',{
		date : futureDate,
		onComplete: function( event ) {
			$(this).html("Completed");
			ok( true, "Completed Event Fired after changeSettings method ran" );
			equals( $("#test").html(), "Completed", "returns proper value after change" );
			start();
		}
	});
	
	newSettings =  $("#test").countdown('getSettings');
	equal( newSettings.date, futureDate, "Settings changed successfully" );

});


test("Destroy Instance", 3, function() {

	temp = new Date();
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	$("#test").countdown({
		date: futureDate
	}).countdown('destroy');


	settings =  $("#test").countdown('getSettings');
			
	equals( settings, undefined, "Settings were removed" );
	
	events =  $("#test").data('events.jcdData');
	
	equals( events, undefined, "Events were removed" );
	
	equals( $("#test").html(), "Original Content", "Original content is put back after instance has been destroyed" );
	
	
});


asyncTest("Advanced Options - secOnly", 1, function() {
	
	temp = new Date();
	//1 sec into future
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	//1 day in the past
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) );
	
	future60Date = new Date( temp.getTime() + ( 60000 ) );
	
	$("#test").countdown({
		date: future60Date,
		secsOnly: true,
		onChange: function( e,settings ) {
			equals( settings.secLeft, 60, "Returns correct number of seconds when secsOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});

	
});

asyncTest("Advanced Options - minsOnly", 1, function() {
	temp = new Date();
	future60Date = new Date( temp.getTime() + ( 60000 * 2 ) ); //60 secs * 2 minutes
	
	$("#test").countdown({
		date: future60Date,
		minsOnly: true,
		onChange: function( e,settings ) {
			equals( settings.minsLeft, 2, "Returns correct number of minutes when minsOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});	
		
});

asyncTest("Advanced Options - hoursOnly", 1, function() {

	temp = new Date();
	future60Date = new Date( temp.getTime() + ( 3600 * 24  * 2000 ) ); //1 hour * 24 hours * 2 days
	
	$("#test").countdown({
		date: future60Date,
		hoursOnly: true,
		onChange: function( e,settings ) {
			equals( settings.hrsLeft, 48, "Returns correct number of hours when hoursOnly option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});	
		
});

	
asyncTest("Advanced Options - yearsAndMonths: Future Date", 2, function() {
	
	temp = new Date();
	//1 hour * 24 hours * 364 days * 2 years + 32 days
	future60Date = new Date( temp.getTime() + ( ( 86400 * 365000 * 2 ) + ( 86400 * 32000 ) ) );
	
	//console.log( future60Date );
	
	$("#test").countdown({
		date: future60Date,
		yearsAndMonths: true,
		onChange: function( e,settings ) {
			equals( settings.yearsLeft, 2, "Returns correct number of years when yearsAndMonths option is used" );
			equals( settings.monthsLeft, 1, "Returns correct number of months when yearsAndMonths option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});
		
});

asyncTest("Advanced Options - yearsAndMonths : Past Date", 2, function() {
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 2629743.83 * 11000 ) ); //11 months ago
	
	//pastDate.setTime( 126192080000 );
	//126192080000
	
	//console.log( future60Date );
	
	$("#test").countdown({
		date: pastDate,
		direction: "up",
		yearsAndMonths: true,
		onChange: function( e,settings ) {
			equals( settings.yearsLeft, 0, "Returns correct number of years when yearsAndMonths option is used" );
			equals( settings.monthsLeft, 10, "Returns correct number of months when yearsAndMonths option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});
		
});

/*
asyncTest("Advanced Options - yearsAndMonths : Past Date", 2, function() {
	
	temp = new Date();
	pastDate = new Date( temp.getTime() - ( 2629743.83 * 11000 ) ); //11 months ago
	
	//pastDate.setTime( 126192080000 );
	//126192080000
	
	//console.log( future60Date );
	
	$("#test").countdown({
		date: pastDate,
		direction: "up",
		yearsAndMonths: true,
		onChange: function( e,settings ) {
			equals( settings.yearsLeft, 0, "Returns correct number of years when yearsAndMonths option is used" );
			equals( settings.monthsLeft, 10, "Returns correct number of months when yearsAndMonths option is used" );
			$("#test").countdown('destroy');
			start();
		}
	});
		
});
*/