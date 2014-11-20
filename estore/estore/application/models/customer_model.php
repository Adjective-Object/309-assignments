<?php
class Customer_model extends CI_Model {

    public function __construct(){
    	parent::__construct();
    }


    function getAll() {  
		$query = $this->db->get('customers');
		return $query->result('Customer');
	}  


	function get($username, $password)
	{
		$query = $this->db->get_where('customers',
			array('login' => $username,
					'password' => $password));
		if($query->num_rows() == 0){
			return NULL;
		}
		return $query->row(0,'Customer');
	}
	
	function delete($id) {
		return $this->db->delete("customers",array('id' => $id ));
	}
	
	function insert($customer) {
		return $this->db->insert("customers", array(
										'login' => $customer->login,
										'first' => $customer->first,
										'last' => $customer->last,
										'password' => $customer->password,
										'email' => $customer->email));
	}
	 
	function update($customer) {
		$this->db->where('id', $product->id);
		return $this->db->update("products", array(
										'login' => $customer->login,
										'first' => $customer->first,
										'last' => $customer->last,
										'password' => $customer->password,
										'email' => $customer->email));
	}
	
	
}
?>
