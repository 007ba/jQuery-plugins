/* 
* jQuery Plugin Factory
* Copyright 2011 Tom Ellis http://www.webmuse.co.uk
* MIT Licensed (license.txt)
*/
(function($) {

$.plugin = function( name, config ) {
	
	var options = config || {},
		methods = {},
		plugin = {},
		parts = name.split('.'),
		slice = [].slice,
		namespace = "";
	
	//Has a namespace	
	if( parts.length == 2 ) {
		namespace = parts[0];
		name = parts[1];
	}	
	
	methods._init = function( settings ) {
		var fn = config._init || $.noop();
		
		plugin = $.extend( true, {}, options, settings );
		
		plugin.element = this;
		plugin.namespace = namespace;
		plugin.plugin = name;
		
		return fn.apply( plugin );
	};
	
	methods.destroy = function() {
		if( $.isFunction( config._destroy ) ) {		
			return config._destroy.apply( plugin, arguments ); 
		}
		return false;
	};
	
	$.fn[name] = function( method /*, options*/ ) {		
		return this.each(function() {			
			if( methods[ method ] ) {
				return methods[ method ].apply( this, slice.call( arguments, 1 ) );
			} else if ( typeof method === "object" || !method ) {
				return methods._init.apply( this, arguments );
			} else {
				$.error("Method "+ method +" does not exist in the "+ name + " Plugin");
			}
		});	
	};	
};
   
})(jQuery);