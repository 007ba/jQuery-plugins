module("jCountdown Countdown Plugin");

test("Basic", 2, function() {

	$(document).ready(function(){

		$("#test").countdown({
			date: "june 25, 2011",
			onComplete: function( event ){
			
				$(this).html("Completed");				
				ok( true, "Completed Event Fired" );
				equals( $("#test").html(), "Completed", "returns proper value" );
			}
		});

	});
	
});	



test("Advanced", 11, function() {

	$(document).ready(function(){

		$("#test").countdown({
			date: "june 25, 2011", //Counting TO a date
			onChange: function( event, timer ){
				
				ok( true, "Change Event Fired" );
			},
			onComplete: function( event ){
			
				$(this).html("Completed");				
				ok( true, "Completed Event Fired" );
				equals( $("#test").html(), "Completed", "returns proper value" );
			},
			onPause: function( event ){
				ok( true, "Paused Event Fired" );
			},
			onResume: function( event ){
				ok( true, "Resumed Event Fired" );
			},			
			leadingZero: true
		});
		
		
		$("#test").countdown('pause');
		$("#test").countdown('resume');
		
		
		$("#test").countdown('changeSettings',{
			date : 'june 1, 2011',
			onChange: function( event, timer ){
				
				ok( true, "Change after change" );
			},
			onComplete: function( event ){
			
				$(this).html("Completed");
				ok( true, "Completed Event Fired after change method ran" );
				equals( $("#test").html(), "Completed", "returns proper value after change" );
				
			},
			onPause: function( event ){
				ok( true, "Paused Event Fired after change method ran" );
			},
			onResume: function( event ){
				ok( true, "Resumed Event Fired after change method ran" );
			}
		});
		
		//var events =  jQuery("#test2").data('events.jcountdown');
		//alert( events.change[0] );
		$("#test").countdown('destroy');
		
		var settings =  jQuery("#test").countdown('getSettings');		
		equals( settings, undefined, "Settings were removed" );
		
		var events =  jQuery("#test").data('events.jcountdown');
		
		equals( events, undefined, "Events were removed" );
	});	
});