includeOnce( "org/asjs/display/asjs.Sprite.js" );
includeOnce( "org/asjs/display/asjs.Stage.js" );
includeOnce( "com/asjs/model/Config.js" );

function AbstractView() {
	var that = new ASJS.Sprite();
	
	var _config = new Config().instance;
	
	function addedToStage() {
		that.alpha = 0;
		$( that ).stop().animate( { alpha: 1 }, { duration: _config.get( "fadeInterval" ) } );
	}
	
	(function() {
		that.addEventListener( ASJS.Stage.ADDED_TO_STAGE, addedToStage );
	})();
	
	return that;
}
