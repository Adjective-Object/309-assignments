<?php
class Order_items_model extends CI_Model {

    public function __construct(){
    	parent::__construct();
    }
    
    function insert($pid, $oid, $amt) {
        return $this->db->insert("order_items", array(
                                                'order_id' => $oid,
                                                'product_id' => $pid,
                                                'quantity' => $amt));
    }


    function getBy($order_id) {
        $query = $this->db->get_where('order_items', array('order_id' => $order_id));
        if($query->num_rows() == 0) {
            return NULL;
        }
        return $query->result('Order_items');
    }	
	
}
?>
