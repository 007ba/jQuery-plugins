/* 
* jCountdown 1.3 jQuery Plugin
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* Licensed under MIT License
* See http://www.webmuse.co.uk/license/
*/
(function($) {

	$.fn.countdown = function( method, options ) {  
	
		var defaults = {
				date: new Date(),
				updateTime: 1000,
				htmlTemplate: "%{d} <span class=\"cd-time\">days</span> %{h} <span class=\"cd-time\">hours</span> %{m} <span class=\"cd-time\">mins</span> %{s} <span class=\"cd-time\">sec</span>",
				minus: false,
				onChange: null,
				onComplete: null,
				onResume: null,
				onPause: null,
				leadingZero: false,
				offset: null,
				direction: 'down'
			},
			slice = [].slice,
			floor = Math.floor,
			msPerHour = 36E5,
			msPerDay = 864E5,
			opts = {},
			rDate = /(%\{d\}|%\{h\}|%\{m\}|%\{s\})/g,
			rDays = /%\{d\}/,
			rHours = /%\{h\}/,
			rMins = /%\{m\}/,
			rSecs = /%\{s\}/,
			complete = false,
			template,
			onChange = null,
			onComplete = null,
			onPause = null,
			timerFunc = function() {

				var $this = this,
					template,
					TodaysDate,
					CountdownDate,
					timeLeft,
					e_daysLeft,
					daysLeft,
					e_hrsLeft,
					hrsLeft,
					minsLeft,					
					e_minsleft,
					secLeft,
					time = "",
					settings = $this.data('jcdSettings' );
					
				if( !settings ) {
					return;
				}
				
				template = settings.htmlTemplate;
				
				TodaysDate = ( settings.offset == null ) ? new Date() : getTimezoneDate( settings.offset );
					
				CountdownDate = new Date( settings.date );
				
				timeLeft = ( settings.direction == 'down' ) ? CountdownDate.getTime() - TodaysDate.getTime() :
					TodaysDate.getTime() - CountdownDate.getTime();
					
				e_daysLeft = timeLeft / msPerDay;
				daysLeft = floor( e_daysLeft );
				e_hrsLeft = ( e_daysLeft - daysLeft ) * 24;
				hrsLeft = floor( e_hrsLeft );
				minsLeft = floor( ( e_hrsLeft - hrsLeft ) * 60 );				
				e_minsleft = ( e_hrsLeft - hrsLeft ) * 60;
				secLeft = floor( (e_minsleft - minsLeft ) * 60 );
				
				if ( settings.leadingZero ) {
				
					if ( daysLeft < 10 ) {
						daysLeft = "0" + daysLeft;
					}
					
					if ( hrsLeft < 10 ) {
						hrsLeft = "0" + hrsLeft;
					}
					
					if ( minsLeft < 10 ) {
						minsLeft = "0" + minsLeft;
					}
					
					if ( secLeft < 10 ) {
						secLeft = "0" + secLeft;
					}
				}

				if ( settings.direction === 'down' && ( TodaysDate <= CountdownDate || settings.minus ) ) {
					time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
				} else if ( opts.direction === 'up' && ( CountdownDate <= TodaysDate || opts.minus ) ) {
					time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
				} else {
					time = template.replace( rDate, "00");
					settings.complete = true;
				}
								
				$this.html( time );
				
				$this.trigger('change', [settings.timer] );
				
				if ( settings.complete ){

					$this.trigger('complete.jcountdown');
					clearInterval( settings.timer );
				}       		
			},
			getTimezoneDate2 = function( offset ) {
			
				var daysOffset = offset.days || 0,
					hoursOffset = offset.hours || 0,
					minutesOffset = offset.minutes || 0,
					secondsOffset = offset.seconds || 0,
					utcString = (new Date()).toUTCString();
												
				hoursOffset = hoursOffset * msPerHour;
				
				var utc = new Date().toUTCString(),
					tempDate = new Date( utc ); 

				dateMS = tempDate.setTime( tempDate.getTime() + hoursOffset);
				
				var newDate = new Date( dateMS );
				newDate.setMinutes( (new Date () ).getMinutes() + minutesOffset);
				newDate.setSeconds( (new Date() ).getSeconds() + secondsOffset);
				newDate.setMilliseconds( (new Date() ).getMilliseconds() );
				
				return newDate;

			},
			getTimezoneDate = function( offset ) {
			
				var hoursOffset = offset || 0,
					currentHours = 0,
					newDate = null,
					tempDate = new Date();
				
				hoursOffset = hoursOffset * msPerHour;
				
				currentHours = tempDate.getTime() - ( ( -tempDate.getTimezoneOffset() / 60 ) * msPerHour );

				dateMS = tempDate.setTime( currentHours + hoursOffset );
				
				newDate = new Date( dateMS );
				newDate.setMilliseconds( (new Date() ).getMilliseconds() );
				
				return newDate;
			},			
			methods = {
			
				init: function( options ){
					$.extend( opts, defaults, options );
					
					template = opts.htmlTemplate;
					
					return this.each(function() {
						var $this = $(this),
							settings = {},
							TodaysDate = ( opts.offset == null ) ? new Date() : getTimezoneDate( opts.offset ),
							CountdownDate = new Date( opts.date ),
							timeLeft = ( opts.direction == 'down' ) ? CountdownDate.getTime() - TodaysDate.getTime() :
								TodaysDate.getTime() - CountdownDate.getTime(),
							e_daysLeft = timeLeft / msPerDay,
							daysLeft = floor(e_daysLeft),
							e_hrsLeft = (e_daysLeft - daysLeft) * 24, //Gets remainder and * 24
							hrsLeft = floor(e_hrsLeft),
							minsLeft = floor((e_hrsLeft - hrsLeft)*60),					
							e_minsleft = (e_hrsLeft - hrsLeft)*60, //Gets remainder and * 60
							secLeft = floor((e_minsleft - minsLeft)*60),
							time = "";

						if( opts.onChange ){
							$this.bind("change.jcountdown", opts.onChange );
						}
						
						if( opts.onComplete ){
							$this.bind("complete.jcountdown", opts.onComplete );
						}
						
						if( opts.onPause ){
							$this.bind("pause.jcountdown", opts.onPause );
						}

						if( opts.onResume ){
							$this.bind("resume.jcountdown", opts.onResume );
						}
						
						if ( opts.leadingZero ) {
						
							if ( daysLeft < 10 ) {
								daysLeft = "0" + daysLeft;
							}
							
							if ( hrsLeft < 10 ) {
								hrsLeft = "0" + hrsLeft;
							}
							
							if ( minsLeft < 10 ) {
								minsLeft = "0" + minsLeft;
							}
							
							if ( secLeft < 10 ) {
								secLeft = "0" + secLeft;
							}
						}
			
						//Set initial time
						if ( opts.direction === 'down' && ( TodaysDate <= CountdownDate || opts.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else if ( opts.direction === 'up' && ( CountdownDate <= TodaysDate || opts.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else {
							time = template.replace( rDate, "00");
							complete = true;
						}

						//Store settings so they can be accessed later
						
						settings.date = opts.date;
						//settings.countdownDate = CountdownDate;
						settings.leadingZero = opts.leadingZero;
						settings.updateTime = opts.updateTime;
						settings.direction = opts.direction;
						settings.template = opts.htmlTemplate;
						settings.htmlTemplate = opts.htmlTemplate;
						settings.minus = opts.minus;
						settings.complete = complete;
						settings.offset = opts.offset;
						settings.onChange = opts.onChange;
						settings.onComplete = opts.onComplete;
						settings.onResume = opts.onResume;
						settings.onPause = opts.onPause;
						
						if( !complete ) {
						
							var func = $.proxy( timerFunc, $this );
							settings.timer = window.setInterval( func, settings.updateTime );
						}
						
						$this.data( 'jcdSettings', settings );
						
						$this.html( time );
						
						if ( settings.complete ) {
						
							$this.trigger('complete.jcountdown');
							clearInterval( settings.timer );
						}
						
					});				
				
				},
				changeSettings: function( options ) {
				
					/*
					
					Like resume but with resetting/changing options
					
					*/
					
					return this.each(function() {
						var $this  = $(this),
							settings,
							template,
							TodaysDate,
							CountdownDate,
							timeLeft,
							e_daysLeft,
							daysLeft,
							e_hrsLeft,
							hrsLeft,
							minsLeft,					
							e_minsleft,
							secLeft,
							time = "";
						if( !$this.data('jcdSettings') ) {
							return true;
						}
						
						settings = $.extend( {}, $this.data('jcdSettings'), options );

						if( !settings ){
							return true;
						}
						
						template = settings.htmlTemplate;

						TodaysDate = ( settings.offset == null ) ? new Date() : getTimezoneDate( settings.offset );
						CountdownDate = new Date( opts.date );						
						timeLeft = ( settings.direction == 'down' ) ? CountdownDate.getTime() - TodaysDate.getTime() :
							TodaysDate.getTime() - CountdownDate.getTime();
						e_daysLeft = timeLeft / msPerDay;
						daysLeft = floor( e_daysLeft );
						e_hrsLeft = ( e_daysLeft - daysLeft ) * 24; //Gets remainder and * 24
						hrsLeft = floor( e_hrsLeft );
						minsLeft = floor( ( e_hrsLeft - hrsLeft ) * 60 );					
						e_minsleft = ( e_hrsLeft - hrsLeft ) * 60; //Gets remainder and * 60
						secLeft = floor( ( e_minsleft - minsLeft ) * 60);
						
						$this.unbind('.jcountdown');
						
						
						clearInterval( settings.timer );
						
						if( settings.onChange ) {
							$this.bind('change.jcountdown', settings.onChange);
						}

						if( settings.onComplete ) {
							$this.bind('complete.jcountdown', settings.onComplete);
						}
						
						if( settings.onPause ){
							$this.bind("pause.jcountdown", settings.onPause );
						}

						if( settings.onResume ){
							$this.bind("resume.jcountdown", settings.onResume );
						}
						
						if ( settings.direction === 'down' && ( TodaysDate <= CountdownDate || settings.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else if ( opts.direction === 'up' && ( CountdownDate <= TodaysDate || opts.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else {
							time = template.replace( rDate, "00");
							settings.complete = true;
						}

						var func = $.proxy( timerFunc, $this );

						settings.timer =  window.setInterval(func, settings.updateTime);
						
						$this.data('jcdSettings', settings);
						
						if ( settings.complete ) {
						
							$this.trigger('complete.jcountdown');
							clearInterval( settings.timer );
						}
														
					});				
				
				},
				resume: function( options ) {
				
					return this.each(function() {
						var $this = $(this),
							settings,
							template,
							TodaysDate,
							CountdownDate,
							timeLeft,
							e_daysLeft,
							daysLeft,
							e_hrsLeft,
							hrsLeft,
							minsLeft,					
							e_minsleft,
							secLeft,
							time = "";
							
						settings = $this.data('jcdSettings');
						
						if( !settings ){
							return true;
						}
						
						var func = $.proxy( timerFunc, $this );
						
						template = settings.htmlTemplate;

						TodaysDate = ( settings.offset == null ) ? new Date() : getTimezoneDate( settings.offset );
						CountdownDate = new Date( opts.date );						
						timeLeft = ( settings.direction == 'down' ) ? CountdownDate.getTime() - TodaysDate.getTime() :
							TodaysDate.getTime() - CountdownDate.getTime();
						e_daysLeft = timeLeft / msPerDay;
						daysLeft = floor( e_daysLeft );
						e_hrsLeft = ( e_daysLeft - daysLeft ) * 24;
						hrsLeft = floor( e_hrsLeft );
						minsLeft = floor( ( e_hrsLeft - hrsLeft ) * 60 );					
						e_minsleft = ( e_hrsLeft - hrsLeft ) * 60;
						secLeft = floor( ( e_minsleft - minsLeft ) * 60 );

						if ( settings.direction === 'down' && ( TodaysDate <= CountdownDate || settings.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else if ( opts.direction === 'up' && ( CountdownDate <= TodaysDate || opts.minus ) ) {
							time = template.replace( rDays, daysLeft ).replace( rHours, hrsLeft ).replace( rMins, minsLeft ).replace( rSecs, secLeft );
						} else {
							time = template.replace( rDate, "00");
							settings.complete = true;
						}
						
						settings.timer =  window.setInterval( func, settings.updateTime );
						
						$this.data('jcdSettings', settings);
						
						$this.trigger('resume.jcountdown');
						
						$this.html( time ).trigger('change.jcountdown');
						
						if ( settings.complete ) {
						
							$this.trigger('complete.jcountdown');
							clearInterval( settings.timer );
						}
						
					});
				
				},
				pause: function( options ) {
				
					return this.each(function() {
						var $this  = $(this),
							settings = $.data( $this[0], 'jcdSettings' );

						if( !settings ){
							return true;
						}
						
						$this.trigger('pause.jcountdown');
						
						clearInterval( settings.timer );
					});
				
				},
				complete: function( options ) {

					return this.each(function() {
						var $this  = $(this),
							settings = $this.data('jcdSettings' );

						if( !settings ){
							return true;
						}						
						
						clearInterval( settings.timer );
						settings.complete = true;
						
						$this.data('jcdSettings', settings );						
						$this.trigger('complete.jcountdown');
					});				
				
				},
				destroy: function(){
				
					return this.each(function() {
						var $this  = $(this),
							settings;
						
						settings = $this.data( 'jcdSettings' );
						
						if( !settings ){
							return true;
						}
						
						$this.unbind('.jcountdown');
						$this.removeData('jcdSettings');
					});	
					
				},
				getSettings: function( name, value ){
				
					var settings,
						$this = $(this[0]);
					
					settings = $this.data( 'jcdSettings' );
					
					if( !settings ){
						return undefined;
					}
						
					return settings;
				}
			};
		
		if( methods[method] ) {

			return methods[method].apply( this, slice.call( arguments, 1 ) );
		
		} else if( typeof method === 'object' || !method ) {
		
			return methods.init.apply( this, arguments );
		
		} else {
			$.error('Method '+ method+' does not exist in the jCountdown Plugin');
		}

	};
       
})(jQuery);