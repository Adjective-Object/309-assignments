<style>
	#orderitems, #BACK{
		display:block;
		text-align:center;
	}
	table{
		margin-right: auto;
		margin-left: auto;
	}

	td{
		padding:8px;
	}

	td img{
		width:100px;
	}
</style>
<h1 id="orderitems">Contents of Order <?php $order_id?></h1>
<?php 

		if(!$this->session->userdata('is_admin')){
			echo "you don't have permission to be here";
			die();
 	  	} else{

			echo "<table id='items'>";

			echo "<tr><td>";

			echo "</td><td>";
			echo "Product";

			echo "</td><td>";
			echo "P. Id";

			echo "</td><td>";
			echo "Cost";

			echo "</td><td>";
			echo "Quantity";

			echo "</td></tr>";
			
			foreach ($items as $item) {
				$product = $this->product_model->get($item->product_id);
				$quantity = $item->quantity;


				echo "<tr><td>";
				echo "<img src='/estore/images/product/" . $product->photo_url . "'>";

				echo "</td><td>";
				echo $product->name;

				echo "</td><td>";
				echo $product->id;

				echo "</td><td>";
				echo $product->price;

				echo "</td><td>";
				echo $quantity;

				echo "</td></tr>";
			}
			echo "</table>";
 	  	}
?>	
<a id="BACK", href = "/estore/index.php/orders/">Back To Orders</a>

