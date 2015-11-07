includeOnce( "org/asjs/mvc/mediator/asjs.AbstractMediator.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );

includeOnce( "com/lab.coop/view/LoginView.js" );
includeOnce( "com/lab.coop/controller/command/LoggedInCommand.js" );

includeOnce( "org/commons/facebook/Facebook.js" );

includeOnce( "com/lab.coop/services/Services.js" );

includeOnce( "com/lab.coop/mediator/QuickNotificationMediator.js" );
includeOnce( "com/lab.coop/model/vo/QuickNotificationDataVo.js" );

function LoginMediator( view ) {
	var that = new ASJS.AbstractMediator( view );
	
	var _language = new Language().instance;
	var _facebook = new Facebook().instance;
	var _config = new Config().instance;
	var _services = new Services().instance;
	
	var _loginView = new LoginView();
	
	that.handlers = [ ASJS.Stage.RESIZE, LoginMediator.SHOW, LoginMediator.HIDE, Facebook.CONNECTED, Facebook.NOT_AUTHORIZED, Facebook.UNKNOW ];
	
	that.reciveNotification = function( notificationType, data ) {
		switch ( notificationType ) {
			case ASJS.Stage.RESIZE: onResize();
			break;
			case LoginMediator.SHOW: onShow();
			break;
			case LoginMediator.HIDE: onHide();
			break;
			case Facebook.CONNECTED: onFacebookConnected( data );
			break;
			case Facebook.NOT_AUTHORIZED:
			case Facebook.UNKNOW: that.sendNotification( PreloaderMediator.HIDE );
			break;
		}
	}
	
	function onResize() {
		_loginView.setSize( stage.stageWidth, stage.stageHeight );
		_loginView.drawNow();
	}
	
	function onFacebookConnected( data ) {
		_services.login( data,
			function( response ) {
				( new LoggedInCommand() ).execute();
				that.sendNotification( PreloaderMediator.HIDE );
			},
			function( response ) {
				that.sendNotification( PreloaderMediator.HIDE );
				
				var quickNotificatonDataVo = new QuickNotificationDataVo();
					quickNotificatonDataVo.message =	_language.getText( "authentication_error" );
					quickNotificatonDataVo.type =		QuickNotificationMediator.TYPE_WARNING;
				
				that.sendNotification( QuickNotificationMediator.SHOW, quickNotificatonDataVo );
			}
		);
	}
	
	function onShow() {
		if ( that.view.contains( _loginView ) ) return;
		
		stage.window.scrollTop( 0 );
		
		that.sendNotification( PreloaderMediator.SHOW );
		_facebook.init( _config.get( "facebookAppId" ) );
		that.view.addEventListener( LoginMediator.FACEBOOK_BUTTON_CLICK, function( event ) {
			_facebook.login();
		});
		that.view.addChild( _loginView );
	
		onResize();
	}
	
	function onHide() {
		if ( !that.view.contains( _loginView ) ) return;
		that.view.removeEventListeners();
		that.view.removeChild( _loginView );
	}
	
	(function() {
		that.registerNotificationHandlers();
	})();
	
	return that;
}
LoginMediator.SHOW					= "LoginMediator-show";
LoginMediator.HIDE					= "LoginMediator-hide";
LoginMediator.FACEBOOK_BUTTON_CLICK	= "LoginMediator-facebookButtonClick";
