<?php
		$CI =& get_instance();
		$CI->load->model('product_model');
		$products = $CI->product_model->getAll();
		$data['products']=$products;
		$CI->load->view('product/list.php',$data);
?>
