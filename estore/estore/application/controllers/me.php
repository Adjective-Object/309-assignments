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
		$this->load->view('templates/header', $data); // header

		$this->load->view('product/cartlist.php',$data);


		$this->load->view('templates/footer'); // footer
	}

	function checkout() {
		$data['cart'] = $this->session->userdata("cart");
		$data['title'] = "checkout";

		$totalcost = 0;
		foreach ($counts as $pid => $amt) {
			$product = $this->product_model->get($pid);
			$totalcost = $totalcost + $amt * $product->price;
		}

		$data['cost'] = $cost;
		$this->load->view('templates/header', $data); // header

		$this->load->view('product/cartlist.php',$data);


		$this->load->view('templates/footer'); // footer

		
	}

}