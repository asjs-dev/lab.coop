includeOnce( "org/asjs/display/form/asjs.Button.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function Button() {
	var that = new ASJS.Button();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var BUTTON_MAX_WIDTH = 322;
	var BUTTON_MAX_HEIGHT = 70;
	var BUTTON_MAX_FONT_SIZE = 24;
	var BUTTON_MAX_BORDER_SIZE = 2;
	
	that.drawNow = function() {
		var buttonWidth = _mobileUtils.convertRatio( BUTTON_MAX_WIDTH, true );
		var buttonHeight = _mobileUtils.convertRatio( BUTTON_MAX_HEIGHT, true );
		var buttonFontSize = _mobileUtils.convertRatio( BUTTON_MAX_FONT_SIZE, true );
		var buttonBorderSize = _mobileUtils.convertRatio( BUTTON_MAX_BORDER_SIZE, true );
		
		that.setSize( Math.min( buttonWidth, BUTTON_MAX_WIDTH ), Math.min( buttonHeight, BUTTON_MAX_HEIGHT ) );
		that.setCSS( "font-size", Math.min( buttonFontSize, BUTTON_MAX_FONT_SIZE ) + "px" );
		that.setCSS( "border-width", Math.min( buttonBorderSize, BUTTON_MAX_BORDER_SIZE ) + "px" );
	};
	
	(function() {
		that.addClass( "button" );
	})();
	
	return that;
}
