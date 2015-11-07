<?php
	if ( !array_key_exists( 'HTTP_ORIGIN', $_SERVER ) ) {
		$_SERVER[ 'HTTP_ORIGIN' ] = $_SERVER[ 'SERVER_NAME' ];
	}
	
	try {
		require_once( dirname( __FILE__ ) . "/classes/SQL.class.php" );
		require_once( dirname( __FILE__ ) . "/api/v" . $_GET[ "v" ] . "/API.php" );
		
		SQL::connect();
		
		$API = new API( $_REQUEST[ 'request' ], $_SERVER[ 'HTTP_ORIGIN' ] );
		echo $API->processAPI();
		
		SQL::close();
	} catch ( Exception $e ) {
		echo json_encode( Array('error' => $e->getMessage() ) );
	}
?>
