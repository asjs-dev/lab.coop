includeOnce( "org/asjs/mvc/controller/command/asjs.AbstractCommand.js" );
includeOnce( "com/asjs/tools/Tools.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/asjs/model/Config.js" );
includeOnce( "com/asjs/model/Cookies.js" );
includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/utils/DateUtil.js" );

function EnvironmentCommand() {
	var that = new ASJS.AbstractCommand();
	
	var _language = new Language().instance;
	var _cookies = new Cookies().instance;
	var _tools = new Tools().instance;
	var _config = new Config().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var _sleepToResizeId;
	
	that.execute = function() {
		var selectedLanguage = _tools.getURLParams( 'lang' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _cookies.readCookie( 'language' );
		if ( selectedLanguage == undefined || _language.supportedLanguages.indexOf( selectedLanguage ) == -1 ) selectedLanguage = _language.selectedLanguage;
		_language.selectedLanguage = selectedLanguage;

		_cookies.createCookie( 'language', _language.selectedLanguage );
		stage.title = _language.getText( "title" );
		
		_mobileUtils.baseWidth = _config.get( "baseWidth" );
		
		var _dateUtil = new DateUtil();

		stage.addEventListener( ASJS.Stage.RESIZE, function( event ) {
			window.clearTimeout( _sleepToResizeId );
			_sleepToResizeId = window.setTimeout( function() {
				that.sendNotification( ASJS.Stage.RESIZE );
				window.clearTimeout( _sleepToResizeId );
			}, _config.get( "resizeInterval" ) );
		});
	}
	
	return that;
}
