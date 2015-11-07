includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );

function QuickNotificationDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.message =	data[ "message" ] || "";
	that.type =		data[ "type" ] || QuickNotificationMediator.TYPE_MESSAGE;
	
	return that;
}
