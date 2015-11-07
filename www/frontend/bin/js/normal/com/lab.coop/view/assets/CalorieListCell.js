includeOnce( "com/lab.coop/view/assets/FoodListCell.js" );
includeOnce( "com/asjs/model/Language.js" );
includeOnce( "com/lab.coop/view/assets/CalorieListLabel.js" );

function CalorieListCell() {
	var that = new FoodListCell();
	var _super = {};
	
	var _language = new Language().instance;
	
	var _timeLabel;
	
	that.showData = function() {
		var time = that.data.timestamp.split( " " );
		if ( that.data.type == CalorieDataVo.TYPE_FOOD ) {
			that.title = time[ 1 ] + " " + that.data.foodData.name;
			that._icon.addClass( that.ICON_CLASSES[ that.data.foodData.type ] );
			that.calories = ( that.data.foodData.type == 2 ? "-" : "" ) + that.data.foodData.calories + _language.getText( "calorie_unit" );
		} else {
			var date = new Date();
			var now = date.toYMD().split( ". " ).join( "-" ).substr( 0, 10 );
			_timeLabel.text = time[ 0 ] == now ? _language.getText( "today" ) : time[ 0 ];
			_timeLabel.sumCalories = that.data.sumCalories;
			_timeLabel.maxCalories = that.data.maxCalories;
			_timeLabel.drawNow();
			
			that.removeChild( that._box );
			that.addChild( _timeLabel );
		}
	}
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		if ( that.contains( _timeLabel ) ) {
			_timeLabel.move( 0, 0 );
			_timeLabel.setSize( that.width, that.height );
			_timeLabel.drawNow();
			that.height = _timeLabel.calcHeight;
		}
	}
	
	(function() {
		_timeLabel = new CalorieListLabel();
		_timeLabel.icon = "images/icons/calendar.png";
	})();
	
	return that;
}
