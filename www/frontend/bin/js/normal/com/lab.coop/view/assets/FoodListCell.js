includeOnce( "org/asjs/display/list/asjs.Cell.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/asjs.Label.js" );

includeOnce( "com/asjs/model/Language.js" );
includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/AbstractInAppView.js" );

function FoodListCell() {
	var that = new ASJS.Cell();
	var _super = {};
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var CELL_MAX_HEIGHT = 90;
	var DELETE_BUTTON_MAX_SIZE = 46;
	var ICON_MAX_SIZE = 86;
	var TITLE_MAX_HEIGHT = 30;
	var TITLE_FONT_MAX_SIZE = 26;
	var TITLE_MAX_X = 108;
	var TITLE_MAX_Y = 21;
	var CALORIES_MAX_HEIGHT = 24;
	var CALORIES_FONT_MAX_SIZE = 20;
	var CALORIES_MAX_X = 108;
	var CALORIES_MAX_Y = 47;
	
	that.ICON_CLASSES = [
		"food_list_cell_icon_food",
		"food_list_cell_icon_drink",
		"food_list_cell_icon_sport"
	];
	
	that._box;
	that._title;
	that._calories;
	that._icon;
	that._deleteButton;
	
	defineProperty( that, "title", {
		get: function() { return that._title.text; },
		set: function( value ) { that._title.text = value; }
	});
	
	defineProperty( that, "calories", {
		get: function() { return that._calories.text; },
		set: function( value ) { that._calories.text = value; }
	});
	
	that.showData = function() {
		that.title = that.data.name;
		that._icon.addClass( that.ICON_CLASSES[ that.data.type ] );
		that.calories = ( that.data.type == 2 ? "-" : "" ) + that.data.calories + _language.getText( "calorie_unit" );
	}
	
	that.drawNow = function() {
		var cellHeight = _mobileUtils.convertRatio( CELL_MAX_HEIGHT, true );
		that.setSize( "100%", Math.min( cellHeight, CELL_MAX_HEIGHT ) );
		
		var marginSize = _mobileUtils.convertRatio( AbstractInAppView.GAP, true );
		var marginCalcSize = Math.min( marginSize, AbstractInAppView.GAP );
		that.setCSS( "margin-top", marginCalcSize );
		that.setCSS( "margin-bottom", marginCalcSize );
		
		var iconSize = _mobileUtils.convertRatio( ICON_MAX_SIZE, true );
		var iconCalcSize = Math.min( iconSize, ICON_MAX_SIZE );
		that._icon.setSize( iconCalcSize, iconCalcSize );
		that._icon.y = ( that.height - that._icon.height ) * 0.5;
		that._icon.x = that._icon.y;
		
		that._box.setSize( that.width, that.height );
		
		var deleteButtonMaxSize = _mobileUtils.convertRatio( DELETE_BUTTON_MAX_SIZE, true );
		var deleteButtonCalcSize = Math.min( deleteButtonMaxSize, DELETE_BUTTON_MAX_SIZE );
		that._deleteButton.setSize( deleteButtonCalcSize, deleteButtonCalcSize );
		that._deleteButton.y = ( that.height - that._deleteButton.height ) * 0.5;
		that._deleteButton.x = that.width - that._deleteButton.y - that._deleteButton.width;
		that._deleteButton.setCSS( "border-radius",  that._deleteButton.width + "px" );
		
		var titleHeight = _mobileUtils.convertRatio( TITLE_MAX_HEIGHT, true );
		var titleFontSize = _mobileUtils.convertRatio( TITLE_FONT_MAX_SIZE, true );
		var titleX = _mobileUtils.convertRatio( TITLE_MAX_X, true );
		var titleY = _mobileUtils.convertRatio( TITLE_MAX_Y, true );
		
		that._title.move( Math.min( titleX, TITLE_MAX_X ), Math.min( titleY, TITLE_MAX_Y ) );
		that._title.width = that._deleteButton.x - that._title.x - AbstractInAppView.GAP;
		that._title.height = Math.min( titleHeight, TITLE_MAX_HEIGHT );
		that._title.setCSS( "line-height", that._title.height + "px" );
		that._title.setCSS( "font-size", Math.min( titleFontSize, TITLE_FONT_MAX_SIZE ) + "px" );
		
		var caloriesHeight = _mobileUtils.convertRatio( CALORIES_MAX_HEIGHT, true );
		var caloriesFontSize = _mobileUtils.convertRatio( CALORIES_FONT_MAX_SIZE, true );
		var caloriesX = _mobileUtils.convertRatio( CALORIES_MAX_X, true );
		var caloriesY = _mobileUtils.convertRatio( CALORIES_MAX_Y, true );
		
		that._calories.move( Math.min( caloriesX, CALORIES_MAX_X ), Math.min( caloriesY, CALORIES_MAX_Y ) );
		that._calories.width = that._deleteButton.x - that._calories.x - AbstractInAppView.GAP;
		that._calories.height = Math.min( caloriesHeight, CALORIES_MAX_HEIGHT );
		that._calories.setCSS( "line-height", that._calories.height + "px" );
		that._calories.setCSS( "font-size", Math.min( caloriesFontSize, CALORIES_FONT_MAX_SIZE ) + "px" );
	}
	
	(function() {
		that.addClass( "food_list_cell" );
		that.setCSS( "position", "relative" );
		that.setCSS( "float", "left" );
		
		that._box = new ASJS.Sprite();
		that._box.addClass( "food_list_cell_box" );
		that.addChild( that._box );
		
		that._icon = new ASJS.DisplayObject();
		that._icon.addClass( "food_list_cell_icon" );
		that._box.addChild( that._icon );
		
		that._title = new ASJS.Label();
		that._title.addClass( "food_list_cell_title" );
		that._box.addChild( that._title );
		
		that._calories = new ASJS.Label();
		that._calories.addClass( "food_list_cell_calories" );
		that._box.addChild( that._calories );
		
		that._deleteButton = new ASJS.Button();
		that._deleteButton.addClass( "food_list_cell_delete_button" );
		that._deleteButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			event.stopPropagation();
			that.dispatchEvent( FoodListCell.DELETE, [ that ] );
		});
		that._box.addChild( that._deleteButton );
		
		that.mouseChildren = true;
	})();
	
	return that;
}
FoodListCell.DELETE		= "FoodListCell-delete";
