includeOnce( "org/asjs/display/form/asjs.Button.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function NotificationView() {
	var that = new ASJS.Sprite();
	
	var _mobileUtils = new MobileUtils().instance;
	
	var MAX_GAP = 10;
	var TITLE_MAX_SIZE = 50;
	var TITLE_FONT_MAX_SIZE = 20;
	var CONTENT_FONT_MAX_SIZE = 14;
	var BUTTON_MAX_SIZE = 42;
	var BUTTON_FONT_MAX_SIZE = 14;
	
	var _notificationItem = {};
	var _window = new ASJS.Sprite();
	var _title = new ASJS.Sprite();
	var _content = new ASJS.Sprite();
	var _okButton = new ASJS.Button();
	var _cancelButton = new ASJS.Button();
	
	that.hideWindow = function() {
		_title.html = "";
		_content.html = "";
		
		if ( that.contains( _okButton ) ) that.removeChild( _okButton );
		_okButton.label = "";
		
		if ( that.contains( _cancelButton ) ) that.removeChild( _cancelButton );
		_cancelButton.label = "";
	}
	
	that.showWindow = function( notificationItem ) {
		_notificationItem = notificationItem;
		
		_title.html = _notificationItem.title;
		_content.html = _notificationItem.content;
		
		if ( _notificationItem[ 'showOk' ] ) {
			_okButton.label = _notificationItem[ 'okLabel' ];
			if ( !that.contains( _okButton ) ) that.addChild( _okButton );
		} else if ( that.contains( _okButton ) ) that.removeChild( _okButton );
		
		if ( _notificationItem[ 'showCancel' ] ) {
			_cancelButton.label = _notificationItem[ 'cancelLabel' ];
			if ( !that.contains( _cancelButton ) ) that.addChild( _cancelButton );
		} else if ( that.contains( _cancelButton ) ) that.removeChild( _cancelButton );
	}
	
	that.drawNow = function() {
		_window.setSize( Math.max( 150, Math.min( that.width, _notificationItem.width ) ), Math.max( 150, Math.min( that.height, _notificationItem.height ) ) );
		_window.move( ( that.width - _window.width ) * 0.5, Math.max( 0, ( that.height - _window.height ) * 0.5 ) );
		
		var gap = _mobileUtils.convertRatio( MAX_GAP, true );
		var calcGap = Math.min( gap, MAX_GAP );
		
		var titleFontSize = _mobileUtils.convertRatio( TITLE_FONT_MAX_SIZE, true );
		var titleSize = _mobileUtils.convertRatio( TITLE_MAX_SIZE, true );
		var titleCalcSize = Math.min( titleSize, TITLE_MAX_SIZE );
		
		var contentFontSize = _mobileUtils.convertRatio( CONTENT_FONT_MAX_SIZE, true );
		
		var buttonFontSize = _mobileUtils.convertRatio( BUTTON_FONT_MAX_SIZE, true );
		var buttonSize = _mobileUtils.convertRatio( BUTTON_MAX_SIZE, true );
		var buttonCalcFontSize = Math.min( buttonFontSize, BUTTON_FONT_MAX_SIZE );
		var buttonCalcSize = Math.min( buttonSize, BUTTON_MAX_SIZE );
		
		_title.setCSS( "padding-left", calcGap + "px" );
		_title.setCSS( "padding-right", calcGap + "px" );
		_title.setCSS( "font-size", Math.min( titleFontSize, TITLE_FONT_MAX_SIZE ) + "px" );
		_title.setCSS( "line-height", titleCalcSize + "px" );
		_title.move( _window.x, _window.y );
		_title.setSize( _window.width - calcGap * 2, titleCalcSize );
		
		_content.setCSS( "padding-left", calcGap + "px" );
		_content.setCSS( "padding-right", calcGap + "px" );
		_content.setCSS( "font-size", Math.min( contentFontSize, CONTENT_FONT_MAX_SIZE ) + "px" );
		_content.move( _title.x, _title.y + _title.height + calcGap );
		_content.setSize( _title.width, _window.height - _title.height - calcGap - ( that.contains( _okButton ) || that.contains( _cancelButton ) ? ( buttonCalcSize + calcGap * 2 ) : 0 ) );
		if ( _content.drawNow ) _content.drawNow();
		
		_okButton.setSize( _window.width * 0.5 - calcGap * 2, buttonCalcSize );
		if ( that.contains( _okButton ) ) {
			_okButton.setCSS( "font-size", buttonCalcFontSize + "px" );
			_okButton.setCSS( "line-height", buttonCalcSize + "px" );
			_okButton.move(
				_window.x + ( that.contains( _cancelButton ) ? _window.width * 0.5 - calcGap - _okButton.width : ( ( _window.width - _okButton.width ) * 0.5 ) ),
				_window.y + _window.height - _okButton.height - calcGap
			);
		}
		
		_cancelButton.setSize( _okButton.width, _okButton.height );
		if ( that.contains( _cancelButton ) ) {
			_cancelButton.setCSS( "font-size", buttonCalcFontSize + "px" );
			_cancelButton.setCSS( "line-height", buttonCalcSize + "px" );
			_cancelButton.move(
				_window.x + ( that.contains( _okButton ) ? _window.width * 0.5 + calcGap : ( ( _window.width - _cancelButton.width ) * 0.5 ) ),
				_window.y + _window.height - _cancelButton.height - calcGap
			);
		}
	}
	
	function drawButtonStyle( target ) {
		target.addClass( "notification_button" );
		target.height = 42;
	}
	
	(function() {
		that.setCSS( "background-color", "rgba( 0, 0, 0, 0.4 )" );
		that.setSize( "100%", "100%" );
		that.setCSS( "position", "fixed" );
		
		_window.addClass( "notification_window" );
		that.addChild( _window );
	
		that.addChild( _title );
		_title.setCSS( "line-height", _title.height + "px" );
		_title.addClass( "notification_title" );
	
		_content.addClass( "notification_content" );
		that.addChild( _content );
	
		_okButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			if ( _notificationItem[ 'okCallback' ] != undefined ) _notificationItem[ 'okCallback' ]();
			that.dispatchEvent( NotificationMediator.HIDE );
		});
		drawButtonStyle( _okButton );
	
		_cancelButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			if ( _notificationItem[ 'cancelCallback' ] != undefined ) _notificationItem[ 'cancelCallback' ]();
			that.dispatchEvent( NotificationMediator.HIDE );
		});
		drawButtonStyle( _cancelButton );
	})();
	
	return that;
}
