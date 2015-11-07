includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "org/asjs/display/list/asjs.CustomList.js" );

includeOnce( "com/lab.coop/view/assets/TextInput.js" );
includeOnce( "com/lab.coop/view/assets/AddButton.js" );
includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/view/assets/CalorieListCell.js" );
includeOnce( "com/lab.coop/mediator/CaloriesMediator.js" );
includeOnce( "com/lab.coop/model/vo/CalorieDataVo.js" );

function CaloriesView() {
	var that = new AbstractInAppView();
	var _super = {};
	
	var _language = new Language().instance;
	
	var _addButton;
	var _calorieList;
	var _calorieListData = [];
	var _dailyCalories = 0;
	
	defineProperty( that, "dailyCalories", {
		get: function() { return _dailyCalories; },
		set: function( value ) { _dailyCalories = value; }
	});
	
	defineProperty( that, "calorieList", {
		get: function() { return _calorieListData; },
		set: function( value ) {
			var originalCalorieListData = value;
			_calorieListData = [];
			if ( originalCalorieListData.length == 0 ) return;
			
			var i;
			var l = originalCalorieListData.length;
			var calorieList = [];
			var calorieData;
			var timeStamp = 0;
			var lastTimeStamp = 0;
			var sumCalories = 0;
			for ( i = 0; i < l; i++ ) {
				calorieData = new CalorieDataVo( originalCalorieListData[ i ] );
				calorieData.type = CalorieDataVo.TYPE_FOOD;
				
				timeStamp = calorieData.timestamp.split( " " );
				if ( i == 0 ) lastTimeStamp = timeStamp[ 0 ];
				if ( timeStamp[ 0 ] != lastTimeStamp ) {
					_calorieListData.push( createTimeLabel( originalCalorieListData[ i - 1 ], sumCalories, that.dailyCalories ) );
					
					lastTimeStamp = timeStamp[ 0 ];
					sumCalories = 0;
				}
				
				sumCalories += ( calorieData.foodData.type == 2 ? -1 : 1 ) * Number( calorieData.foodData.calories );
				_calorieListData.push( calorieData );
				
				if ( i == ( l - 1 ) ) {
					_calorieListData.push( createTimeLabel( originalCalorieListData[ i ], sumCalories, that.dailyCalories ) );
				}
			}
			
			_calorieListData.sort(function( a, b ) {
				if ( a.timestamp > b.timestamp ) return -1;
				if ( a.timestamp < b.timestamp ) return 1;
				return 0;
			});
			
			l = _calorieListData.length;
			for ( i = 0; i < l; i++ ) {
				calorieList.push( _calorieListData[ i ] );
			}
			
			_calorieList.setList( calorieList );
		}
	});
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		_addButton.setSize( that._container.width, that._container.height );
		_addButton.drawNow();
		
		_calorieList.move( 0, AbstractInAppView.GAP );
		//_calorieList.setSize( that._container.width, that._container.height - _addButton.height - _calorieList.y - AbstractInAppView.GAP );
		_calorieList.width = that._container.width;
		_calorieList.drawNow();
		_calorieList.height = _calorieList.getChildAt( 0 ).calcHeight + _addButton.height * 2;
	}
	
	function createTimeLabel( data, sumCalories, maxCalories ) {
		var timeLabelData = new CalorieDataVo( data );
			timeLabelData.timestamp += " ";
			timeLabelData.type = CalorieDataVo.TYPE_TIME;
			timeLabelData.sumCalories = sumCalories;
			timeLabelData.maxCalories = maxCalories;
		return timeLabelData;
	}
	
	function removedFromStage() {
		_calorieList.clearList();
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
		
		_calorieList = new ASJS.CustomList();
		_calorieList.cell = CalorieListCell;
		_calorieList.addEventListener( FoodListCell.DELETE, function( event, cell ) {
			if ( !cell ) return;
			that.dispatchEvent( CaloriesMediator.DELETE_ITEM, [ cell.data ] );
		});
		that._container.addChild( _calorieList );
		
		_addButton = new AddButton();
		_addButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( CaloriesMediator.ON_ADD_CLICK );
		});
		that._container.addChild( _addButton );
	})();
	
	return that;
}
