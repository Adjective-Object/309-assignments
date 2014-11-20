<?php
class Customers extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');

		$this->load->model("customer_model");
	}

	function index() {
		$this->load->model('Customer');
		$this->load->model('customer_model');
    	$customers = $this->customer_model->getAll();


		$data = array("title" => "Orders",
						"customers" => $customers);
		
		$this->load->view('templates/header', $data); // header

    	$this->load->view('customer/list.php',$data);

		$this->load->view('templates/footer'); // footer
	}

	function delete($id) {
		$this->load->model('Customer');
		$this->load->model('customer_model');
    	$admin = $this->customer_model->get("admin", "admin");
	    if ($id != $admin->id){
	    	$this->customer_model->delete($id);    		
    	}
       	header("Location: /estore/index.php/customers");
    	die();

	}

}