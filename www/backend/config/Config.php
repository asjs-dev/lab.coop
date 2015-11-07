<?php
	class Config {
		protected static $sql_host = "localhost";
		protected static $sql_user = "xxxx";
		protected static $sql_pass = "xxxx";
		protected static $sql_db = "lab_coop";
		
		public static function getSQLHost() {
			return self::$sql_host;
		}
		
		public static function getSQLPort() {
			return self::$sql_port;
		}
		
		public static function getSQLUser() {
			return self::$sql_user;
		}
		
		public static function getSQLPass() {
			return self::$sql_pass;
		}
		
		public static function getSQLDB() {
			return self::$sql_db;
		}
	}
?>
