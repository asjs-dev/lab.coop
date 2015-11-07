function FoodEntryDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.name =		data[ "name" ] || "";
	that.type =		data[ "type" ] || 0;
	that.calories =	data[ "calories" ] || 1;
	
	return that;
}
