/*! 
* Copyright (c) 2011 Tom Ellis (http://www.webmuse.co.uk)
* jQuery Gradient Animations v1.0
* Limitations:
  - Works with jQuery 1.4.3 and higher
  - Works in Firefox 3.6+, Safari 5.1+, Chrome 13+, Opera 11.10+, IE9+ 
* Requires:
  - jQuery Gradient cssHook
  - jQuery Color Animations v2 plugin
* Licensed under the MIT License (LICENSE.txt).
*/
(function($) {

	$.fn.animateGradient = function( css, speed, callback ) {

		var rWhitespace = /\s/,
			rWhiteGlobal = /\s/g,
			rLinear = /^(.*?)linear-gradient(.*?)$/i,
			rRadial = /^(.*?)radial-gradient(.*?)$/i,
			rLinearSettings = /^(.*?)(:?linear-gradient)(\()(.*)(\))(.*?)$/i,
			rRadialSettings = /^(.*?)(:?radial-gradient)(\()(.*)(\))(.*?)$/i,
			rRgba = /,rgb\(/gi,
			rHsla = /,hsl\(/gi,
			rProtect = /(rgb|hsl)\(\s?([0-9]+)\s?,\s?([0-9]+)\s?,\s?([0-9]+)\s?\)/gi,
			rProtectAlpha = /(rgb|hsl)a\(([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)?\)/gi,		
			rProtectReplace = "$1($2{}$3{}$4)",
			rProtectAlphaReplace = "$1a($2{}$3{}$4{}$5)",
			rNot = /,/gi,
			sRgbaReplace = '|rgb(',
			sHslaReplace = '|hsl(',
			rContainRgborHsl = /(rgb|hsl)(a?)(\()/i,
			sProtect = '{}',
			gradientQueue = [],
			push = [].push;
		
	    function parseRGBandHSL( value ) {

	    	var newValue = value;
	    	//Protect rgb/hsl and rgba/hsla values so they can be put into an array
	    	//Hate this, need a better way to do it, works for now
			newValue = newValue.replace( rProtect, rProtectReplace );
	    	newValue = newValue.replace( rProtectAlpha, rProtectAlphaReplace );
	    	newValue = newValue.replace(/,/g, "|");
	    	newValue = newValue.replace(/{}/g, ",");
	    	return newValue.split("|");
	    }

	    function containsRGBorHSL( value ){ 
	    	return ( rContainRgborHsl.test(  $.trim( value ) ) );
	    }
	
		return this.each(function() {
		
			var $this = $(this),
				elem = this,
				completed = false;
			
			if( !speed ) {
				speed = 1000;
			}

			time = speed / 10;
		
			for( var i = 0; i <= time; i += 5 ) {
				
				(function() {
					
					var pos = i,
						col = (pos / ( speed / 1000 ) ) / 100;
					$this.queue(function(next) {

						var currentGradient = $this.css('backgroundImage'),
							currentParts,
							details = [],
							newDetails = [],
							newParts,
							newCss = [],
							style,
							index = 0,
							gradientType = 'linear-gradient',
							isRadial = false;
						
						//Should we force a white gradient if they originally had no background??	
						if( !currentGradient || ( !rLinear.test( css ) && !rRadial.test( css ) ) )	{
							return false;
						}
							
						if ( rRadial.test( css ) ) {
							gradientType = 'radial-gradient';
							isRadial = true;
						}
						
						if( !isRadial ) {
							currentParts = rLinearSettings.exec( currentGradient );
						} else {
							currentParts = rRadialSettings.exec( currentGradient );
						}
						
						if( containsRGBorHSL( currentParts[4] ) ) {
				        	details = parseRGBandHSL( currentParts[4] );
						} else {
				        	details = $.trim( currentParts[4] ).split(",");
						}
				
						if( !isRadial ) {
							newParts = rLinearSettings.exec( css );
						} else {
							newParts = rRadialSettings.exec( css );
						}

						if( containsRGBorHSL( newParts[4] ) ) {
				        	newDetails = parseRGBandHSL( newParts[4] );
						} else {
				        	newDetails = $.trim( newParts[4] ).split(",");
				        }
				
						newCss = [];
						
						if( details.length > 2 && !isRadial ) {
							index = 1;
							newCss.push( details[0] );
						} else if( isRadial) {
							//Two positions and Two+ colours
							//Even a simple radial gradient
							index = 2;
							push.call( newCss, details[0], details[1] );
						}
						
						for( var j = index; j <= details.length - 1; j++ ) {
							between = $.Color( $.trim( details[j] ) ).transition( $.Color( $.trim( newDetails[j] ) ), col );
							newCss.push( between );
						}

						$this.css('backgroundImage', gradientType + '('+ newCss.join(", ") +')');

						setTimeout(function() {							
							next();
						}, speed / 10 );
						
						if( pos === time ) {
							if( callback ) {
								callback.apply($this);
							}
						}

					});
					
				})();
				
			}
		});
	};
  
})(jQuery);