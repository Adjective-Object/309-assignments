<?php
class Orders extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');

		$this->load->model("customer_model");
	}

	function index() {
		$this->load->model('Order');
		$this->load->model('order_model');
    	$orders = $this->order_model->getAll();


		$data = array("title" => "Orders",
						"orders" => $orders);
		
		$this->load->view('templates/header', $data); // header

    	$this->load->view('orders/list.php',$data);

		$this->load->view('templates/footer'); // footer
	}

}