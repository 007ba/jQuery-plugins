# jCookie - jQuery Cookie Plugin v1.1.1


## Options

	expires - Default: ''
	          (Must be a valid date string or a number, e.g 1 for 1 day,
	           If empty default to browser session, e.g gets destroyed when browser closes)
	domain - Default: ''
	         e.g jquery.com
	path - Default: ''
	       (Path of website cookie is valid on, e.g /products/ for example.com/products/
	        Can be '' to default to page cookie was created on)
	secure - Default: false
	         (Whether you cookie is on a secure)

## Usage
```javascript
$(document).ready(function(){
	//Simple usage
	
    $.cookie("cookie_name", "cookie_value");
	
	//Or	
    $.cookie("cookie_name", "cookie_value",{
        path : "/" //Whole website
        domain : "example.com"
        expires : 2 //2 Days time
    });
	

	//Advanced usage

    //Set global settings for all cookies
    $.cookie.settings = {
        path : "/",
        domain : "example.com",
        expires : 2
    };

    $.cookie("cookie_name", "cookie_value");

    $.cookie("cookie_name2", "cookie_value2");


	//Passing null to the cookie plugin will delete it
	$.cookie('cookie_name', null);		
	
});
```

## License

This plugin is licensed under the MIT License (LICENSE.txt).

Copyright (c) 2012 [Tom Ellis](http://www.webmuse.co.uk)
