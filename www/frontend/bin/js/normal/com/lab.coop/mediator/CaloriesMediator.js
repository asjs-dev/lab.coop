includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/CaloriesView.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/tools/Tools.js" );

includeOnce( "com/lab.coop/services/Services.js" );

includeOnce( "com/lab.coop/mediator/AddCalorieEntryMediator.js" );

includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );

includeOnce( "com/lab.coop/mediator/NotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/NotificationDataVo.js" );

function CaloriesMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	var _tools = new Tools().instance;
	
	var _caloriesView = new CaloriesView();
	
	that.handlers = [ ASJS.Stage.RESIZE, CaloriesMediator.SHOW, CaloriesMediator.HIDE, AddCalorieEntryMediator.ENTRY_ADDED ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case CaloriesMediator.SHOW: onShow();
			break;
			case CaloriesMediator.HIDE: onHide();
			break;
			case AddCalorieEntryMediator.ENTRY_ADDED: loadEntries();
			break;
		}
	}
	
	function onResize() {
		_caloriesView.setSize( stage.stageWidth, stage.stageHeight );
		_caloriesView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _caloriesView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addEventListener( CaloriesMediator.ON_ADD_CLICK, function( event ) {
			that.sendNotification( AddCalorieEntryMediator.SHOW );
		});
		that.view.addEventListener( CaloriesMediator.DELETE_ITEM, function( event, data ) {
			var notificationDataVo = new NotificationDataVo();
				notificationDataVo.title = _language.getText( "notification_delete_title" );
				notificationDataVo.content = _tools.replaceText( _language.getText( "notification_delete_content" ), data.foodData );
				notificationDataVo.showOk = true;
				notificationDataVo.showCancel = true;
				notificationDataVo.okCallback = function() {
					onDeleteItem( data );
				};
			that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
		});
		
		that.view.addChild( _caloriesView );
	
		loadEntries();
	}
	
	function onDeleteItem( data ) {
		that.sendNotification( PreloaderMediator.SHOW );
		_services.deleteCalorieById( data.id,
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				var quickNotificatonDataVo = new QuickNotificationDataVo();
					quickNotificatonDataVo.message =	_language.getText( "success" );
					quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_SUCCESS;
				
				that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
				loadEntries();
			},
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				var quickNotificatonDataVo = new QuickNotificationDataVo();
					quickNotificatonDataVo.message =	_language.getText( "unknow_error" );
					quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
				
				that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
			}
		);
	}
	
	function loadEntries() {
		if ( !that.view.contains( _caloriesView ) ) return;
		
		that.sendNotification( PreloaderMediator.SHOW );
		_services.getSettings(
			function( response ) {
				_caloriesView.dailyCalories = response[ "daily_calories" ];
				_services.getCaloriesList(
					function( response ) {
						that.sendNotification( PreloaderMediator.HIDE );
				
						response.sort(function( a, b ) {
							if ( a[ "timestamp" ] < b[ "timestamp" ] ) return -1;
							if ( a[ "timestamp" ] > b[ "timestamp" ] ) return 1;
							return 0;
						});
						_caloriesView.calorieList = response;
				
						if ( response.length == 0 ) {
							var notificationDataVo = new NotificationDataVo();
								notificationDataVo.title = _language.getText( "notification_tip_title" );
								notificationDataVo.content = _language.getText( "notification_add_entry_content" );
								notificationDataVo.showOk = true;
							that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
						}
						onResize();
					},
					function( response ) {
						that.sendNotification( PreloaderMediator.HIDE );
				
						var quickNotificatonDataVo = new QuickNotificationDataVo();
							quickNotificatonDataVo.message =	_language.getText( "unknow_error" );
							quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
				
						that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
						onResize();
					}
				);
			},
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
	
				var quickNotificatonDataVo = new QuickNotificationDataVo();
					quickNotificatonDataVo.message =	_language.getText( "unknow_error" );
					quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
	
				that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
				onResize();
			}
		);
	}
	
	function onHide() {
		if ( !that.view.contains( _caloriesView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _caloriesView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
CaloriesMediator.SHOW			= "CaloriesMediator-show";
CaloriesMediator.HIDE			= "CaloriesMediator-hide";
CaloriesMediator.ON_ADD_CLICK	= "CaloriesMediator-onAddClick";
CaloriesMediator.DELETE_ITEM	= "CaloriesMediator-deleteItem";
