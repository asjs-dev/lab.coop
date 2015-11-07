includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/QuickNotificationView.js" );

includeOnce( "com/asjs/model/Config.js" );

function QuickNotificationMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _config = new Config().instance;
	
	var _quickNotificationView = new QuickNotificationView();
	var _quickNotificationTimeout;
	
	that.handlers = [ QuickNotificationMediator.SHOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case QuickNotificationMediator.SHOW: onShow( data.message, data.type );
			break;
		}
	}
	
	function onShow( message, type ) {
		window.clearTimeout( _quickNotificationTimeout );
		
		_quickNotificationView.type = type;
		_quickNotificationView.message = message;
		
		if ( !that.view.contains( _quickNotificationView ) ) that.view.addChild( _quickNotificationView );
		_quickNotificationView.drawNow();
		
		_quickNotificationTimeout = window.setTimeout( onHide, _config.get( "quickNotificationTimeout" ) );
	}
	
	function onHide() {
		if ( that.view.contains( _quickNotificationView ) ) that.view.removeChild( _quickNotificationView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
QuickNotificationMediator.SHOW			= "QuickNotificationMediator-show";
QuickNotificationMediator.TYPE_SUCCESS 	= "QuickNotificationMediator-typeSuccess";
QuickNotificationMediator.TYPE_WARNING	= "QuickNotificationMediator-typeWarning";
QuickNotificationMediator.TYPE_MESSAGE	= "QuickNotificationMediator-typeMessage";
