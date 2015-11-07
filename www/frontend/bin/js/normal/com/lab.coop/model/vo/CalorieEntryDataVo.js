function CalorieEntryDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.foodId =	data[ "food_id" ] || null;
	
	return that;
}
