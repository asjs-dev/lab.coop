includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/view/AbstractModalView.js" );

includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "org/asjs/display/form/asjs.Button.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

includeOnce( "com/lab.coop/view/assets/Label.js" );
includeOnce( "com/lab.coop/view/assets/Button.js" );

includeOnce( "com/lab.coop/mediator/AddCalorieEntryMediator.js" );

includeOnce( "com/lab.coop/view/assets/AddFoodListCell.js" );
includeOnce( "com/lab.coop/mediator/FoodListMediator.js" );
includeOnce( "com/lab.coop/model/vo/FoodDataVo.js" );

function AddCalorieEntryView() {
	var that = new AbstractModalView();
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var _addCalorieEntryLabel;
	
	var _foodList;
	var _foodListData = [];
	
	var _addButton;
	var _cancelButton;
	
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
	
	that.drawNow = function() {
		_addCalorieEntryLabel.move( 0, AbstractInAppView.GAP );
		_addCalorieEntryLabel.setSize( that.width, that.height );
		_addCalorieEntryLabel.drawNow();
		
		_addButton.drawNow();
		_cancelButton.drawNow();
		
		_foodList.move( _addCalorieEntryLabel.x, _addCalorieEntryLabel.y + _addCalorieEntryLabel.height + AbstractInAppView.GAP );
		_foodList.width = that.width;
		_foodList.drawNow();
		_foodList.height = _foodList.getChildAt( 0 ).calcHeight + ( _addButton.calcHeight + AbstractInAppView.GAP * 2 ) * 3;
		
		_cancelButton.move( ( that.width - _addButton.calcWidth ) * 0.5, that.height - _cancelButton.calcHeight - AbstractInAppView.GAP * 2 );
		_addButton.move( _cancelButton.x, _cancelButton.y - _addButton.calcHeight - AbstractInAppView.GAP * 2 );
	}
	
	function removedFromStage() {
		_foodList.clearList();
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.REMOVED_FROM_STAGE, removedFromStage );
		
		_addCalorieEntryLabel = new Label();
		_addCalorieEntryLabel.text = _language.getText( "add_calorie_entry_label" );
		_addCalorieEntryLabel.icon = "images/icons/add.png";
		that.addChild( _addCalorieEntryLabel );
		
		_foodList = new ASJS.CustomList();
		_foodList.addClass( "food_list" );
		_foodList.cell = AddFoodListCell;
		_foodList.addEventListener( ASJS.CustomList.CHANGE, function( event ) {
			var selected = _foodList.selected;
			var cell = selected[ 0 ];
			if ( !cell ) return;
			that.dispatchEvent( AddCalorieEntryMediator.ON_ADD_CLICK, [ cell.data ] );
		});
		that.addChild( _foodList );
		
		_addButton = new Button();
		_addButton.setCSS( "position", "fixed" );
		_addButton.addClass( "button" );
		_addButton.label = _language.getText( "add_new_food" );
		_addButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( AddCalorieEntryMediator.ON_ADD_NEW_FOOD_ENTRY_CLICK );
		});
		that.addChild( _addButton );
		
		_cancelButton = new Button();
		_cancelButton.setCSS( "position", "fixed" );
		_cancelButton.addClass( "button" );
		_cancelButton.label = _language.getText( "cancel" );
		_cancelButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( AddCalorieEntryMediator.ON_CANCEL_CLICK );
		});
		that.addChild( _cancelButton );
	})();
	
	return that;
}
