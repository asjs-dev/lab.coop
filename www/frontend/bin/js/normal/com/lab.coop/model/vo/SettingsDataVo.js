function SettingsDataVo( value ) {
	var that = {};
	
	var data = value || {};
	
	that.daily_calories =	data[ "daily_calories" ] || null;
	
	return that;
}
