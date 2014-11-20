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

	function delete($id) {
		$this->load->model('order_model');
    	$this->order_model->delete($id);
    	header("Location: /estore/index.php/orders");
    	die();
	}

	function contents($order_id){
		$this->load->model('Order_items');
		$this->load->model('order_items_model');
		$this->load->model('product_model');
    	$items = $this->order_items_model->getBy($order_id);

		$data = array("title" => "Items for Order ".$order_id,
						"items" => $items,
						"order_id" => $order_id);

		$this->load->view('templates/header', $data); // header

    	$this->load->view('orders/items_list.php',$data);

		$this->load->view('templates/footer'); // footer
    	
	}

}