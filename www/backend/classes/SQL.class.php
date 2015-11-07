<?php
	require_once( dirname( __FILE__ ) . '/../config/Config.php' );
	
	class SQL {
		protected static $sql_link = null;
		
		public static function connect() {
			self::$sql_link = new mysqli( Config::getSQLHost(), Config::getSQLUser(), Config::getSQLPass(), Config::getSQLDB() );
			if ( self::$sql_link->connect_error ) die( "Connection failed: " . self::$sql_link->connect_error );
		}

		public static function close() {
			self::$sql_link->close();
		}
		
		public static function query( $query ) {
			return self::$sql_link->query( $query );
		}
		
		public static function fetchAssoc( $result ) {
			return $result->fetch_assoc();
		}
		
	}
?>
