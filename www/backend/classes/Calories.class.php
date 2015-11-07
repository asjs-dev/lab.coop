<?php
	require_once( dirname( __FILE__ ) . '/Food.class.php' );
	
	class Calories {
		
		public function getList() {
			$food = new Food();
			
			$result = SQL::query( "SELECT * FROM calories;" );
			$response = array();
			for ( $i = 0; $i < $result->num_rows; $i++ ) {
				$line = SQL::fetchAssoc( $result );
				$foodData = $food->getById( $line[ "food_id" ] );
				$line[ "food_data" ] = $foodData;
				array_push( $response, $line );
			}
			return $response;
		}
		
		public function addEntry( $data ) {
			$userId =	$_SESSION[ "userId" ];
			$foodId =	filter_var( $data[ "foodId" ], FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "INSERT INTO calories ( user_id, food_id, timestamp ) VALUES ( " . $userId . ", " . $foodId . ", NOW() );" );
			return $result;
		}
		
		public function foodExistsInCaloriesList( $id ) {
			$userId =	$_SESSION[ "userId" ];
			$foodId =	filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
		
			$result = SQL::query( "SELECT * FROM calories WHERE user_id = " . $userId . " AND food_id = " . $foodId . ";" );
			return $result->num_rows > 0;
		}
		
		public function deleteById( $id ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "DELETE FROM calories WHERE id = " . $selectId . ";" );
			return array( "success" => $result );
		}
	}
?>
