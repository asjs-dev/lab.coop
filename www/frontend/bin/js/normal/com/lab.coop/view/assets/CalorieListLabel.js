includeOnce( "org/asjs/display/asjs.Label.js" );
includeOnce( "com/lab.coop/view/assets/Label.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

function CalorieListLabel() {
	var that = new Label();
	var _super = {};
	
	var _mobileUtils = new MobileUtils().instance;
	
	var _sumCaloriesLabel;
	var _maxCalories;
	
	defineProperty( that, "sumCalories", {
		get: function() { return Number( _sumCaloriesLabel.text ); },
		set: function( value ) { _sumCaloriesLabel.text = value; }
	});
	
	defineProperty( that, "maxCalories", {
		get: function() { return _maxCalories; },
		set: function( value ) { _maxCalories = value; }
	});
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		_sumCaloriesLabel.removeClass( "calorie_list_label_good" );
		_sumCaloriesLabel.removeClass( "calorie_list_label_bad" );
		_sumCaloriesLabel.addClass( "calorie_list_label_" + ( that.sumCalories <= that.maxCalories ? "good" : "bad" ) );
	
		_sumCaloriesLabel.setCSS( "font-size", that._label.getCSS( "font-size" ) );
		_sumCaloriesLabel.setCSS( "line-height", that.height + "px" );
		_sumCaloriesLabel.move( that._label.x, that._label.y );
		_sumCaloriesLabel.setSize( that._label.width + that._label.x * 0.5, that._label.height );
	};
	
	(function() {
		_sumCaloriesLabel = new ASJS.Label();
		that.addChild( _sumCaloriesLabel );
	})();
	
	return that;
}
