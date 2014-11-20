
<section class="readproduct" id="centeredSection">
<?php 
	echo "<p><img src='" . base_url() . "images/product/" . $product->photo_url . "' width='100px'/></p>";
	echo "<p> ID: " . $product->id . "</p>";
	echo "<p> NAME: " . $product->name . "</p>";
	echo "<p> Description: " . $product->description . "</p>";
	echo "<p> Price: " . $product->price . "</p>";
	echo "<p> In Cart: " . $in_cart . "</p>";
	$CI =& get_instance();
	if($CI->session->userdata("logged_in")) {
		echo "<a a href = '/estore/index.php/me/addcart/".$product->id."'> add to cart </a>";
	}
?>
</section>

