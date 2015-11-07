includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );

includeOnce( "com/lab.coop/mediator/PreloaderMediator.js" );
includeOnce( "com/lab.coop/mediator/LoginMediator.js" );
includeOnce( "com/lab.coop/mediator/MenuMediator.js" );
includeOnce( "com/lab.coop/mediator/CaloriesMediator.js" );

includeOnce( "com/lab.coop/controller/command/view/ShowCaloriesCommand.js" );

function LoggedInCommand() {
	var that = new ASJS.AbstractCommand();
	
	that.execute = function() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		that.sendNotification( LoginMediator.HIDE );
		that.sendNotification( MenuMediator.SHOW );
		( new ShowCaloriesCommand() ).execute();
		
		that.sendNotification( PreloaderMediator.HIDE );
	}
	
	return that;
}
