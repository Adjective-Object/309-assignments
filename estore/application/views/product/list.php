<h2>Product Table</h2>
<?php 
		echo "<p>" . anchor('/index.php/store/newForm','Add New') . "</p>";
 	  	echo "<link rel='stylesheet' type='text/css' href='/estore/css/list.css'>";


		echo "<section id='products'>";
		foreach ($products as $product) {
			echo "<section class='product'>";

			echo "<a href='index.php/store/read/". $product->id ."'>";
			echo "<img src='" . base_url() . "images/product/" . $product->photo_url."' alt='product'/>";

			echo "<h3>" . $product->name . " : $" . $product->price ."</h3>";
			echo "</a>";
			
			echo "<a href= 'index.php?/store/delete/" .$product->id . "'" .
					"' onClick='return confirm(\"Are you sure you want to delete this?\");'" .
					">". 
					"Delete </a>";
			echo  anchor("index.php?/store/editForm/$product->id",'Edit') . "</td>";

			echo "<p>" . $product->description . "</p>";
			
			echo "</section>";
		}
		echo "</section>";
?>	

