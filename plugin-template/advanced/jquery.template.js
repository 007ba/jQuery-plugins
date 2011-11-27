/* 
* Advanced jQuery Plugin Boilerplate
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk | MIT Licensed (license.txt)
*/
(function($) {

	$.fn.plugin_name = function( method /*,options*/ ) {  
	
		var defaults = {
				date: new Date(),
			},
			slice = [].slice,			
			methods = {
			
				init: function( options ) {
					
					var opts = $.extend( {}, defaults, options );
					//OR this, if the defaults are more advanced
					//var opts = $.extend( true, {}, defaults, options );			
				
				}
			};
		
		if( methods[method] ) {
			return methods[method].apply( this, slice.call( arguments, 1 ) );	
		} else if ( typeof method === "object" || !method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error("Method "+ method+" does not exist in the [plugin_name] Plugin");
		}
	};
       
})(jQuery);