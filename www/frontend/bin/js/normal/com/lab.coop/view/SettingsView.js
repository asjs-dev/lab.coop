includeOnce( "com/asjs/model/Language.js" );

includeOnce( "org/asjs/event/asjs.MouseEvent.js" );

includeOnce( "org/commons/mobileUtils/MobileUtils.js" );

includeOnce( "com/lab.coop/view/assets/Label.js" );
includeOnce( "com/lab.coop/view/assets/TextInput.js" );
includeOnce( "com/lab.coop/view/assets/Button.js" );
includeOnce( "com/lab.coop/view/AbstractInAppView.js" );
includeOnce( "com/lab.coop/mediator/SettingsMediator.js" );

function SettingsView() {
	var that = new AbstractInAppView();
	var _super = {};
	
	var _language = new Language().instance;
	var _mobileUtils = new MobileUtils().instance;
	
	var _dailyCaloriesLabel;
	var _dailyCaloriesInput;
	var _saveButton;
	
	defineProperty( that, "dailyCalories", {
		get: function() { return Number( _dailyCaloriesInput.val ); },
		set: function( value ) { _dailyCaloriesInput.val = Math.max( value, 0 ); }
	});
	
	extendFunction( _super, that, "drawNow" );
	that.drawNow = function() {
		_super.drawNow();
		
		var inputButtonGap = AbstractInAppView.GAP * 3;
		
		_dailyCaloriesLabel.move( 0, AbstractInAppView.GAP );
		_dailyCaloriesLabel.setSize( that._container.width, that._container.height );
		_dailyCaloriesLabel.drawNow();
		
		_dailyCaloriesInput.drawNow();
		_saveButton.drawNow();
		
		_dailyCaloriesInput.move(
			( that._container.width - _dailyCaloriesInput.calcWidth ) * 0.5, 
			_dailyCaloriesLabel.y + _dailyCaloriesLabel.height + ( ( ( that._container.height - ( AbstractInAppView.GAP + _dailyCaloriesLabel.height ) ) - ( _dailyCaloriesInput.calcHeight + _saveButton.calcHeight + inputButtonGap ) ) * 0.5 )
		);
		
		_saveButton.move( ( that._container.width - _saveButton.calcWidth ) * 0.5, _dailyCaloriesInput.y + _dailyCaloriesInput.calcHeight + inputButtonGap );
	}
	
	(function() {
		_dailyCaloriesLabel = new Label();
		_dailyCaloriesLabel.text = _language.getText( "daily_calories_label" );
		_dailyCaloriesLabel.icon = "images/icons/settings.png";
		that._container.addChild( _dailyCaloriesLabel );
		
		_dailyCaloriesInput = new TextInput();
		_dailyCaloriesInput.restrict = "[0-9]";
		_dailyCaloriesInput.maxChar = 5;
		that._container.addChild( _dailyCaloriesInput );
		
		_saveButton = new Button();
		_saveButton.addClass( "button" );
		_saveButton.label = _language.getText( "save" );
		_saveButton.addEventListener( ASJS.MouseEvent.CLICK, function( event ) {
			that.dispatchEvent( SettingsMediator.ON_SAVE_CLICK );
		});
		that._container.addChild( _saveButton );
	})();
	
	return that;
}
