<?php

// root loader that handles view loading, puts global elements into page.
class Login extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');
		echo("cons");
		$this->load->model("customer_model");
		echo("cons");
	}

	function index() {
		echo("ind");
		if($this->session->userdata("logged_in")){
			echo("...");
			header("Location: /estore/root/view/me");
			die();
		} else{
			echo("hate");
			$user = $this->customer_model->get(
				$_POST["login"], $_POST["password"]);
			if ($user != NULL) {
				echo("yis");
				$this->session->set_userdata(array(
					"logged_in" => TRUE,
					"username" => $user->login,
					"first" => $user->first,
					"last" => $user->last,
				));
				print_r($this->session);
				header("Location: /estore/");
			} else{
				echo("no");
				header("Location: /estore/root/view/login_error");
				die();
			}
		}
	}
}