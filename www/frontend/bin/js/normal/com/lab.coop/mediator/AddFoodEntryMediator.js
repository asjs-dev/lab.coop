includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/AddFoodEntryView.js" );
includeOnce( "com/asjs/model/Language.js" );

includeOnce( "com/lab.coop/services/Services.js" );
includeOnce( "com/lab.coop/mediator/PreloaderMediator.js" );
includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );
includeOnce( "com/lab.coop/model/vo/FoodEntryDataVo.js" );

function AddFoodEntryMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	
	var _addFoodEntryView = new AddFoodEntryView();
	
	that.handlers = [ ASJS.Stage.RESIZE, AddFoodEntryMediator.SHOW, AddFoodEntryMediator.HIDE ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case AddFoodEntryMediator.SHOW: onShow();
			break;
			case AddFoodEntryMediator.HIDE: onHide();
			break;
		}
	}
	
	function onResize() {
		_addFoodEntryView.setSize( stage.stageWidth, stage.stageHeight );
		_addFoodEntryView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _addFoodEntryView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addEventListener( AddFoodEntryMediator.ON_SAVE_CLICK, function( event ) {
			var foodName = _addFoodEntryView.foodName;
			var foodCalories = _addFoodEntryView.foodCalories;
			var foodType = _addFoodEntryView.foodType;
			
			if ( foodName == "" || foodCalories <= 0 ) {
				that.sendNotification( QuickNotificationMediator.SHOW, new QuickNotificationDataVo(
					_language.getText( "empty_name_or_calories" ),
					QuickNotificationMediator.TYPE_MESSAGE
				));
				return;
			}
			
			that.sendNotification( PreloaderMediator.SHOW );
			
			var foodEntryDataVo = new FoodEntryDataVo();
				foodEntryDataVo.name =		foodName;
				foodEntryDataVo.type =		foodType;
				foodEntryDataVo.calories =	foodCalories;
				
			_services.addFood( foodEntryDataVo,
				function( response ) {
					that.sendNotification( PreloaderMediator.HIDE );
					
					var quickNotificatonDataVo = new QuickNotificationDataVo();
						quickNotificatonDataVo.message =	_language.getText( "success" );
						quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_SUCCESS;
					
					that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
					that.sendNotification( AddFoodEntryMediator.ENTRY_ADDED );
					_addFoodEntryView.reset();
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
		that.view.addEventListener( AddFoodEntryMediator.ON_CANCEL_CLICK, function( event ) {
			onHide();
		});
		
		that.view.addChild( _addFoodEntryView );
	
		onResize();
	}
	
	function onHide() {
		if ( !that.view.contains( _addFoodEntryView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _addFoodEntryView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
AddFoodEntryMediator.SHOW				= "AddFoodEntryMediator-show";
AddFoodEntryMediator.HIDE				= "AddFoodEntryMediator-hide";
AddFoodEntryMediator.ON_SAVE_CLICK		= "AddFoodEntryMediator-onSaveClick";
AddFoodEntryMediator.ON_CANCEL_CLICK	= "AddFoodEntryMediator-onCancelClick";
AddFoodEntryMediator.ENTRY_ADDED		= "AddFoodEntryMediator-entryAdded";
