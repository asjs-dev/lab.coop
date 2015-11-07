includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.Label.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function Label() {
	var that = new ASJS.Sprite();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var ICON_MAX_WIDTH = 38;
	var ICON_MAX_HEIGHT = 32;
	var LABEL_MAX_HEIGHT = 46;
	var LABEL_FONT_MAX_SIZE = 26;
	
	that._label;
	that._icon;
	
	defineProperty( that, "icon", {
		set: function( value ) { that._icon.setCSS( "background-image", "url(" + value + ")" ); }
	});
	
	defineProperty( that, "text", {
		set: function( value ) { that._label.text = value; }
	});
	
	that.drawNow = function() {
		var iconWidth = _mobileUtils.convertRatio( ICON_MAX_WIDTH, true );
		var iconHeight = _mobileUtils.convertRatio( ICON_MAX_HEIGHT, true );
		
		var labelHeight = _mobileUtils.convertRatio( LABEL_MAX_HEIGHT, true );
		that.height = Math.min( labelHeight, LABEL_MAX_HEIGHT );
		
		that._icon.setSize( Math.min( iconWidth, ICON_MAX_WIDTH ), Math.min( iconHeight, ICON_MAX_HEIGHT ) );
		that._icon.y = ( that.height - that._icon.height ) * 0.5;
		that._icon.x = that._icon.y;
		
		var labelFontSize = _mobileUtils.convertRatio( LABEL_FONT_MAX_SIZE, true );
		that._label.setCSS( "font-size", Math.min( labelFontSize, LABEL_FONT_MAX_SIZE ) + "px" );
		that._label.setCSS( "line-height", that.height + "px" );
		that._label.move( that._icon.x + that._icon.width + ( that.height - Math.min( labelFontSize, LABEL_FONT_MAX_SIZE ) ) * 0.5, 0 );
		that._label.setSize( that.width - that._label.x * 2, that.height );
	};
	
	(function() {
		that.addClass( "label" );
		
		that._label = new ASJS.Label();
		that._label.addClass( "label_text" );
		that.addChild( that._label );
		
		that._icon = new ASJS.DisplayObject();
		that._icon.addClass( "label_icon" );
		that.addChild( that._icon );
	})();
	
	return that;
}
