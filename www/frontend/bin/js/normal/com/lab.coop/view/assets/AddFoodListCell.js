includeOnce( "com/lab.coop/view/assets/FoodListCell.js" );

function AddFoodListCell() {
	var that = new FoodListCell();
	
	(function() {
		that._deleteButton.removeEventListeners();
		that.removeChild( that._deleteButton );
	})();
	
	return that;
}
