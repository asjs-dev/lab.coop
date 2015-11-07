includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/AddCalorieEntryView.js" );
includeOnce( "com/asjs/model/Language.js" );

includeOnce( "com/lab.coop/services/Services.js" );
includeOnce( "com/lab.coop/mediator/PreloaderMediator.js" );
includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/mediator/AddFoodEntryMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );
includeOnce( "com/lab.coop/model/vo/CalorieEntryDataVo.js" );

includeOnce( "com/lab.coop/mediator/NotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/NotificationDataVo.js" );

function AddCalorieEntryMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	
	var _addCalorieEntryView = new AddCalorieEntryView();
	
	that.handlers = [ ASJS.Stage.RESIZE, AddCalorieEntryMediator.SHOW, AddCalorieEntryMediator.HIDE, AddFoodEntryMediator.ENTRY_ADDED ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case AddCalorieEntryMediator.SHOW: onShow();
			break;
			case AddCalorieEntryMediator.HIDE: onHide();
			break;
			case AddFoodEntryMediator.ENTRY_ADDED: loadEntries();
			break;
		}
	}
	
	function onResize() {
		_addCalorieEntryView.setSize( stage.stageWidth, stage.stageHeight );
		_addCalorieEntryView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _addCalorieEntryView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addEventListener( AddCalorieEntryMediator.ON_ADD_CLICK, function( event, data ) {
			that.sendNotification( PreloaderMediator.SHOW );
			
			var calorieEntryDataVo = new CalorieEntryDataVo();
				calorieEntryDataVo.foodId = data.id;
				
			_services.addCalorie( calorieEntryDataVo,
				function( response ) {
					that.sendNotification( PreloaderMediator.HIDE );
					
					var quickNotificatonDataVo = new QuickNotificationDataVo();
						quickNotificatonDataVo.message =	_language.getText( "success" );
						quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_SUCCESS;
					
					that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
					that.sendNotification( AddCalorieEntryMediator.ENTRY_ADDED );
					onHide();
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
		that.view.addEventListener( AddCalorieEntryMediator.ON_ADD_NEW_FOOD_ENTRY_CLICK, function( event ) {
			that.sendNotification( AddFoodEntryMediator.SHOW );
		});
		that.view.addEventListener( AddCalorieEntryMediator.ON_CANCEL_CLICK, function( event ) {
			onHide();
		});
		
		that.view.addChild( _addCalorieEntryView );
	
		loadEntries();
	}
	
	function onHide() {
		if ( !that.view.contains( _addCalorieEntryView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _addCalorieEntryView );
	}
	
	function loadEntries() {
		if ( !that.view.contains( _addCalorieEntryView ) ) return;
		
		that.sendNotification( PreloaderMediator.SHOW );
		_services.getFoodList(
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				response.sort(function( a, b ) {
					if ( a[ "name" ] > b[ "name" ] ) return -1;
					if ( a[ "name" ] < b[ "name" ] ) return 1;
					return 0;
				});
				_addCalorieEntryView.foodList = response;
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
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
AddCalorieEntryMediator.SHOW						= "AddCalorieEntryMediator-show";
AddCalorieEntryMediator.HIDE						= "AddCalorieEntryMediator-hide";
AddCalorieEntryMediator.ON_ADD_CLICK				= "AddCalorieEntryMediator-onAddClick";
AddCalorieEntryMediator.ON_ADD_NEW_FOOD_ENTRY_CLICK	= "AddCalorieEntryMediator-onAddNewFoodEntryClick";
AddCalorieEntryMediator.ON_CANCEL_CLICK				= "AddCalorieEntryMediator-onCancelClick";
AddCalorieEntryMediator.ENTRY_ADDED					= "AddCalorieEntryMediator-entryAdded";
