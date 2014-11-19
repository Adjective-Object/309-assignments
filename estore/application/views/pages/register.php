<?php 
$CI =& get_instance();
if ($CI->session->logged_in){
	header("Location: /estore/root/view/me");
	die();
}

?>
<h2>Register New User</h2>
