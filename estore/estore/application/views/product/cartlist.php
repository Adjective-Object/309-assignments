<?php 

	$counts = array_count_values($cart);

	$totalcost = 0;

	echo "<section id='cart_products'>";
	foreach ($counts as $pid => $amt) {
		$product = $this->product_model->get($pid);
		$totalcost = $totalcost + $amt * $product->price;

		echo "<section class='product'>";

		echo "<a href='/estore/index.php/store/read/". $product->id ."'>";
		echo "<img src='" . base_url() . "images/product/" . $product->photo_url."' alt='product'/>";

		echo "<h3>" . $product->name . " : $" . $product->price ."</h3>";

		echo "</a>";
		echo "<p>" . $amt ." in cart</p>";

		echo "<p>" . $product->description . "</p>";

		echo "<a href='/estore/index.php/me/removecart/". $product->id ."'> remove 1 </a>";
		
		echo "</section>";
	}
	echo "</section>";
?>	

<section id="cart_summary">
<?php 
	echo "Total Cost:" . $totalcost;
	echo "<a href='/estore/index.php/me/checkout'> check out </a>"
?>
</section>

