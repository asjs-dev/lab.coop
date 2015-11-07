includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/lab.coop/view/StatisticsView.js" );
includeOnce( "com/asjs/model/Language.js" );

includeOnce( "com/lab.coop/services/Services.js" );

includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );

includeOnce( "com/lab.coop/mediator/NotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/NotificationDataVo.js" );

includeOnce( "com/lab.coop/model/vo/StatisticsDataVo.js" );

function StatisticsMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _services = new Services().instance;
	
	var _statisticsView = new StatisticsView();
	
	that.handlers = [ ASJS.Stage.RESIZE, StatisticsMediator.SHOW, StatisticsMediator.HIDE ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case StatisticsMediator.SHOW: onShow();
			break;
			case StatisticsMediator.HIDE: onHide();
			break;
		}
	}
	
	function onResize() {
		_statisticsView.setSize( stage.stageWidth, stage.stageHeight );
		_statisticsView.drawNow();
	}
	
	function onShow() {
		if ( that.view.contains( _statisticsView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.view.addChild( _statisticsView );
		
		loadEntries();
	}
	
	function onHide() {
		if ( !that.view.contains( _statisticsView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _statisticsView );
	}
	
	function loadEntries() {
		that.sendNotification( PreloaderMediator.SHOW );
		
		var statisticsDataVo = new StatisticsDataVo();
		_services.getSettings(
			function( response ) {
				_statisticsView.dailyCalories = response[ "daily_calories" ];
				_services.getStatistics( statisticsDataVo,
					function( response ) {
						that.sendNotification( PreloaderMediator.HIDE );
						_statisticsView.statistics = response;
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
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
StatisticsMediator.SHOW	= "StatisticsMediator-show";
StatisticsMediator.HIDE	= "StatisticsMediator-hide";
