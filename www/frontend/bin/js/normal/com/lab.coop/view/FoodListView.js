includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "org/asjs/display/list/asjs.CustomList.js" );

includeOnce( "com/lab.coop/view/assets/Label.js" );
includeOnce( "com/lab.coop/view/assets/TextInput.js" );
includeOnce( "com/lab.coop/view/assets/AddButton.js" );
includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/view/assets/FoodListCell.js" );
includeOnce( "com/lab.coop/mediator/FoodListMediator.js" );
includeOnce( "com/lab.coop/model/vo/FoodDataVo.js" );

function FoodListView() {
	var that = new AbstractInAppView();
	var _super = {};
	
	var _language = new Language().instance;
	
	var _foodListLabel;
	var _addButton;
	var _foodList;
	var _foodListData = [];
	
	defineProperty( that, "foodList", {
		get: function() { return _foodListData; },
		set: function( value ) {
			_foodListData = value;
			
			var i;
			var l = _foodListData.length;
			var foodList = [];
			var foodData;
			for ( i = l - 1; i > -1; i-- ){
				foodData = new FoodDataVo( _foodListData[ i ] );
				foodList.push( foodData );
			}
			
			_foodList.setList( foodList );
		}
	});
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		_foodListLabel.move( 0, AbstractInAppView.GAP );
		_foodListLabel.setSize( that._container.width, that._container.height );
		_foodListLabel.drawNow();
		
		_addButton.setSize( that._container.width, that._container.height );
		_addButton.drawNow();
		
		_foodList.move( _foodListLabel.x, _foodListLabel.y + _foodListLabel.height + AbstractInAppView.GAP );
		//_foodList.setSize( that._container.width, that._container.height - _addButton.height - _foodList.y - AbstractInAppView.GAP );
		_foodList.width = that._container.width;
		_foodList.drawNow();
		_foodList.height = _foodList.getChildAt( 0 ).calcHeight + _addButton.calcHeight * 2;
	}
	
	function removedFromStage() {
		_foodList.clearList();
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
		
		_foodListLabel = new Label();
		_foodListLabel.text = _language.getText( "food_list_label" );
		_foodListLabel.icon = "images/icons/food_list.png";
		that._container.addChild( _foodListLabel );
		
		_foodList = new ASJS.CustomList();
		_foodList.addClass( "food_list" );
		_foodList.cell = FoodListCell;
		_foodList.addEventListener( FoodListCell.DELETE, function( event, cell ) {
			if ( !cell ) return;
			that.dispatchEvent( FoodListMediator.DELETE_ITEM, [ cell.data ] );
		});
		that._container.addChild( _foodList );
		
		_addButton = new AddButton();
		_addButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( FoodListMediator.ON_ADD_CLICK );
		});
		that._container.addChild( _addButton );
	})();
	
	return that;
}
