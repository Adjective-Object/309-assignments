<?php
class Register extends CI_Controller {
    
    function __construct() {
        parent::__construct();
    }
    
    function index() {
        $this->load->library('form_validation');
        $this->load->database();
        
        $this->form_validation->set_rules('login', 'Login', 'required|is_unique[customers.login]');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
        $this->form_validation->set_rules('passconf', 'Password Confirmation', 'required');
        $this->form_validation->set_rules('first', 'First', 'required');
        $this->form_validation->set_rules('last', 'Last', 'required');
        $this->form_validation->set_rules('email', 'Email', 'required|is_unique[customers.email]|valid_email');
        
        if($this->form_validation->run() == true) {
            echo "UGH";
            
            $customer = new Customer();
            $customer->login = $this->input->get_post('login');
            $customer->password = $this->input->get_post('password');
            $customer->first = $this->input->get_post('first');
            $customer->last = $this->input->get_post('last');
            $customer->email = $this->input->get_post('email');

            $this->customer_model->insert($customer);
        }
        
        else {
            $data = array(
                "title" => "Register New User",
                "error" => "Failed form Validation");
            $this->load->view('templates/header', $data);
            $this->load->view('pages/register', $data);
            $this->load->view('templates/footer', $data);
        }
    }    
}
