/*! 
* jCookie - jQuery Cookie Plugin
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* Licensed under MIT License
* See http://www.webmuse.co.uk/license/
*/
(function($) {
	
	$.cookie = function( name, value, options ) {  
				
		if( arguments.length === 1 ){
			//Getting
			var value = undefined,
			cookies = [],
			cookie;
			
			if( document.cookie && document.cookie !== '' ){
				
				cookies = document.cookie.split(';');
				
				$.each( cookies, function( i, cookie){
					cookie = $.trim( cookie );
					if( cookie.substring(0, name.length + 1) == name + '=' ){
						value = decodeURIComponent( cookie.substring( name.length +1 ) );
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
				
			$.extend( opts, $.cookie.defaults, options );
			
			if( value == null ){
				//Causes cookie to be deleted
				value = '';
				opts.expires = -1;
			}
			
			path = opts.path ? '; ' + opts.path : '';
			domain = opts.domain ? '; ' + opts.domain : '';
			expires = opts.expires ? (function(options){
				var date;
				if( typeof opts.expires === 'number' ){
					date = new Date();
					date.setTime( date.getTime() + (  opts.expires * 864E5 ) );
				} else {
					date = opts.expires;
				}
				
				return expires = '; expires=' + date.toUTCString();
				
			})(options) : '';
			secure = opts.secure ? '; secure' : '';
			 
			document.cookie = name + '=' + encodeURIComponent( value ) + expires + path + domain + secure;
		
		}
	};
	
	$.cookie.defaults = {
		expires: '',
		domain: '',
		path: '',
		secure: false
	};
       
})(jQuery);