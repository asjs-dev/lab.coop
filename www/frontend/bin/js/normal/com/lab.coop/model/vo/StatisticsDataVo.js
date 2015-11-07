function StatisticsDataVo() {
	var that = {};
	
	var nowDate = new Date();
	var monthAgoDate = ( new Date() ).valueOf() - 2592000000;
	var monthAgo = ( new Date( monthAgoDate ) ).toYMD().split( ". " ).join( "-" ).substr( 0, 10 );
	var now = nowDate.toYMD().split( ". " ).join( "-" ).substr( 0, 10 );
	
	that.from	= monthAgo;
	that.to		= now;
	
	return that;
}
