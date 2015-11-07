includeOnce( "com/asjs/model/Config.js" );
includeOnce( "org/asjs/event/asjs.LoaderEvent.js" );
includeOnce( "org/asjs/net/asjs.Loader.js" );
includeOnce( "org/asjs/net/asjs.RequestMethod.js" );

function Services() {
	function ServicesInstance() {
		var that = {};
		
		var _config = new Config().instance;
		
		that.login = function( facebookData, callback, errorCallback ) {
			load( "login", facebookData, ASJS.RequestMethod.POST, callback, errorCallback );
		}
		
		that.status = function( callback, errorCallback ) {
			load( "status", null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.logout = function( callback, errorCallback ) {
			load( "logout", null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.getFoodList = function( callback, errorCallback ) {
			load( "food", null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.getFoodById = function( foodId, callback, errorCallback ) {
			load( "food/" + foodId, null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.addFood = function( foodData, callback, errorCallback ) {
			load( "food", foodData, ASJS.RequestMethod.POST, callback, errorCallback );
		}
		/*
		that.setFood = function( foodId, foodData, callback, errorCallback ) {
			load( "food/" + foodId, foodData, ASJS.RequestMethod.PUT, callback, errorCallback );
		}
		*/
		that.deleteFoodById = function( foodId, callback, errorCallback ) {
			load( "food/" + foodId, null, ASJS.RequestMethod.DELETE, callback, errorCallback );
		}
		
		that.getCaloriesList = function( callback, errorCallback ) {
			load( "calories", null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.addCalorie = function( calorieData, callback, errorCallback ) {
			load( "calories", calorieData, ASJS.RequestMethod.POST, callback, errorCallback );
		}
		
		that.deleteCalorieById = function( calorieId, callback, errorCallback ) {
			load( "calories/" + calorieId, null, ASJS.RequestMethod.DELETE, callback, errorCallback );
		}
		
		that.getStatistics = function( statisticData, callback, errorCallback ) {
			load( "statistics", statisticData, ASJS.RequestMethod.POST, callback, errorCallback );
		}
		
		that.getSettings = function( callback, errorCallback ) {
			load( "settings", null, ASJS.RequestMethod.GET, callback, errorCallback );
		}
		
		that.setSettings = function( settingsData, callback, errorCallback ) {
			load( "settings", settingsData, ASJS.RequestMethod.PUT, callback, errorCallback );
		}
		
		function parseResponse( response ) {
			try {
				return JSON.parse( response );
			} catch ( e ) {}
			return response;
		}
	
		function load( url, data, method, callback, errorCallback ) {
			var loader = new ASJS.Loader();
				setUpLoader( loader, method, callback, errorCallback );
				loader.dataType = "json";
				if ( data ) loader.data = JSON.stringify( data );
				loader.load( _config.get( "backendURL" ) + url );
		}
		
		function setUpLoader( loader, method, callback, errorCallback ) {
			loader.addEventListener( ASJS.LoaderEvent.LOAD, function( event ) {
				onLoadHandler( loader, callback, errorCallback, errorCallback );
			});
			loader.addEventListener( ASJS.LoaderEvent.ERROR, function( event ) {
				onErrorHandler( loader, errorCallback );
			});
			loader.addEventListener( ASJS.LoaderEvent.PROGRESS, function( event ) {} );
			loader.requestType = method;
		}
		
		function onLoadHandler( loader, callback, errorCallback ) {
			loader.removeEventListeners();
			var response = parseResponse( loader.content );
			callback( response );
		}
	
		function onErrorHandler( loader, errorCallback ) {
			loader.removeEventListeners();
			var response = parseResponse( loader.content );
			errorCallback( response, response.status );
		}
		
		return that;
	}
	
	defineProperty( this, "instance", {
		get: function() {
			if ( !Services.$ ) Services.$ = new ServicesInstance();
			return Services.$;
		}
	});
};
