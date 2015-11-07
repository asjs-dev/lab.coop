includeOnce( "org/asjs/display/form/asjs.Button.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/AbstractInAppView.js" );

includeOnce( "com/lab.coop/view/MenuView.js" );

function AddButton() {
	var that = new ASJS.Button();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var BUTTON_MAX_SIZE = 90;
	
	that.drawNow = function() {
		var isPortrait = _mobileUtils.getOrientation() == MobileUtils.ORIENTATION_PORTRAIT;
		
		var originalHeight = that.height;
		var buttonSize = _mobileUtils.convertRatio( BUTTON_MAX_SIZE, true );
		
		var menuSize = Math.floor( _mobileUtils.convertRatio( MenuView.MENU_SIZE, true ) );
		var menuCalcSize = Math.min( menuSize, MenuView.MENU_SIZE );
		
		that.height = Math.min( buttonSize, BUTTON_MAX_SIZE );
		that.move( isPortrait ? 0 : menuCalcSize, ( isPortrait ? menuCalcSize : 0 ) + originalHeight - that.calcHeight );
		//that.move( 0, originalHeight - that.calcHeight );
	};
	
	(function() {
		that.setCSS( "position", "fixed" );
		that.addClass( "add_button" );
	})();
	
	return that;
}
