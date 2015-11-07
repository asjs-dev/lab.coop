includeOnce( "org/commons/mobileUtils/MobileUtils.js" );
includeOnce( "com/lab.coop/view/AbstractView.js" );
includeOnce( "com/lab.coop/view/MenuView.js" );

includeOnce( "org/asjs/display/asjs.Sprite.js" );

function AbstractInAppView() {
	var that = new AbstractView();
	
	var _mobileUtils = new MobileUtils().instance;
	
	that._container;
	
	that.drawNow = function() {
		var isPortrait = _mobileUtils.getOrientation() == MobileUtils.ORIENTATION_PORTRAIT;
		
		var menuSize = Math.floor( _mobileUtils.convertRatio( MenuView.MENU_SIZE, true ) );
		var menuCalcSize = Math.min( menuSize, MenuView.MENU_SIZE );
		that._container.move( isPortrait ? 0 : menuCalcSize, isPortrait ? menuCalcSize : 0 );
		that._container.setSize( that.width - that._container.x, that.height - that._container.y );
	}
	
	(function() {
		that._container = new ASJS.Sprite();
		that.addChild( that._container );
	})();
	
	return that;
}
AbstractInAppView.MARGIN	= 20;
AbstractInAppView.GAP		= 5;
