<?php

// root loader that handles view loading, puts global elements into page.
class Root extends CI_Controller {
	function __construct() {
		// Call the Controller constructor
		parent::__construct();
		$this->load->library('session');
		$this->session->set_userdata(array(
			"logged_in" => FALSE
			));
	}

	function view($page="home") {
		if ( ! file_exists(APPPATH.'/views/pages/'.$page.'.php'))
		{
			// Whoops, we don't have a page for that!
			show_404();
		}

		$data['title'] = ucfirst($page); // Capitalize the first letter

		$this->load->view('templates/header', $data); // header
		$this->load->view('pages/'.$page, $data);     // content
		$this->load->view('templates/footer', $data); // footer
	}
}