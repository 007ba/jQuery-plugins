/*! 
* jCookie - jQuery Cookie Plugin
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* Licensed under MIT License
* See http://www.webmuse.co.uk/license/
* Based on the jQuery Cookie Plugin by Klaus Hartl
*/
(function($) {
	
	$.cookie = function( name, value, options ) {  
		
		var msPerDay = 864E5,
			defaults = {
				expires: '',
				domain: '',
				path: '',
				secure: false				
			};
			
		if( arguments.length === 1 ){
			//Getting
			var value = undefined,
				msPerDay = 864E5,
				cookies = [],
				cookie;
			
			if( document.cookie && document.cookie !== '' ){
				
				cookies = document.cookie.split(';');
				
				$.each( cookies, function( i, cookie ) {
					cookie = $.trim( cookie );
					if( cookie.substring( 0, name.length + 1 ) == name + '=' ){
						value = decodeURIComponent( cookie.substring( name.length + 1 ) );
						return false;
					}				
				});
			}
			return value;			
			
		} else {
			
			//Settings
			var path,
				domain,
				expires,
				opts = {},
				secure;
			
			//Extend settings, we have defaults incase user doesn't set a value	
			$.extend( opts, defaults, $.cookie.settings, options );
			
			if( value == null ) {
				//Causes cookie to be deleted
				value = '';
				opts.expires = -1;
			}
			
			path = opts.path ? '; ' + opts.path : '';
			domain = opts.domain ? '; ' + opts.domain : '';
			expires = opts.expires ? (function( options ) {
				var date;
				if(  $.type( opts.expires ) === 'number' ) {
					date = new Date();
					date.setTime( date.getTime() + (  opts.expires * msPerDay ) );
				} else if( $.type( opts.expires === 'date' ) ) {
					date = opts.expires;
				} else {
					//Default to 1 day if expires is incorrect format
					date = new Date();
					date.setTime( date.getTime() + msPerDay );
				}
				
				return expires = '; expires=' + date.toUTCString();
				
			})( options ) : '';
			secure = opts.secure ? '; secure' : '';
			 
			document.cookie = name + '=' + encodeURIComponent( value ) + expires + path + domain + secure;
		}
	};
	
	//Can set global settings
	$.cookie.settings = {
		expires: '',
		domain: '',
		path: '',
		secure: false
	};
       
})(jQuery);