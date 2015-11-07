includeOnce( "com/lab.coop/model/vo/FoodDataVo.js" );

function CalorieDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.id				= data[ "id" ] || null;
	that.userId			= data[ "user_id" ] || null;
	that.timestamp		= data[ "timestamp" ] || new Data();
	that.foodData		= new FoodDataVo( data[ "food_data" ] );
	that.type			= CalorieDataVo.TYPE_FOOD;
	that.sumCalories	= 0;
	that.maxCalories	= 0;
	
	return that;
}
CalorieDataVo.TYPE_FOOD	= "CalorieDataVo-typeFood";
CalorieDataVo.TYPE_TIME	= "CalorieDataVo-typeTime";
