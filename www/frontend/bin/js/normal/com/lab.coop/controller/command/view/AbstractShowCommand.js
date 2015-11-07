includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );

includeOnce( "com/lab.coop/mediator/CaloriesMediator.js" );
includeOnce( "com/lab.coop/mediator/StatisticsMediator.js" );
includeOnce( "com/lab.coop/mediator/FoodListMediator.js" );
includeOnce( "com/lab.coop/mediator/SettingsMediator.js" );

includeOnce( "com/lab.coop/mediator/AddCalorieEntryMediator.js" );

function AbstractShowCommand() {
	var that = new ASJS.AbstractCommand();
	
	that.execute = function() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		that.sendNotification( CaloriesMediator.HIDE );
		that.sendNotification( StatisticsMediator.HIDE );
		that.sendNotification( FoodListMediator.HIDE );
		that.sendNotification( SettingsMediator.HIDE );
		that.sendNotification( AddCalorieEntryMediator.HIDE );
		
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	return that;
}
