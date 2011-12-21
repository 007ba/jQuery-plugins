module("jCountdown Countdown Plugin");

test("Basic", 2, function() {

	$(document).ready(function() {
		$("#test").countdown({
			date: "june 25, 2011",
			onComplete: function( event ) {
				$(this).html("Completed");				
				ok( true, "Completed Event Fired" );
				equals( $("#test").html(), "Completed", "returns proper value" );
			}
		});

	});
	
});

test("Advanced", 11, function() {
	
	var newSettings,
		settings,
		events,
		temp = new Date(),
		futureDate,
		pastDate;
	
	//1 sec into future
	futureDate = new Date( temp.getTime() + ( 1000 ) );

	//1 day in the past
	pastDate = new Date( temp.getTime() - ( 3600 * 24  * 1000 ) );
	
	
	$(document).ready(function() {
		
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
			leadingZero: true
		});
		
		
		$("#test").countdown('pause').countdown('resume');
		
		$("#test").countdown('changeSettings',{
			date : futureDate,
			onComplete: function( event ) {
				$(this).html("Completed");
				ok( true, "Completed Event Fired after changeSettings method ran" );
				equals( $("#test").html(), "Completed", "returns proper value after change" );
				
			},
			onChange : null,
			onPause : null,
			onResume : null
		});
		
		newSettings =  $("#test").countdown('getSettings');
		
		equal( newSettings.date, futureDate, "Settings changed successfully" );
		
		equal( $("#test").countdown('getSettings', 'minus'), false, "Getting settings data" );
		
		equal( $("#test").countdown('getSettings', 'nonExistent'), undefined, "Check for non existent data" );
		
		$("#test").countdown('destroy');
		
		settings =  $("#test").countdown('getSettings');
				
		equals( settings, undefined, "Settings were removed" );
		
		events =  $("#test").data('events.jcdData');
		
		equals( events, undefined, "Events were removed" );
		
		equals( $("#test").html(), "Original Content", "Original content is put back after instance has been destroyed" );
	});	
});