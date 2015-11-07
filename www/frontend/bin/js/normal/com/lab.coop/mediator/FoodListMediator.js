includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/FoodListView.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/tools/Tools.js" );

includeOnce( "com/lab.coop/services/Services.js" );
includeOnce( "com/lab.coop/mediator/AddFoodEntryMediator.js" );

includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );

includeOnce( "com/lab.coop/mediator/NotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/NotificationDataVo.js" );

function FoodListMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	var _tools = new Tools().instance;
	
	var _foodListView = new FoodListView();
	
	that.handlers = [ ASJS.Stage.RESIZE, FoodListMediator.SHOW, FoodListMediator.HIDE, AddFoodEntryMediator.ENTRY_ADDED ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case FoodListMediator.SHOW: onShow();
			break;
			case FoodListMediator.HIDE: onHide();
			break;
			case AddFoodEntryMediator.ENTRY_ADDED: loadEntries();
			break;
		}
	}
	
	function onResize() {
		_foodListView.setSize( stage.stageWidth, stage.stageHeight );
		_foodListView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _foodListView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addEventListener( FoodListMediator.ON_ADD_CLICK, function( event ) {
			that.sendNotification( AddFoodEntryMediator.SHOW );
		});
		that.view.addEventListener( FoodListMediator.DELETE_ITEM, function( event, data ) {
			var notificationDataVo = new NotificationDataVo();
				notificationDataVo.title = _language.getText( "notification_delete_title" );
				notificationDataVo.content = _tools.replaceText( _language.getText( "notification_delete_content" ), data );
				notificationDataVo.showOk = true;
				notificationDataVo.showCancel = true;
				notificationDataVo.okCallback = function() {
					onDeleteItem( data );
				};
			that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
		});
		
		that.view.addChild( _foodListView );
		
		loadEntries();
	}
	
	function onDeleteItem( data ) {
		that.sendNotification( PreloaderMediator.SHOW );
		_services.deleteFoodById( data.id,
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				if ( response.success ) {
					var quickNotificatonDataVo = new QuickNotificationDataVo();
						quickNotificatonDataVo.message =	_language.getText( "success" );
						quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_SUCCESS;
				
					that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
					loadEntries();
				} else {
					var notificationDataVo = new NotificationDataVo();
						notificationDataVo.title = _language.getText( "notification_alert_title" );
						notificationDataVo.content = _tools.replaceText( _language.getText( "notification_food_exists_in_calories_list" ), data );
						notificationDataVo.showOk = true;
					that.sendNotification( NotificationMediator.SHOW, notificationDataVo );
				}
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
		if ( !that.view.contains( _foodListView ) ) return;
		
		that.sendNotification( PreloaderMediator.SHOW );
		_services.getFoodList(
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				response.sort(function( a, b ) {
					if ( a[ "name" ] > b[ "name" ] ) return -1;
					if ( a[ "name" ] < b[ "name" ] ) return 1;
					return 0;
				});
				_foodListView.foodList = response;
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
	}
	
	function onHide() {
		if ( !that.view.contains( _foodListView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _foodListView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
FoodListMediator.SHOW			= "FoodListMediator-show";
FoodListMediator.HIDE			= "FoodListMediator-hide";
FoodListMediator.ON_ADD_CLICK	= "FoodListMediator-onAddClick";
FoodListMediator.DELETE_ITEM	= "FoodListMediator-deleteItem";
