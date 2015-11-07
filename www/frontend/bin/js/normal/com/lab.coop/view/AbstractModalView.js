includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

function AbstractModalView() {
	var that = new ASJS.Sprite();
	
	var _background;
	
	(function() {
		_background = new ASJS.DisplayObject();
		_background.addClass( "modal_background" );
		_background.setSize( "100%", "100%" );
		_background.move( 0, 0 );
		_background.setCSS( "position", "fixed" );
		that.addChild( _background );
	})();
	
	return that;
}
