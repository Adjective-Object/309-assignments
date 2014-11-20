<style>
#centeredSection {
	display:block;
	padding:8px;
}

#centeredSection img{
	width: 100px;
	float:left;
	margin:8px;
}

#centeredSection .product{
	clear:left;
	margin:8px;
}

#centeredSection .product h3 {
	font-weight:600px;
}

#cart_summary{
	text-align:center;
	clear:left;
}
</style>
<section id="centeredSection">
<?php 
	$counts = array_count_values($cart);

	$totalcost = 0;

	echo "<form id='cart_products' method='post' enctype='multipart/form-data'>";
	foreach ($counts as $pid => $amt) {
		$product = $this->product_model->get($pid);
		$totalcost = $totalcost + $amt * $product->price;

		echo "<section class='product'>";

		echo "<a href='/estore/index.php/store/read/". $product->id ."'>";
		echo "<img src='" . base_url() . "images/product/" . $product->photo_url . "' alt='product'/>";
		echo "<h3>" . $product->name . " : $" . $product->price ."</h3>";
		echo "</a>";

		echo "<input type='number' name='amount_". $pid ."' value='".$amt."'></input><br>";

		echo "</section>";
		
	}
	echo '<section id="cart_summary">';
		echo "Total Cost:" . $totalcost , "<br>";
		echo "<input type='submit' value='check out'/>";
	echo '</section>';

	echo "</form>";
?>	
</section>