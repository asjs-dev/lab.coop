includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/assets/Label.js" );
includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/mediator/StatisticsMediator.js" );

includeOnce( "org/asjs/display/list/asjs.CustomList.js" );
includeOnce( "com/lab.coop/view/assets/StatisticsListCell.js" );
includeOnce( "com/lab.coop/model/vo/StatisticListDataVo.js" );

function StatisticsView() {
	var that = new AbstractInAppView();
	var _super = {};
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var _statisticsLabel;
	var _statistics = {};
	var _dailyCalories = 0;
	var _statisticsList;
	
	defineProperty( that, "dailyCalories", {
		get: function() { return _dailyCalories; },
		set: function( value ) { _dailyCalories = value; }
	});
	
	defineProperty( that, "statistics", {
		get: function() { return _statistics; },
		set: function( value ) {
			_statistics = value;
			
			var statisticList = [];
			var statisticData;
			var maxCalories = 0;
			var l = _statistics.length;
			var i;
			for ( i = 0; i < l; i++ ) {
				statisticData = new StatisticListDataVo( _statistics[ i ] );
				statisticData.dailyCalories = that.dailyCalories;
				if ( maxCalories < statisticData.calories ) maxCalories = statisticData.calories;
				statisticList.push( statisticData );
			}
			
			for ( i = 0; i < l; i++ ) {
				statisticData = statisticList[ i ];
				statisticData.maxCalories = maxCalories;
			}
			
			_statisticsList.setList( statisticList );
		}
	});
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		_statisticsLabel.move( 0, AbstractInAppView.GAP );
		_statisticsLabel.setSize( that._container.width, that._container.height );
		_statisticsLabel.drawNow();
		
		_statisticsList.move( 0, _statisticsLabel.y + _statisticsLabel.calcHeight + AbstractInAppView.GAP );
		_statisticsList.width = that._container.width;
		_statisticsList.drawNow();
		_statisticsList.height = _statisticsList.getChildAt( 0 ).calcHeight + AbstractInAppView.GAP * 2;
	}
	
	function removedFromStage() {
		_statisticsList.clearList();
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
		
		_statisticsLabel = new Label();
		_statisticsLabel.text = _language.getText( "statistics_label" );
		_statisticsLabel.icon = "images/icons/statistics.png";
		that._container.addChild( _statisticsLabel );
		
		_statisticsList = new ASJS.CustomList();
		_statisticsList.cell = StatisticsListCell;
		that._container.addChild( _statisticsList );
		
	})();
	
	return that;
}
