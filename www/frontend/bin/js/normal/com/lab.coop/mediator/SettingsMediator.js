includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/SettingsView.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/lab.coop/services/Services.js" );
includeOnce( "com/lab.coop/mediator/PreloaderMediator.js" );
includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );
includeOnce( "com/lab.coop/model/vo/SettingsDataVo.js" );

function SettingsMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	
	var _settingsView = new SettingsView();
	
	that.handlers = [ ASJS.Stage.RESIZE, SettingsMediator.SHOW, SettingsMediator.HIDE ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case SettingsMediator.SHOW: onShow();
			break;
			case SettingsMediator.HIDE: onHide();
			break;
		}
	}
	
	function onResize() {
		_settingsView.setSize( stage.stageWidth, stage.stageHeight );
		_settingsView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _settingsView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addEventListener( SettingsMediator.ON_SAVE_CLICK, function( events ) {
			that.sendNotification( PreloaderMediator.SHOW );
			
			var settingsDataVo = new SettingsDataVo();
				settingsDataVo.daily_calories = _settingsView.dailyCalories;
			
			_services.setSettings( settingsDataVo,
				function( response ) {
					that.sendNotification( PreloaderMediator.HIDE );
					
					var quickNotificatonDataVo = new QuickNotificationDataVo();
						quickNotificatonDataVo.message =	_language.getText( "success" );
						quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_SUCCESS;
						
					that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
				},
				function( response ) {
					that.sendNotification( PreloaderMediator.HIDE );
					
					var quickNotificatonDataVo = new QuickNotificationDataVo();
						quickNotificatonDataVo.message =	_language.getText( "unknow_error" );
						quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
						
					that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
				}
			);
		});
		
		that.view.addChild( _settingsView );
		
		that.sendNotification( PreloaderMediator.SHOW );
		_services.getSettings(
			function( response ) {
				_settingsView.dailyCalories = response[ "daily_calories" ];
				that.sendNotification( PreloaderMediator.HIDE );
			},
			function( response ) {
				var quickNotificatonDataVo = new QuickNotificationDataVo();
					quickNotificatonDataVo.message =	_language.getText( "unknow_error" );
					quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
					
				that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
			}
		);
	
		onResize();
	}
	
	function onHide() {
		if ( !that.view.contains( _settingsView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _settingsView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
SettingsMediator.SHOW			= "SettingsMediator-show";
SettingsMediator.HIDE			= "SettingsMediator-hide";
SettingsMediator.ON_SAVE_CLICK	= "SettingsMediator-ON_SAVE_CLICK";
