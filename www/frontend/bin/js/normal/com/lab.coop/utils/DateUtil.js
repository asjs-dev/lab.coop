function DateUtil() {
	var that = {};
	
	(function() {
		Date.prototype.toYMD = Date_toYMD;
		function Date_toYMD() {
			var year = String( this.getFullYear() );
			var month = String( this.getMonth() + 1 );
			if ( month.length == 1 ) month = "0" + month;
			var day = String( this.getDate() );
			if ( day.length == 1 ) day = "0" + day;
			return year + "-" + month + "-" + day;
		}
	})();
	
	return that;
}
