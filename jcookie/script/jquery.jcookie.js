/*! 
* jCookie - jQuery Cookie Plugin v1.1
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* Licensed under MIT License
* See http://www.webmuse.co.uk/license/
* Based on the jQuery Cookie Plugin by Klaus Hartl
*/
(function($) {
	
	$.cookie = function( name, value, options ) {  
		
		var msPerDay = 864E5,
			returnValue,
			cookies = [],
			path,
			domain,
			expires,
			opts = {},
			secure,
			date,
			defaults = {
				expires: '',
				domain: '',
				path: '',
				secure: false				
			};
			
		if( arguments.length === 1 ){
			//Getting
			
			if( document.cookie && document.cookie !== '' ){
				
				cookies = document.cookie.split(';');
				
				$.each( cookies, function( i, cookie ) {
					cookie = $.trim( cookie );
					if( cookie.substring( 0, name.length + 1 ) === name + '=' ){
						returnValue = decodeURIComponent( cookie.substring( name.length + 1 ) );
						return false;
					}				
				});
			}
			return returnValue;			
			
		} else {
						
			//Extend settings, we have defaults incase user doesn't set a value	
			$.extend( opts, defaults, $.cookie.settings, options );
			
			if( value === null ) {
				//Causes cookie to be deleted
				value = '';
				opts.expires = -1;
			}
			
			path = opts.path ? '; ' + opts.path : '';
			domain = opts.domain ? '; ' + opts.domain : '';
			expires = opts.expires ? (function( opts ) {
				if(  $.type( opts.expires ) === 'number' ) {
					date = new Date();
					date.setTime( date.getTime() + (  opts.expires * msPerDay ) );
				} else if( $.type( opts.expires ) === 'date' ) {
					date = opts.expires;
				} else {
					//Default to 1 day if expires is incorrect format
					date = new Date();
					date.setTime( date.getTime() + msPerDay );
				}
				expires = '; expires=' + date.toUTCString();
				return expires;
				
			})( opts ) : '';
			secure = opts.secure ? '; secure' : '';
			 
			document.cookie = name + '=' + encodeURIComponent( value ) + expires + path + domain + secure;
			
			return document.cookie.indexOf(name);
		}
	};
	
	//Can set global settings
	$.cookie.settings = {
		expires: '',
		domain: '',
		path: '',
		secure: false
	};
		
	$.support.cookies = $.cookie('j_testcookie', 'value');
	
	if( $.support.cookies ) {
		$.cookie('j_testcookie', null); //delete test cookie
	}
       
})(jQuery);