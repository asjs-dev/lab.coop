includeOnce( "com/lab.coop/view/AbstractView.js" );
includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function QuickNotificationView() {
	var that = new AbstractView();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var QN_MAX_HEIGHT = 70;
	var QN_MAX_FONT_SIZE = 24;
	
	defineProperty( that, "type", {
		set: function( value ) {
			that.removeClass( "quick_notification_type_warning" );
			that.removeClass( "quick_notification_type_success" );
			that.removeClass( "quick_notification_type_message" );
			
			switch ( value ) {
				case QuickNotificationMediator.TYPE_WARNING: that.addClass( "quick_notification_type_warning" );
				break;
				case QuickNotificationMediator.TYPE_SUCCESS: that.addClass( "quick_notification_type_success" );
				break;
				default: that.addClass( "quick_notification_type_message" );
				break;
			}
		}
	});
	
	defineProperty( that, "message", {
		set: function( value ) { that.text = value; }
	});
	
	that.drawNow = function() {
		var qnHeight = _mobileUtils.convertRatio( QN_MAX_HEIGHT, true );
		var qnFontSize = _mobileUtils.convertRatio( QN_MAX_FONT_SIZE, true );
		
		that.setSize( stage.stageWidth, Math.min( qnHeight, QN_MAX_HEIGHT ) );
		that.setCSS( "font-size", Math.min( qnFontSize, QN_MAX_FONT_SIZE ) + "px" );
		that.setCSS( "line-height", that.height + "px" );
		
		that.move( 0, stage.stageHeight - that.height );
	}
	
	(function() {
		that.setCSS( "position", "fixed" );
	})();
	
	return that;
}
