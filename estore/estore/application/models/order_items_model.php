<?php
class Order_items_model extends CI_Model {

    public function __construct(){
    	parent::__construct();
    }
    
    function insert($order_items) {
        return $this->db->insert("order_items", array(
                                                'id' => $order_items->id,
                                                'order_id' => $order_items->order_id,
                                                'product_id' => $order_items->product_id,
                                                'quantity' => $order_items->quantity));
    }


    function get($order_id) {
        $query = $this->db->get_where('order_items', array('order_id' => $order_id));
        if($query->num_rows() == 0) {
            return NULL;
        }
        return $query->row(0,'Order Items');
    }	
	
}
?>
