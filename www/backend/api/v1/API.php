<?php
	require_once( dirname( __FILE__ ) . '/../../classes/AbstractAPI.class.php' );
	require_once( dirname( __FILE__ ) . '/../../classes/Session.class.php' );
	require_once( dirname( __FILE__ ) . '/../../classes/Food.class.php' );
	require_once( dirname( __FILE__ ) . '/../../classes/Calories.class.php' );
	require_once( dirname( __FILE__ ) . '/../../classes/Statistics.class.php' );
	require_once( dirname( __FILE__ ) . '/../../classes/Settings.class.php' );
	
	class API extends AbstractAPI {
		
		protected $id = null;
		protected $data = null;
		
		protected $session = null;
		
		public function __construct( $request, $origin ) {
			parent::__construct( $request );
			
			$this->session = new Session();
			
			$this->id = isset( $this->args[ 0 ] ) ? $this->args[ 0 ] : null;
			$this->data = isset( $this->file ) ? $this->file : null;
		}
		
		protected function login() {
			if ( $this->session->status() ) return $this->_response( "Authenticated", 401 );
			
			if ( $this->method == 'POST' ) {
				if ( $this->data ) return $this->session->login( $this->data );
			}
			
			return "";
		}
		
		protected function status() {
			if ( $this->method == 'GET' ) {
				return $this->session->status() ? $this->_response( "OK", 200 ) : $this->_response( "Authentication Required", 401 );
			}
			return "";
		}
		
		protected function logout() {
			if ( $this->method == 'GET' ) {
				return $this->session->logout();
			}
			return "";
		}
		
		protected function settings() {
			if ( !$this->session->status() ) return $this->_response( "Authentication Required", 401 );
			
			$settings = new Settings();
			if ( $this->method == 'GET' ) {
				return $settings->get();
			} else if ( $this->method == 'PUT' ) {
				if ( $this->data ) return $settings->set( $this->data );
			}
			
			return "";
		}
		
		protected function food() {
			if ( !$this->session->status() ) return $this->_response( "Authentication Required", 401 );
			
			$food = new Food();
			if ( $this->method == 'GET' ) {
				if ( $this->id ) return $food->getById( $this->id );
				return $food->getList();
			} /*else if ( $this->method == 'PUT' ) {
				if ( $this->id ) return $food->setById( $this->id, $this->data );
			}*/ else if ( $this->method == 'POST' ) {
				if ( $this->data ) return $food->create( $this->data );
			} else if ( $this->method == 'DELETE' ) {
				if ( $this->id ) return $food->deleteById( $this->id );
			}
			return "";
		}
		
		protected function calories() {
			if ( !$this->session->status() ) return $this->_response( "Authentication Required", 401 );
			
			$calories = new Calories();
			if ( $this->method == 'GET' ) {
				return $calories->getList();
			} else if ( $this->method == 'POST' ) {
				if ( $this->data ) return $calories->addEntry( $this->data );
			} else if ( $this->method == 'DELETE' ) {
				if ( $this->id ) return $calories->deleteById( $this->id );
			}
			return "";
		}
		
		protected function statistics() {
			if ( !$this->session->status() ) return $this->_response( "Authentication Required", 401 );
			
			$statistics = new Statistics();
			if ( $this->method == 'POST' ) {
				if ( $this->data ) return $statistics->getByData( $this->data );
			}
			return "";
		}
	}
?>
