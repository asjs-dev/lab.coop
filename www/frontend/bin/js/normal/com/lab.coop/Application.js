sourcePath( "js/normal/" );

includeOnce( "org/asjs/asjs.Main.js" );
includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "com/lab.coop/controller/command/StartupCommand.js" );

function Application() {
	var that = {};
	
	var _caloriesView =				new ASJS.Sprite();
	var _statisticsView =			new ASJS.Sprite();
	var _foodListView =				new ASJS.Sprite();
	var _settingsView =				new ASJS.Sprite();
	var _menuView =					new ASJS.Sprite();
	var _loginView =				new ASJS.Sprite();
	var _quickNotificationView =	new ASJS.Sprite();
	var _addCalorieEntryView =		new ASJS.Sprite();
	var _addFoodEntryView =		new ASJS.Sprite();
	var _preloaderView =			new ASJS.Sprite();
	var _notificationView =			new ASJS.Sprite();
	
	defineProperty( that, "caloriesView", { get: function() { return _caloriesView; } });
	defineProperty( that, "statisticsView", { get: function() { return _statisticsView; } });
	defineProperty( that, "foodListView", { get: function() { return _foodListView; } });
	defineProperty( that, "settingsView", { get: function() { return _settingsView; } });
	defineProperty( that, "menuView", { get: function() { return _menuView; } });
	defineProperty( that, "loginView", { get: function() { return _loginView; } });
	defineProperty( that, "quickNotificationView", { get: function() { return _quickNotificationView; } });
	defineProperty( that, "addCalorieEntryView", { get: function() { return _addCalorieEntryView; } });
	defineProperty( that, "addFoodEntryView", { get: function() { return _addFoodEntryView; } });
	defineProperty( that, "preloaderView", { get: function() { return _preloaderView; } });
	defineProperty( that, "notificationView", { get: function() { return _notificationView; } });
	
	(function() {
		console.log( "Lab.coop probafeladat" );
		
		stage.addChild( _caloriesView );
		stage.addChild( _statisticsView );
		stage.addChild( _foodListView );
		stage.addChild( _settingsView );
		stage.addChild( _menuView );
		stage.addChild( _addCalorieEntryView );
		stage.addChild( _addFoodEntryView );
		stage.addChild( _loginView );
		stage.addChild( _quickNotificationView );
		stage.addChild( _preloaderView );
		stage.addChild( _notificationView );
		
		( new StartupCommand() ).execute( that );
	})();
	
	return that;
};

ASJS.startASJS( Application );
