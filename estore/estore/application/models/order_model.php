<?php
class Order_model extends CI_Model {

    public function __construct(){
    	parent::__construct();
    }

    function getAll() {  
		$query = $this->db->get('orders');
		return $query->result('Order');
	}  


	function insert($cust_id, $total, $cardnum, $month, $year) {
		$date = time(); // date as.... what? (unspecified) unix timestamp it is!
		$time = time(); // unix timestamp
		return $this->db->insert("orders", array(
										'customer_id' => $cust_id,
										'order_date' => $date,
										'order_time' => $time,
										'total' => $total,
										'creditcard_number' => $cardnum,
										'creditcard_month' => $month,
										'creditcard_year' => $year 
									));
	}	
	
}
?>
