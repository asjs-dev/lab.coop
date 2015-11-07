<?php
	require_once( dirname( __FILE__ ) . "/SQL.class.php" );
	
	class User {
		
		public function getById( $id ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "SELECT * FROM users WHERE id = '" .  $selectId . "' LIMIT 1;" );
			return SQL::fetchAssoc( $result );
		}
		
		public function getByFacebookId( $id ) {
			$facebookId = filter_var( $id, FILTER_SANITIZE_STRING );
			
			$result = SQL::query( "SELECT * FROM users WHERE facebook_id = '" .  $facebookId . "' LIMIT 1;" );
			return SQL::fetchAssoc( $result );
		}
		
		public function getList() {
			$result = SQL::query( "SELECT * FROM users;" );
			$response = array();
			for ( $i = 0; $i < $result->num_rows; $i++ ) {
				$line = SQL::fetchAssoc( $result );
				array_push( $response, $line );
			}
			return $response;
		}
		
		public function create( $data ) {
			$facebookId = filter_var( $data[ "facebookId" ], FILTER_SANITIZE_STRING );
			
			$result = SQL::query( "INSERT INTO users ( facebook_id ) VALUES ( '" . $facebookId . "' );" );
			return $result;
		}
		/*
		public function setById( $id, $data, $where = "" ) {
			$query = "UPDATE users SET ";
			$i = 0;
			foreach ( $data as $key => $value ) {
				if ( $i > 0 ) $query .= ", ";
				$query .= $key . " = " . $value;
				$i++;
			}
			$query .= " WHERE id = " . $id . " " . $where . ";";
			$result = SQL::query( $query );
			return $result;
		}
		*/
		public function deleteById( $id ) {
			$selectId = filter_var( $id, FILTER_SANITIZE_NUMBER_INT );
			
			$result = SQL::query( "DELETE FROM users WHERE id = " . $selectId . ";" );
			return array( "success" => $result );
		}
	}
?>
