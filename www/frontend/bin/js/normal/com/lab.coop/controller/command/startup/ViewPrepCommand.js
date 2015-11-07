includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/lab.coop/mediator/CaloriesMediator.js" );
includeOnce( "com/lab.coop/mediator/StatisticsMediator.js" );
includeOnce( "com/lab.coop/mediator/FoodListMediator.js" );
includeOnce( "com/lab.coop/mediator/SettingsMediator.js" );
includeOnce( "com/lab.coop/mediator/MenuMediator.js" );
includeOnce( "com/lab.coop/mediator/LoginMediator.js" );
includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/mediator/AddCalorieEntryMediator.js" );
includeOnce( "com/lab.coop/mediator/AddFoodEntryMediator.js" );
includeOnce( "com/lab.coop/mediator/PreloaderMediator.js" );
includeOnce( "com/lab.coop/mediator/NotificationMediator.js" );
includeOnce( "com/asjs/model/Language.js" );

function ViewPrepCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _language = new Language().instance;
	
	that.execute = function( app ) {
		new CaloriesMediator( app.caloriesView );
		new StatisticsMediator( app.statisticsView );
		new FoodListMediator( app.foodListView );
		new SettingsMediator( app.settingsView );
		new MenuMediator( app.menuView );
		new LoginMediator( app.loginView );
		new QuickNotificationMediator( app.quickNotificationView );
		new AddCalorieEntryMediator( app.addCalorieEntryView );
		new AddFoodEntryMediator( app.addFoodEntryView );
		new PreloaderMediator( app.preloaderView );
		
		var notificationMediator = new NotificationMediator( app.notificationView );
		notificationMediator.setDefault( _language.getText( 'notification_ok_button' ), _language.getText( 'notification_cancel_button' ) );
		
		that.sendNotification( LoginMediator.SHOW );
	}
	
	return that;
}
