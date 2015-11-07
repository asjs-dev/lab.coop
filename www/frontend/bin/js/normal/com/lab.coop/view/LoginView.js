includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/assets/Button.js" );
includeOnce( "com/lab.coop/mediator/LoginMediator.js" );

includeOnce( "com/lab.coop/view/AbstractView.js" );

function LoginView() {
	var that = new AbstractView();
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var LOGO_MAX_WIDTH = 204;
	var LOGO_MAX_HEIGHT = 258;
	var LOGO_MAX_Y = 65;
	
	var LOGIN_BUTTON_MAX_Y = 50;
	
	var _logo;
	var _loginButton;
	
	that.drawNow = function() {
		var logoWidth = _mobileUtils.convertRatio( LOGO_MAX_WIDTH, true );
		var logoHeight = _mobileUtils.convertRatio( LOGO_MAX_HEIGHT, true );
		var logoY = _mobileUtils.convertRatio( LOGO_MAX_Y, true );
		
		_logo.setSize( Math.min( logoWidth, LOGO_MAX_WIDTH ), Math.min( logoHeight, LOGO_MAX_HEIGHT ) );
		_logo.move( (that.width - _logo.width ) * 0.5, Math.min( logoY, LOGO_MAX_Y ) );
		
		var loginButtonY = _mobileUtils.convertRatio( LOGIN_BUTTON_MAX_Y, true );
		
		_loginButton.setSize( that.width, that.height );
		_loginButton.drawNow();
		_loginButton.move( ( that.width - _loginButton.calcWidth ) * 0.5, _logo.y + _logo.height + Math.min( loginButtonY, LOGIN_BUTTON_MAX_Y ) );
	}
	
	(function() {
		_logo = new ASJS.Sprite();
		_logo.addClass( "logo" );
		that.addChild( _logo );
		
		_loginButton = new Button();
		_loginButton.label = _language.getText( "facebook_login_button_label" );
		_loginButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( LoginMediator.FACEBOOK_BUTTON_CLICK );
		});
		that.addChild( _loginButton );
	})();
	
	return that;
}
