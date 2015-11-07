includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );

includeOnce( "com/lab.coop/mediator/StatisticsMediator.js" );

includeOnce( "com/lab.coop/controller/command/view/AbstractShowCommand.js" );

function ShowStatisticsCommand() {
	var that = new AbstractShowCommand();
	var _super = {};
	
	extendFunction( _super, that, "execute" );
	that.execute = function() {
		_super.execute();
		that.sendNotification( PreloaderMediator.SHOW );
		that.sendNotification( StatisticsMediator.SHOW );
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	return that;
}
