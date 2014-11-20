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
        $this->form_validation->set_rules('email_address', 'Email', 'required|is_unique[customers.email]|valid_email');
        
        if($this->form_validation->run() == true) {
            $this->load->model("Customer");
            $this->load->model("customer_model");
            $customer = new Customer();
            $customer->login = $this->input->get_post('login');
            $customer->password = $this->input->get_post('password');
            $customer->first = $this->input->get_post('first');
            $customer->last = $this->input->get_post('last');
            $customer->email = $this->input->get_post('email_address');

            $data = array(
                "title" => "Register Success!");

            $this->customer_model->insert($customer);
            $this->load->view('templates/header', $data);
            $this->load->view('pages/register_success', $data);
            $this->load->view('templates/footer', $data);
        }
        
        else {
            $data = array(
                "title" => "Register New User",
                "error" => "Failed form Validation: ".validation_errors());
            $this->load->view('templates/header', $data);
            $this->load->view('pages/register', $data);
            $this->load->view('templates/footer', $data);
        }
    }    
}
