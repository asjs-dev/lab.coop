<?php
	abstract class AbstractAPI {
		protected $method = '';
		protected $endpoint = '';
		protected $args = array();
		protected $file = null;
		protected $data = null;
	
		public function __construct( $request ) {
			header( "Access-Control-Allow-Orgin: *" );
			header( "Access-Control-Allow-Methods: *" );
			header( "Content-Type: application/json" );

			$this->args = explode( '/', rtrim( $request, '/' ) );
			$this->endpoint = array_shift( $this->args );

			$this->method = $_SERVER[ 'REQUEST_METHOD' ];
			if ( $this->method == 'POST' && array_key_exists( 'HTTP_X_HTTP_METHOD', $_SERVER ) ) {
				if ( $_SERVER[ 'HTTP_X_HTTP_METHOD' ] == 'DELETE' ) {
					$this->method = 'DELETE';
				} else if ( $_SERVER[ 'HTTP_X_HTTP_METHOD' ] == 'PUT' ) {
					$this->method = 'PUT';
				} else {
					throw new Exception( "Unexpected Header" );
				}
			}
			
			$this->data = $this->_cleanInputs( $_POST );
			$this->file = json_decode( file_get_contents( "php://input" ), true );
			
			switch ( $this->method ) {
				case 'POST':
				case 'DELETE':
				case 'GET':
				case 'PUT':
				break;
				default: $this->_response( 'Invalid Method', 405 );
				break;
			}
		}
		
		public function processAPI() {
			if ( method_exists( $this, $this->endpoint ) ) {
				return $this->_response( $this->{ $this->endpoint }( $this->args ) );
			}
			return $this->_response( "No Endpoint: $this->endpoint", 404 );
		}

		protected function _response( $data, $status = 200 ) {
			header( "HTTP/1.1 " . $status . " " . $this->_requestStatus( $status ) );
			return json_encode( $data );
		}

		private function _cleanInputs( $data ) {
			$clean_input = Array();
			if ( is_array( $data ) ) {
				foreach ( $data as $k => $v ) {
					$clean_input[ $k ] = $this->_cleanInputs( $v );
				}
			} else {
				$clean_input = trim( strip_tags( $data ) );
			}
			return $clean_input;
		}

		private function _requestStatus( $code ) {
			$status = array(
				200 => 'OK',
				400 => 'Bad Request',
				401 => 'Unauthorized',
				404 => 'Not Found',
				405 => 'Method Not Allowed',
				500 => 'Internal Server Error',
			); 
			return ( $status[ $code ] ) ? $status[ $code ] : $status[ 500 ]; 
		}
	}
?>
