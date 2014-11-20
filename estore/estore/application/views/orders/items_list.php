<style>
	#orderitems, #BACK{
		text-align:center;
	}
	table{
		margin-right: auto;
		margin-left: auto;
	}

	td{
		padding:8px;
	}
</style>
<h1 id="orderitems">Finalized Orders</h1>
<?php 

		if(!$this->session->userdata('is_admin')){
			echo "you don't have permission to be here";
			die();
 	  	} else{

			echo "<table id='items'>";

			echo "<tr><td>";
			echo "Img";

			echo "<tr><td>";
			echo "Product Id";

			echo "</td><td>";
			echo "Cost";

			echo "</td><td>";
			echo "Quantity";

			echo "</td></tr>";
			$this->load->model("product_model");
			foreach ($items as $item) {
				
			}
			echo "</table>";
 	  	}
?>	
<a id="BACK", href = "/estore/index.php/orders/">Back To Orders</a>

