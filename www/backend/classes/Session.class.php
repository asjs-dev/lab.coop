<?php
	require_once( dirname( __FILE__ ) . "/User.class.php" );
	
	class Session {
		
		public function __construct() {
			session_start();
		}
		
		public function login( $data ) {
			if ( !$this->status() ) {
				$userId = null;
				$facebookId = 			filter_var( $data[ "userID" ], FILTER_SANITIZE_STRING );
				$facebookAccessToken =	filter_var( $data[ "accessToken" ], FILTER_SANITIZE_STRING );
			
				$user = new User();
				$userResult = $user->getByFacebookId( $facebookId );
				if ( $userResult == NULL ) {
					$userResult = $user->create( array( "facebookId" => $facebookId ) );
					$userId = $userResult->insert_id;
				} else $userId = $userResult[ "id" ];
			
				$_SESSION[ "userId" ] = $userId;
				$_SESSION[ "facebookId" ] = $facebookId;
				$_SESSION[ "accessToken" ] = $facebookAccessToken;
			}
			return $data;
		}
		
		public function logout() {
			session_destroy();
			return "";
		}
		
		public function status() {
			return isset( $_SESSION[ "userId" ] );
		}
		
	}
?>
