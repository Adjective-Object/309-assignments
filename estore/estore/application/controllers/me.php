<?php

// root loader that handles view loading, puts global elements into page.
class Me extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');
	}

	function index() {
		$this->load->view('templates/header'); // header
		$this->load->view('templates/footer'); // footer
	}


	function addcart($id) {
		$this->load->model('product_model');
		$product = $this->product_model->get($id);
		if ($product == NULL) {
			header("Location: /estore/");
			die();
		} else{
			$g = $this->session->userdata("cart");
			array_push($g, $id);
			$this->session->set_userdata(array("cart" => $g));
			header("Location: /estore/index.php/store/read/".$id);
			die();
		}
	}

	function removecart($id){
		$g = $this->session->userdata("cart");
		$key = array_search($id, $g);
		if ($key !== FALSE) {
		  unset($g[$key]);
	    }
		$this->session->set_userdata(array("cart" => array_values($g)));
		header("Location: /estore/index.php/me/cart/".$id);
		die();

	}

	function cart() {
		$data = array();
		$this->load->model('product_model');
		$data['cart'] = $this->session->userdata("cart");
		$data['title'] = "cart";

		if(sizeof($data['cart']) > 0 && isset($_POST["amount_".$data['cart'][0]])) {
			$vals = array_unique($data['cart']);
			$newcart = array();
			foreach($vals as $id) {
				for($i=0; $i<$_POST["amount_".$id]; $i++){
					array_push($newcart,$id);
				}
			}
			$this->session->set_userdata("cart", $newcart);
			header("Location: /estore/index.php/me/checkout/".$id);
			die();
		}

		$this->load->view('templates/header', $data); // header
		$this->load->view('product/cartlist.php',$data);
		$this->load->view('templates/footer'); // footer
	}

	function checkout() {
		if (isset($_POST['card_number'])) {
			$this->__doTransaction();
			header("Location: /estore/index.php/me/confirmed/".$id);
			die();
		}

		$data['cart'] = $this->session->userdata("cart");
		$data['title'] = "checkout";
		$this->load->model('product_model');

		$totalcost = 0;
		$amts = array_count_values($data['cart']);
		
		foreach ($amts as $pid => $amt) {
			$product = $this->product_model->get($pid);
			$totalcost = $totalcost + $amt * $product->price;
		}

		$data['cost'] = $totalcost;

		$this->load->view('templates/header', $data); // header
		$this->load->view('templates/checkout', $data); // header
		$this->load->view('templates/footer'); // footer

		
	}


	function __doTransaction(){
		$this->load->library('email');
		
		$config = Array(
		    'protocol' => "smtp",
		    'smtp_host' => "ssl://smtp.googlemail.com",
		    'smtp_port' => 465,
		    'smtp_user' => "309estore",
		    'smtp_pass' => "itsanillusion",
		    'mailtype'  => "html", 
		    'charset'   => "iso-8859-1"
		);
		$this->load->library('email', $config);
		$this->email->set_newline("\r\n");

		date_default_timezone_set( 'America/New_York' );

		$this->email->initialize($config);


		$this->email->from("309estore@gmail.com", "EshopBot");
		$this->email->to($this->session->userdata('email'));
		$this->email->subject("purchase receipt");

		$msg = $this->__getReceipt();

		$this->email->message($msg);
		$this->email->send();
	}

	function confirmed(){
		//do receipt
		echo "<style>";
		echo file_get_contents(getcwd()."/css/receipt.css");
		echo "</style>";
		echo $this->__getReceipt();
		echo "<section id='afterbuttons'> ".
				"<p> Please print this receipt with your browser (Ctrl+P in chrome/firefox) </p>" .
				"<a href='/estore/' id='return'>click here after printing to return home</a> " .
			"</section>";
		//clear cart
		$this->session->set_userdata('cart', array());
	}

	function __getReceipt(){
		$this->load->model('product_model');

		$totalcost = 0;
		$amts = array_count_values($this->session->userdata('cart'));
		$msg = "<section id='receipt'><p>This is a confirmation of purchase (receipt) <br> You purchased: <br></p>";
		
		foreach ($amts as $pid => $amt) {
			$product = $this->product_model->get($pid);
			$msg = $msg . "<p>" . $amt . " of " . $product->name . "    ($". $product->price ." each) </p>";
			$totalcost = $totalcost + $amt * $product->price;
		}

		$msg = $msg . "<p>for a grand total of $" . $totalcost . " CDN.</p>" .
			"<p>Thank you for shopping with us</p>" .
			"</section>";
		return $msg;
	}

}