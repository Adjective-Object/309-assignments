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
		$this->load->view('templates/header'); // header
		if($this->session->userdata("logged_in")){
			header("Location: /estore/");
			die();
		} else{
			if($_POST["login"] == "admin" && $_POST["password"] == "admin") {
				$this->session->set_userdata(array(
					"logged_in" => TRUE,
					"username" => "admin",
					"first" => "admin_firstname",
					"last" => "admin_lastname",
					"cart" => array(),
					"is_admin" => TRUE));
				header("Location: /estore/");
				die();
			} else {
				$user = $this->customer_model->get(
					$_POST["login"], $_POST["password"]);
				if ($user != NULL) {
					echo("yis");
					$this->session->set_userdata(array(
						"logged_in" => TRUE,
						"username" => $user->login,
						"first" => $user->first,
						"last" => $user->last,
						"cart" => array(),
						"is_admin" => ($user->login == "admin"),
					));
					print_r($this->session);
					header("Location: /estore/");
					die();
				} else{
					header("Location: /estore/index.php/login/loginError");
					die();
				}				
			}
		}

		$this->load->view('templates/footer'); // footer
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