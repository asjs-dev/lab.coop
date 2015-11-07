<?php
	require_once( dirname( __FILE__ ) . '/Calories.class.php' );
	
	class Food {
		
		public function getById( $id ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "SELECT * FROM foods WHERE id = " . $selectId . " LIMIT 1;" );
			return SQL::fetchAssoc( $result );
		}
		
		public function getList() {
			$userId =	$_SESSION[ "userId" ];
			
			$result = SQL::query( "SELECT * FROM foods WHERE user_id = " . $userId . ";" );
			$response = array();
			for ( $i = 0; $i < $result->num_rows; $i++ ) {
				$line = SQL::fetchAssoc( $result );
				array_push( $response, $line );
			}
			return $response;
		}
		
		public function create( $data ) {
			$userId =	$_SESSION[ "userId" ];
			$type =		filter_var( $data[ "type" ], FILTER_SANITIZE_NUMBER_INT );
			$name =		filter_var( $data[ "name" ], FILTER_SANITIZE_STRING );
			$calories = filter_var( $data[ "calories" ], FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "INSERT INTO foods ( user_id, type, name, calories ) VALUES ( " . $userId . ", " . $type . ", '" . $name . "', '" . $calories . "' );" );
			return $result;
		}
		
		public function setById( $id, $data ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			return "Set: " . $selectId . " " . json_encode( $data );
		}
		
		public function deleteById( $id ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			$calories = new Calories();
			$foodExistsInCaloriesList = $calories->foodExistsInCaloriesList( $selectId );
			
			if ( $foodExistsInCaloriesList ) {
				return array( "success" => false );
			} else {
				$result = SQL::query( "DELETE FROM foods WHERE id = " . $selectId . ";" );
				return array( "success" => $result );
			}
		}
	}
?>
