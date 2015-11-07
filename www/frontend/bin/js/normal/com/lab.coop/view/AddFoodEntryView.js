includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/view/AbstractModalView.js" );

includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "org/asjs/display/form/asjs.Button.js" );
includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.DisplayObject.js" );

includeOnce( "com/lab.coop/view/assets/Label.js" );
includeOnce( "com/lab.coop/view/assets/TextInput.js" );
includeOnce( "com/lab.coop/view/assets/Button.js" );

includeOnce( "com/lab.coop/mediator/AddFoodEntryMediator.js" );

function AddFoodEntryView() {
	var that = new AbstractModalView();
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var CALORIE_TYPE_BUTTON_SIZE = 100;
	var CALORIE_TYPE_BORDER_SIZE = 2;
	
	var _type = 0;
	
	var _addFoodEntryLabel;
	
	var _foodButton;
	var _drinkButton;
	var _sportButton;
	
	var _calorieTypeIcon;
	var _nameInput;
	var _calorieInput;
	
	var _saveButton;
	var _cancelButton;
	
	defineProperty( that, "foodType", {
		get: function() { return _type; }
	});
	
	defineProperty( that, "foodName", {
		get: function() { return _nameInput.val; }
	});
	
	defineProperty( that, "foodCalories", {
		get: function() { return Number( _calorieInput.val ); }
	});
	
	that.reset = function() {
		_type = 0;
		_calorieInput.val = "0";
		switchCalorieType( _foodButton );
	}
	
	that.drawNow = function() {
		_addFoodEntryLabel.move( 0, AbstractInAppView.GAP );
		_addFoodEntryLabel.setSize( that.width, that.height );
		_addFoodEntryLabel.drawNow();
		
		var calorieTypeButtonSize = _mobileUtils.convertRatio( CALORIE_TYPE_BUTTON_SIZE, true );
		var calorieTypeButtonCalcSize = Math.min( calorieTypeButtonSize, CALORIE_TYPE_BUTTON_SIZE );
		
		var calorieTypeBorderSize = _mobileUtils.convertRatio( CALORIE_TYPE_BORDER_SIZE, true );
		var calorieTypeBorderCalcSize = Math.min( calorieTypeBorderSize, CALORIE_TYPE_BORDER_SIZE );
		
		_foodButton.setSize( calorieTypeButtonCalcSize, calorieTypeButtonCalcSize );
		_foodButton.setCSS( "border-width", calorieTypeBorderCalcSize + "px" );
		
		_drinkButton.setSize( calorieTypeButtonCalcSize, calorieTypeButtonCalcSize );
		_drinkButton.setCSS( "border-width", calorieTypeBorderCalcSize + "px" );
		
		_sportButton.setSize( calorieTypeButtonCalcSize, calorieTypeButtonCalcSize );
		_sportButton.setCSS( "border-width", calorieTypeBorderCalcSize + "px" );
		
		_foodButton.move(
			( that.width - ( ( _foodButton.width + AbstractInAppView.GAP * 3 ) * 3 - AbstractInAppView.GAP * 3 ) ) * 0.5,
			_addFoodEntryLabel.y + _addFoodEntryLabel.height + AbstractInAppView.GAP * 2
		);
		_drinkButton.move( _foodButton.x + _foodButton.width + AbstractInAppView.GAP * 3, _foodButton.y );
		_sportButton.move( _drinkButton.x + _drinkButton.width + AbstractInAppView.GAP * 3, _foodButton.y );
		
		_calorieInput.drawNow();
		_nameInput.drawNow();
		
		_nameInput.move(
			( that.width - _calorieInput.calcWidth ) * 0.5, 
			_foodButton.y + _foodButton.height + AbstractInAppView.GAP * 3
		);
		
		_calorieInput.move(
			( that.width - _calorieInput.calcWidth ) * 0.5, 
			_nameInput.y + _nameInput.height + AbstractInAppView.GAP * 2
		);
		
		_saveButton.drawNow();
		_cancelButton.drawNow();
		
		_saveButton.move( ( that.width - _saveButton.calcWidth ) * 0.5, _calorieInput.y + _calorieInput.calcHeight + AbstractInAppView.GAP * 3 );
		_cancelButton.move( _saveButton.x, _saveButton.y + _saveButton.calcHeight + AbstractInAppView.GAP * 2 );
	}
	
	function switchCalorieType( target ) {
		var minAlpha = 0.4;
		_foodButton.alpha = target == _foodButton ? 1 : minAlpha;
		_drinkButton.alpha = target == _drinkButton ? 1 : minAlpha;
		_sportButton.alpha = target == _sportButton ? 1 : minAlpha;
		
		_nameInput.val = "";
		switch ( target ) {
			case _foodButton:
				_nameInput.placeholder = _language.getText( "food_name_placeholder" );
				_type = 0;
			break;
			case _drinkButton:
				_nameInput.placeholder = _language.getText( "drink_name_placeholder" );
				_type = 1;
			break;
			case _sportButton:
				_nameInput.placeholder = _language.getText( "sport_name_placeholder" );
				_type = 2;
			break;
		}
	}
	
	(function() {
		_addFoodEntryLabel = new Label();
		_addFoodEntryLabel.text = _language.getText( "add_food_entry_label" );
		_addFoodEntryLabel.icon = "images/icons/add.png";
		that.addChild( _addFoodEntryLabel );
		
		_foodButton = new ASJS.Button();
		_foodButton.addClass( "food_button_selector" );
		_foodButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			switchCalorieType( _foodButton );
		});
		that.addChild( _foodButton );
		
		_drinkButton = new ASJS.Button();
		_drinkButton.addClass( "drink_button_selector" );
		_drinkButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			switchCalorieType( _drinkButton );
		});
		that.addChild( _drinkButton );
		
		_sportButton = new ASJS.Button();
		_sportButton.addClass( "sport_button_selector" );
		_sportButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			switchCalorieType( _sportButton );
		});
		that.addChild( _sportButton );
		
		_nameInput = new TextInput();
		_nameInput.maxChar = 30;
		that.addChild( _nameInput );
		
		_calorieInput = new TextInput();
		_calorieInput.restrict = "[0-9]";
		_calorieInput.maxChar = 5;
		that.addChild( _calorieInput );
		
		_saveButton = new Button();
		_saveButton.addClass( "button" );
		_saveButton.label = _language.getText( "save" );
		_saveButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( AddFoodEntryMediator.ON_SAVE_CLICK );
		});
		that.addChild( _saveButton );
		
		_cancelButton = new Button();
		_cancelButton.addClass( "button" );
		_cancelButton.label = _language.getText( "cancel" );
		_cancelButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( AddFoodEntryMediator.ON_CANCEL_CLICK );
		});
		that.addChild( _cancelButton );
		
		that.reset();
	})();
	
	return that;
}
