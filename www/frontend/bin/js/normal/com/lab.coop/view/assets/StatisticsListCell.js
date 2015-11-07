includeOnce( "org/asjs/display/list/asjs.Cell.js" );

includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );
includeOnce( "org/asjs/display/asjs.Label.js" );

includeOnce( "com/asjs/model/Language.js" );
includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/AbstractInAppView.js" );

function StatisticsListCell() {
	var that = new ASJS.Cell();
	var _super = {};
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var CELL_MAX_HEIGHT = 60;
	var TITLE_MAX_HEIGHT = 24;
	var TITLE_FONT_MAX_SIZE = 20;
	var TITLE_MAX_X = 20;
	var TITLE_MAX_Y = 10;
	var LINE_MAX_HEIGHT = 10;
	var LINE_MAX_GAP = 10;
	
	var _box;
	var _title;
	var _lineBg;
	var _line;
	
	defineProperty( that, "title", {
		get: function() { return _title.text; },
		set: function( value ) { _title.text = value; }
	});
	
	that.showData = function() {
		that.title = that.data.timestamp + " [ " + that.data.calories + _language.getText( "calorie_unit" ) + " ]";
		_title.removeClass( "statistics_list_cell_title_good" );
		_title.removeClass( "statistics_list_cell_title_bad" );
		_title.addClass( "statistics_list_cell_title_" + ( that.data.calories <= that.data.dailyCalories ? "good" : "bad" ) );
		
		_line.removeClass( "statistics_list_cell_line_good" );
		_line.removeClass( "statistics_list_cell_line_bad" );
		_line.addClass( "statistics_list_cell_line_" + ( that.data.calories <= that.data.dailyCalories ? "good" : "bad" ) );
		
		that.drawNow();
	}
	
	that.drawNow = function() {
		var cellHeight = _mobileUtils.convertRatio( CELL_MAX_HEIGHT, true );
		that.setSize( "100%", Math.min( cellHeight, CELL_MAX_HEIGHT ) );
		
		var marginSize = _mobileUtils.convertRatio( AbstractInAppView.GAP * 0.5, true );
		var marginCalcSize = Math.min( marginSize, AbstractInAppView.GAP * 0.5 );
		that.setCSS( "margin-top", marginCalcSize );
		that.setCSS( "margin-bottom", marginCalcSize );
		
		_box.setSize( that.width, that.height );
		
		var titleHeight = _mobileUtils.convertRatio( TITLE_MAX_HEIGHT, true );
		var titleFontSize = _mobileUtils.convertRatio( TITLE_FONT_MAX_SIZE, true );
		var titleX = _mobileUtils.convertRatio( TITLE_MAX_X, true );
		var titleY = _mobileUtils.convertRatio( TITLE_MAX_Y, true );
		
		_title.move( Math.min( titleX, TITLE_MAX_X ), Math.min( titleY, TITLE_MAX_Y ) );
		_title.width = that.width - _title.x - AbstractInAppView.GAP * 2;
		_title.height = Math.min( titleHeight, TITLE_MAX_HEIGHT );
		_title.setCSS( "line-height", _title.height + "px" );
		_title.setCSS( "font-size", Math.min( titleFontSize, TITLE_FONT_MAX_SIZE ) + "px" );
		
		var lineHeight = _mobileUtils.convertRatio( LINE_MAX_HEIGHT, true );
		var lineCalcHeight = Math.min( lineHeight, LINE_MAX_HEIGHT );
		var lineGap = _mobileUtils.convertRatio( LINE_MAX_GAP, true );
		var lineCalcGap = Math.min( lineGap, LINE_MAX_GAP );
		
		_lineBg.move( lineCalcGap, that.height - lineCalcGap - lineCalcHeight );
		_lineBg.setSize( that.width - lineCalcGap * 2, lineCalcHeight );
		
		_line.move( lineCalcGap, that.height - lineCalcGap - lineCalcHeight );
		_line.setSize( _lineBg.width * Math.max( 0.01, ( that.data.calories / that.data.maxCalories ) ), lineCalcHeight );
	}
	
	(function() {
		that.addClass( "food_list_cell" );
		that.setCSS( "position", "relative" );
		that.setCSS( "float", "left" );
		
		_box = new ASJS.Sprite();
		_box.addClass( "food_list_cell_box" );
		that.addChild( _box );
		
		_title = new ASJS.Label();
		_box.addChild( _title );
		
		_lineBg = new ASJS.DisplayObject();
		_lineBg.addClass( "statistics_list_cell_line_bg" );
		_box.addChild( _lineBg );
		
		_line = new ASJS.DisplayObject();
		_box.addChild( _line );
		
		that.mouseChildren = true;
	})();
	
	return that;
}
