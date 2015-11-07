includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/MenuView.js" );
includeOnce( "com/asjs/model/Language.js" );

includeOnce( "com/lab.coop/controller/command/view/ShowCaloriesCommand.js" );
includeOnce( "com/lab.coop/controller/command/view/ShowStatisticsCommand.js" );
includeOnce( "com/lab.coop/controller/command/view/ShowFoodListCommand.js" );
includeOnce( "com/lab.coop/controller/command/view/ShowSettingsCommand.js" );

function MenuMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	
	var _menuView = new MenuView();
	
	that.handlers = [ ASJS.Stage.RESIZE, MenuMediator.SHOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case MenuMediator.SHOW: onShow();
			break;
		}
	}
	
	function onResize() {
		_menuView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _menuView ) ) return;
		
		that.view.addEventListener( MenuMediator.ON_CALORIES_CLICK, function( event ) {
			( new ShowCaloriesCommand() ).execute();
		});
		that.view.addEventListener( MenuMediator.ON_STATISTICS_CLICK, function( event ) {
			( new ShowStatisticsCommand() ).execute();
		});
		that.view.addEventListener( MenuMediator.ON_FOOD_LIST_CLICK, function( event ) {
			( new ShowFoodListCommand() ).execute();
		});
		that.view.addEventListener( MenuMediator.ON_SETTINGS_CLICK, function( event ) {
			( new ShowSettingsCommand() ).execute();
		});
		
		that.view.addChild( _menuView );
	
		onResize();
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
MenuMediator.SHOW					= "MenuMediator-show";
MenuMediator.ON_CALORIES_CLICK		= "MenuMediator-onCaloriesClick";
MenuMediator.ON_STATISTICS_CLICK	= "MenuMediator-onStatisticsClick";
MenuMediator.ON_FOOD_LIST_CLICK		= "MenuMediator-onFoodListClick";
MenuMediator.ON_SETTINGS_CLICK		= "MenuMediator-onSettingsClick";
