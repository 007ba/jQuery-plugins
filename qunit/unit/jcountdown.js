module("jCountdown Countdown Plugin");

test("Basic", 2, function() {

	$(document).ready(function() {
		stop();
		$("#test").countdown({
			date: "june 25, 2011",
			onComplete: function( event ) {
				start();
				$(this).html("Completed");				
				ok( true, "Completed Event Fired" );
				equals( $("#test").html(), "Completed", "returns proper value" );
			}
		});

	});
	
});	



test("Advanced", 17, function() {
	
	var newSettings,
		settings,
		events;
	$(document).ready(function() {

		$("#test").countdown({
			date: "june 25, 2011", //Counting TO a date
			onChange: function( event, timer ) {
				
				ok( true, "Change Event Fired" );
			},
			onComplete: function( event ) {
			
				$(this).html("Completed");				
				ok( true, "Completed Event Fired" );
				equals( $("#test").html(), "Completed", "returns proper value" );
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
			date : 'june 1, 2011',
			onChange: function( event, timer ) {
				
				ok( true, "Change after change" );
			},
			onComplete: function( event ) {
			
				$(this).html("Completed");
				ok( true, "Completed Event Fired after change method ran" );
				equals( $("#test").html(), "Completed", "returns proper value after change" );
				
			},
			onPause: function( event ) {
				ok( true, "Paused Event Fired after change method ran" );
			},
			onResume: function( event ) {
				ok( true, "Resumed Event Fired after change method ran" );
			}
		});
		
		//Check settings were changed
		newSettings =  $("#test").countdown('getSettings');
		equal( newSettings.date, "june 1, 2011", "Settings changed successfully" );
		
		equal( $("#test").countdown('getSettings', 'minus'), false, "Getting settings data" );
		
		$("#test").countdown('destroy');
		
		settings =  $("#test").countdown('getSettings');		
		equals( settings, undefined, "Settings were removed" );
		
		events =  $("#test").data('events.jcdData');
		
		equals( events, undefined, "Events were removed" );
		
		equals( $("#test").html(), "Original Content", "Original content is put back after instance has been destroyed" );
	});	
});