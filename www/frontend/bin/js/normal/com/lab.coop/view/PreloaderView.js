includeOnce( "org/asjs/display/asjs.Sprite.js" );

function PreloaderView() {
	var that = new ASJS.Sprite();
	
	(function() {
		that.setSize( "100%", "100%" );
		that.setCSS( "position", "fixed" );
		that.addClass( "preloader" );
	})();
	
	return that;
}
