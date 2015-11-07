includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/form/asjs.Button.js" );
includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/mediator/MenuMediator.js" );

function MenuView() {
	var that = new ASJS.Sprite();
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var MENU_MAX_BORDER_SIZE = 2;
	var MENU_MAX_HEIGHT = MenuView.MENU_SIZE - MENU_MAX_BORDER_SIZE;
	var MENU_BUTTON_MAX_WIDTH = 60;
	var MENU_BUTTON_MAX_HEIGHT = 54;
	var MENU_BUTTONS_CONTAINER_MAX_WIDTH = 800;
	
	var _menuBackground;
	
	var _menuButtonsContainer;
	var _caloriesButton;
	var _statisticsButton;
	var _foodListButton;
	var _settingsButton;
	
	that.drawNow = function() {
		var isPortrait = _mobileUtils.getOrientation() == MobileUtils.ORIENTATION_PORTRAIT;
		var menuBorderSize;
		var menuButtonWidth;
		var menuButtonHeight;
		var menuButtonIconWidth;
		var menuButtonIconHeight;
		var menuButtonCalcWidth;
		var menuButtonCalcHeight;
		
		if ( isPortrait ) {
			var menuHeight = _mobileUtils.convertRatio( MENU_MAX_HEIGHT, true );
			menuBorderSize = _mobileUtils.convertRatio( MENU_MAX_BORDER_SIZE, true );
		
			_menuBackground.setSize( stage.stageWidth, Math.min( menuHeight, MENU_MAX_HEIGHT ) );
			_menuBackground.setCSS( "border", "none" );
			_menuBackground.setCSS( "border-bottom", "2px solid #FFFFFF" );
			_menuBackground.setCSS( "border-width", Math.min( menuBorderSize, MENU_MAX_BORDER_SIZE ) + "px" );
		
			var menuButtonsContainerWidth = _mobileUtils.convertRatio( MENU_BUTTONS_CONTAINER_MAX_WIDTH, true );
			_menuButtonsContainer.setSize( Math.min( stage.stageWidth, Math.min( menuButtonsContainerWidth, MENU_BUTTONS_CONTAINER_MAX_WIDTH ) ), _menuBackground.height );
			_menuButtonsContainer.move( ( stage.stageWidth - _menuButtonsContainer.width ) * 0.5 , 0 );
		
			menuButtonWidth = _mobileUtils.convertRatio( MENU_BUTTON_MAX_WIDTH, true );
			menuButtonHeight = _mobileUtils.convertRatio( MENU_BUTTON_MAX_HEIGHT, true );
			menuButtonIconWidth = Math.min( menuButtonWidth, MENU_BUTTON_MAX_WIDTH );
			menuButtonIconHeight = Math.min( menuButtonHeight, MENU_BUTTON_MAX_HEIGHT );
			menuButtonCalcWidth = _menuButtonsContainer.width / 4;
			menuButtonCalcHeight = _menuButtonsContainer.height;
		} else {
			var menuWidth = _mobileUtils.convertRatio( MENU_MAX_HEIGHT, true );
			menuBorderSize = _mobileUtils.convertRatio( MENU_MAX_BORDER_SIZE, true );
		
			_menuBackground.setSize( Math.min( menuWidth, MENU_MAX_HEIGHT ), stage.stageHeight );
			_menuBackground.setCSS( "border", "none" );
			_menuBackground.setCSS( "border-right", "2px solid #FFFFFF" );
			_menuBackground.setCSS( "border-width", Math.min( menuBorderSize, MENU_MAX_BORDER_SIZE ) + "px" );
		
			var menuButtonsContainerHeight = _mobileUtils.convertRatio( MENU_BUTTONS_CONTAINER_MAX_WIDTH, true );
			_menuButtonsContainer.setSize( _menuBackground.width, Math.min( stage.stageHeight, Math.min( menuButtonsContainerHeight, MENU_BUTTONS_CONTAINER_MAX_WIDTH ) ) );
			_menuButtonsContainer.move( 0, ( stage.stageHeight - _menuButtonsContainer.height ) * 0.5 );
		
			menuButtonWidth = _mobileUtils.convertRatio( MENU_BUTTON_MAX_WIDTH, true );
			menuButtonHeight = _mobileUtils.convertRatio( MENU_BUTTON_MAX_HEIGHT, true );
			menuButtonIconWidth = Math.min( menuButtonWidth, MENU_BUTTON_MAX_WIDTH );
			menuButtonIconHeight = Math.min( menuButtonHeight, MENU_BUTTON_MAX_HEIGHT );
			menuButtonCalcWidth = _menuButtonsContainer.width;
			menuButtonCalcHeight = _menuButtonsContainer.height / 4;
		}
		_caloriesButton.setSize( menuButtonCalcWidth, menuButtonCalcHeight );
		_statisticsButton.setSize( menuButtonCalcWidth, menuButtonCalcHeight );
		_foodListButton.setSize( menuButtonCalcWidth, menuButtonCalcHeight );
		_settingsButton.setSize( menuButtonCalcWidth, menuButtonCalcHeight );
		
		_caloriesButton.setCSS( "background-size", menuButtonIconWidth + "px " + menuButtonIconHeight + "px" );
		_statisticsButton.setCSS( "background-size", menuButtonIconWidth + "px " + menuButtonIconHeight + "px" );
		_foodListButton.setCSS( "background-size", menuButtonIconWidth + "px " + menuButtonIconHeight + "px" );
		_settingsButton.setCSS( "background-size", menuButtonIconWidth + "px " + menuButtonIconHeight + "px" );
		
		_caloriesButton.move( 0, 0 );
		_statisticsButton.move( isPortrait ? _caloriesButton.x + _caloriesButton.width : 0, isPortrait ? 0 : _caloriesButton.y + _caloriesButton.height );
		_foodListButton.move( isPortrait ? _statisticsButton.x + _statisticsButton.width : 0, isPortrait ? 0 : _statisticsButton.y + _statisticsButton.height );
		_settingsButton.move( isPortrait ? _foodListButton.x + _foodListButton.width : 0, isPortrait ? 0 : _foodListButton.y + _foodListButton.height );
	}
	
	(function() {
		that.setCSS( "position", "fixed" );
		
		_menuBackground = new ASJS.DisplayObject();
		_menuBackground.addClass( "menu_background" );
		that.addChild( _menuBackground );
		
		_menuButtonsContainer = new ASJS.Sprite();
		that.addChild( _menuButtonsContainer );
		
		_caloriesButton = new ASJS.Button();
		_caloriesButton.addClass( "menu_button_calories" );
		_caloriesButton.setAttr( "title", _language.getText( "calories_button_label" ) );
		_caloriesButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( MenuMediator.ON_CALORIES_CLICK );
		});
		_menuButtonsContainer.addChild( _caloriesButton );
		
		_statisticsButton = new ASJS.Button();
		_statisticsButton.addClass( "menu_button_statistics" );
		_statisticsButton.setAttr( "title", _language.getText( "statistics_button_label" ) );
		_statisticsButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( MenuMediator.ON_STATISTICS_CLICK );
		});
		_menuButtonsContainer.addChild( _statisticsButton );
		
		_foodListButton = new ASJS.Button();
		_foodListButton.addClass( "menu_button_food_list" );
		_foodListButton.setAttr( "title", _language.getText( "food_list_button_label" ) );
		_foodListButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( MenuMediator.ON_FOOD_LIST_CLICK );
		});
		_menuButtonsContainer.addChild( _foodListButton );
		
		_settingsButton = new ASJS.Button();
		_settingsButton.addClass( "menu_button_settings" );
		_settingsButton.setAttr( "title", _language.getText( "settings_button_label" ) );
		_settingsButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( MenuMediator.ON_SETTINGS_CLICK );
		});
		_menuButtonsContainer.addChild( _settingsButton );
	})();
	
	return that;
}
MenuView.MENU_SIZE = 102;
