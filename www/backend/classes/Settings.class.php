<?php
	class Settings {
		
		public function get() {
			$result = SQL::query( "SELECT daily_calories FROM users WHERE id = '" . $_SESSION[ "userId" ] . "' LIMIT 1;" );
			return SQL::fetchAssoc( $result );
		}
		
		public function set( $data ) {
			$userId =			$_SESSION[ "userId" ];
			$dailyCalories =	filter_var( $data[ "daily_calories" ], FILTER_SANITIZE_NUMBER_INT );
			
			$query = "UPDATE users SET daily_calories = " . $dailyCalories . " WHERE id = " . $userId . ";";
			$result = SQL::query( $query );
			return $result;
		}
		
	}
?>
