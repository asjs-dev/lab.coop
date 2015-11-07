function StatisticListDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.timestamp		= data[ "timestamp" ] || null;
	that.calories		= data[ "calories" ] || 0;
	that.dailyCalories	= data[ "calories" ] || 0;
	that.maxCalories	= data[ "max_calories" ] || 0;
	
	return that;
}
