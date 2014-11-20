<?php

// root loader that handles view loading, puts global elements into page.
class Login extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');

		$this->load->model("customer_model");
	}

	function index() {
		$this->load->model("Customer");
		$this->load->model("customer_model");
		if ($this->session->userdata("logged_in")) {
			header("Location: /estore/");
			die();
		} else{

			$user = $this->customer_model->get(
				$_POST["login"], $_POST["password"]
			);
			if ($user != NULL) {
				$this->session->set_userdata(array(
					"logged_in" => TRUE,
					"username" => $user->login,
					"uid" => $user->id,
					"first" => $user->first,
					"last" => $user->last,
					"cart" => array(),
					"email" => $user->email,
					"is_admin" => ($user->login == "admin"),
				));
				
				header("Location: /estore/");
				die();
			} else{
				header("Location: /estore/index.php/login/loginError");
				die();
			}				
		
		}
	}

	function loginError() {
		$this->load->view('templates/header'); // header
		$this->load->view('pages/login_error'); // header
		$this->load->view('templates/footer'); // footer

	}

	function logOut(){
		$this->session->unset_userdata();
		$this->session->sess_destroy();
		header("Location: /estore/");
		die();
	}
}