/* 
* Simple jQuery Plugin Boilerplate
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk | MIT Licensed (license.txt)
*/
(function($) {

	$.fn.plugin_name = function( options ) {  
	
		var defaults = {
				option1: 'value1'
			},
			opts = $.extend( {}, defaults, options );
			//OR this, if the defaults are more advanced
			//opts = $.extend( true, {}, defaults, options );
		
		return this.each(function(){
			var $this = $(this);
			
			
		});
	};
       
})(jQuery);