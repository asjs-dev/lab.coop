includeOnce( "org/asjs/display/form/asjs.TextInput.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function TextInput() {
	var that = new ASJS.TextInput();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var TI_MAX_WIDTH = 319;
	var TI_MAX_HEIGHT = 70;
	var TI_BORDER_MAX_SIZE = 2;
	var TI_FONT_MAX_SIZE = 32;
	
	that.drawNow = function() {
		var tiWidth = _mobileUtils.convertRatio( TI_MAX_WIDTH, true );
		var tiHeight = _mobileUtils.convertRatio( TI_MAX_HEIGHT, true );
		var tiBorderSize = _mobileUtils.convertRatio( TI_BORDER_MAX_SIZE, true );
		var tiFontSize = _mobileUtils.convertRatio( TI_FONT_MAX_SIZE, true );
		
		that.setSize( Math.min( tiWidth, TI_MAX_WIDTH ), Math.min( tiHeight, TI_MAX_HEIGHT ) );
		that.setCSS( "font-size", Math.min( tiFontSize, TI_FONT_MAX_SIZE ) + "px" );
		that.setCSS( "border-width", Math.min( tiBorderSize, TI_BORDER_MAX_SIZE ) + "px" );
	};
	
	(function() {
		that.addClass( "text_input" );
	})();
	
	return that;
}
