<?php
	require_once( dirname( __FILE__ ) . '/Food.class.php' );
	
	class Statistics {
		
		public function getByData( $data ) {
			$food = new Food();
			
			$userId =	$_SESSION[ "userId" ];
			$from = date('Y-m-d', strtotime( $data[ "from" ] ) );
			$to = date('Y-m-d', strtotime( $data[ "to" ] ) + ( 24 * 60 * 60 * 1000 ) );
			
			$response = array();
			$helper = array();
			$lastTimestamp = 0;
			$result = SQL::query( "SELECT * FROM calories WHERE user_id = " . $userId . " AND timestamp >= '" . $from . "' AND timestamp < '" . $to . "' ORDER BY timestamp DESC;" );
			$l = $result->num_rows;
			for ( $i = 0; $i < $l; $i++ ) {
				$line = SQL::fetchAssoc( $result );
				$foodData = $food->getById( $line[ "food_id" ] );
				$time = explode( " ", $line[ "timestamp" ] );
				if ( !isset( $helper[ $time[ 0 ] ] ) ) $helper[ $time[ 0 ] ] = 0;
				$helper[ $time[ 0 ] ] += ( $foodData[ "type" ] == 2 ? -1 : 1 ) * (int)$foodData[ "calories" ];
			}
			
			foreach ( $helper as $key => $value ) {
				array_push( $response, array(
					"timestamp" => $key,
					"calories" => $value
				));
			}
			
			return $response;
		}
		
	}
?>
