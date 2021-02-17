/*
	Visualize by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/




$(function() {
	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});


		// fix wallpaper scrolling
		$(window).resize(function() {
			if (window.width > 812) {
				$( window ).scroll( function(){
					var ypos = $( window ).scrollTop(); //pixels the site is scrolled down
					var visible = $( window ).height(); //visible pixels
					const img_height = 1950; //replace with height of your image
					var max_scroll = img_height - visible; //number of pixels of the image not visible at bottom
				//change position of background-image as long as there is something not visible at the bottom  
				if ( max_scroll > ypos ) {
					$('body').css('background-position', "center -" + ypos + "px");
					} else {
					$('body').css('background-position', "center -" + max_scroll + "px");
					}
				});
			} else {
				$("body").css("background-size", "cover")
			}

		})
		$(window).resize();
});