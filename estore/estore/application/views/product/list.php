<?php 

 	  	echo "<link rel='stylesheet' type='text/css' href='/estore/css/list.css'>";


		echo "<section id='products'>";

		if($this->session->userdata('is_admin')){
			echo "<p>" . "<a href='/estore/index.php/store/newForm' class='butt' id='newformlink'> Add New </a>" . "</p>";
 	  	}


		foreach ($products as $product) {
			echo "<section class='product'>";

			echo "<a href='index.php/store/read/". $product->id ."'>";
			echo "<img src='" . base_url() . "images/product/" . $product->photo_url."' alt='product'/>";

			echo "<h3>" . $product->name . " : $" . $product->price ."</h3>";
			echo "</a>";

			if($this->session->userdata('is_admin')){
				echo "<a href= 'index.php/store/delete/" .$product->id . "' class='butt' " .
						"onClick='return confirm(\"Are you sure you want to delete this?\");'" .
						">". 
						"Delete </a>";
				echo "<a href='index.php/store/editForm/". $product->id ."' class='butt'> Edit </a>";				
			}

			echo "<p>" . $product->description . "</p>";
			
			echo "</section>";
		}
		echo "</section>";
?>	

