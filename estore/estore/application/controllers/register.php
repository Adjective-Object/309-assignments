<?php
$uid_count = 0;

class Register extends CI_Controller {
    
    function __construct() {
        parent::__construct();
    }
    
    function index() {
        $this->load->model('customer_model'); // Loads the related user model
        
        $this->load->view('templates/header', $data);
        // Maybe I need a form view here...?
        $this->load->view('templates/footer', $data);
    }
    
    function register() {
        $this->load->library('form_validation');
        $this->load->database();
        
        $this->form_validation->set_rules('login', 'Login', 'required|is_unique[customers.login]');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
        $this->form_validation->set_rules('passconf', 'Password Confirmation', 'required');
        $this->form_validation->set_rules('first', 'First', 'required');
        $this->form_validation->set_rules('last', 'Last', 'required');
        $this->form_validation->set_rules('email', 'Email', 'required|is_unique[customers.email]|valid_email');
        
        if($this->form_validation->run() == true) {
            $this->load->model('customer_model');
            
            $customer = new Customer();
            $customer->login = $this->input->get_post('login');
            $customer->password = $this->input->get_post('password');
            $customer->first = $this->input->get_post('first');
            $customer->last = $this->input->get_post('last');
            $customer->email = $this->input->get_post('email');
            $customer->id = $uid_count;
            $uid_count++
        }
        
        else {
            // Failed. Reload the views
            $this->load->view('templates/header', $data);
            // Maybe I need a form view here...?
            $this->load->view('templates/footer', $data);
    
}
