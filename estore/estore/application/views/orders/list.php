<style>
	#finalizedoders{
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
<h1 id="finalizedoders">Finalized Orders</h1>
<?php 

		if(!$this->session->userdata('is_admin')){
			echo "you don't have permission to be here";
			die();
 	  	} else{
	 	  	echo "<link rel='stylesheet' type='text/css' href='/estore/css/list.css'>";


			echo "<table id='orders'>";


			echo "<tr><td>";
			echo "Id";

			echo "</td><td>";
			echo "Customer Id";

			echo "</td><td>";
			echo "Date";

			echo "</td><td>";
			echo "Time";

			echo "</td><td>";
			echo "Total";

			echo "</td><td>";
			echo "Card Number";

			echo "</td><td>";
			echo "Exp. Month";

			echo "</td><td>";
			echo "Exp. Year";

			echo "</td></tr>";
			foreach ($orders as $order) {
				echo "<tr><td>";
				
				echo $order->id;

				echo "</td><td>";
				echo $order->customer_id;

				echo "</td><td>";
				echo $order->order_date;

				echo "</td><td>";
				echo $order->order_time;

				echo "</td><td>";
				echo $order->total;

				echo "</td><td>";
				echo $order->creditcard_number;

				echo "</td><td>";
				echo $order->creditcard_month;

				echo "</td><td>";
				echo $order->creditcard_year;

				echo "</td></tr>";
			}
			echo "</table>";
 	  	}
?>	

