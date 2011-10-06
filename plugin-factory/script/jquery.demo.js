(function($) {

$.plugin('dm.demo', {
	options : {
		name: 'tom'
	},
	_init: function(){
				
		$this = $(this.element);
		$this.html( this.options.name );
	},
	_destroy: function(){
		$this = $(this.element);

		$this.html( "BLAH" );	
		console.log( this );
	}
});
       
})(jQuery);