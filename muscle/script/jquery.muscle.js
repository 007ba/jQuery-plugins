/*! 
* jQuery Muscle v1.0 - Password Strength Plugin
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* MIT Licensed (license.txt).
*/
﻿(function($) {

$.fn.muscle = function( options ) {

	
	var rsame = /^(.)\1+$/;
	var rupper = /[A-Z]/;
	var rlower = /[a-z]/;
	var rdigit = /[0-9]/;
	var rspecial = /[^a-zA-Z0-9]/;
	
	/*
	Very weak < 8
	Weak - Letter onlys,
	Medium - Lower & Upper, Lower & Digit, Upper & Digit 
	Strong - Lower / Upper / Digits
	*/
	
	// Min of 8 characters, min of 1 extra character
	var regex3 = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[!@#$%\^&\*\(\)_\+\=\-\[\]\{\}\.,<>\?\/\\|~`:;"']).*$/;
	//			rmediumstrong: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z]).*$/, //Lower Letters and 1+ number
	
	var password = "Essss$el22211";

	var basic = {
		rvweak: /^.{1,4}$/, //Very weak
		rweak: /^.{5,6}$/, //Weak
		rmedium: /^.{7,8}$/, //Medium
		rstrong: /^.{8,}$/ //Strong		
	};
	
	var defaults = {
			rvweak: /^(.{1,4})$/, //Very weak
			rweak: /^.{5,6}$/, //Weak
			//rvmedium: /^.{7,8}$/, //Medium
			rmedium: /^.{7,8}$/, //Medium
			//rmedium: /^.*(?=.{7,})(?=.*[a-z])(?=.*[A-Z])?.*$/, //Medium
			rstrong: /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%\^&\*\(\)_\+\=\-\[\]\{\}\.,<>\?\/\\|~`:;"']).*$/ //Strong
		};

		/*
		console.log( defaults.rvweak.test( password ) );
		console.log( defaults.rweak.test( password ) );
		console.log( defaults.rmedium.test( password ) );
		console.log( defaults.rstrong.test( password ) );
		*/
				
	return this.each(function() {
		
		var $this = $(this),
			opts = $.extend( {}, defaults, options );
		
		var $meter = opts.meter,
			$length = $meter.find("div");
			
			var $p = $meter.find("p");
		
		
		$this.bind('keyup', function(){

			var val = $this.val();
			
			var same = rsame.test( val ),
				upper = rupper.test( val ),
				lower = rlower.test( val ),
				digit = rdigit.test( val ),
				special = rspecial.test( val ),
				length = ( val.length > 8 ),
				paswordLength = val.length;
			//console.log( length );
			
			if( !val || !paswordLength ) {
				$meter.removeClass("veryweak weak medium strong");
				$length.animate({
					"width" : "0"
				},300, function(){
					$p.html("");
				});
				return;
			}
			//console.log('here');
			if( paswordLength < 4) {
				/*
				$this.css('background-color', '#FFA0A0'); //Very Weak
				$length.css({
					width: "10%"
				});
				*/
				$meter.removeClass("veryweak weak medium strong").addClass("veryweak");
				
				$length.animate({
					"width" : "25%"
				},300, function(){
					$p.html("very weak");
				});
				//$meter.removeClass("veryweak weak medium strong").addClass("veryweak");
				return;		
			}
						
			if( same || paswordLength <= 8 ) {
				$meter.removeClass("veryweak weak medium strong").addClass("weak");
				//$this.css('background-color', '#FFB78C'); //Weak
				
				$length.animate({
					"width" : "50%"
				},300, function(){
					$p.html("weak");
				});
				
				return;	
			}
			
			if( upper && lower && digit && special && length ) {
			
				//$this.css('background-color', '#C3FF88'); //Strong	
				
				$meter.removeClass("veryweak weak medium strong").addClass("strong");
				
				$length.animate({
					"width" : "100%"
				},300, function(){
					$p.html("strong");
				});
				
			} else {
			
				// if( ( upper && digit) || ( lower && digit ) )	
				//$this.css('background-color', '#FFEC8B'); //Medium
				
				$meter.removeClass("veryweak weak medium strong").addClass("medium");
				$length.animate({
					"width" : "75%"
				},300, function(){
					$p.html("medium");
				});
			}
		});
		
	});
	
};
	
})(jQuery);