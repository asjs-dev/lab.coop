includeOnce( "com/lab.coop/model/vo/FoodEntryDataVo.js" );

function FoodDataVo( value ) {
	var that = new FoodEntryDataVo( value );
	
	var data = value || {};
	
	that.id =	data[ "id" ] || null;
	
	return that;
}
