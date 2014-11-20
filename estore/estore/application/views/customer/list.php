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
<h1 id="finalizedoders">Customers</h1>
<?php 

		if(!$this->session->userdata('is_admin')){
			echo "you don't have permission to be here";
			die();
 	  	} else{
	 	  	echo "<link rel='stylesheet' type='text/css' href='/estore/css/list.css'>";


			echo "<table id='customers'>";


			echo "<tr><td>";
			echo "Id";

			echo "</td><td>";
			echo "First";

			echo "</td><td>";
			echo "Last";

			echo "</td><td>";
			echo "Login";

			echo "</td><td>";
			echo "Pass";

			echo "</td><td>";
			echo "Email";

			echo "</td></tr>";
			foreach ($customers as $customer) {
					echo "<tr><td>";
					echo $customer->id;

					echo "</td><td>";
					echo $customer->first;

					echo "</td><td>";
					echo $customer->last;

					echo "</td><td>";
					echo $customer->login;

					echo "</td><td>";
					echo $customer->password;

					echo "</td><td>";
					echo $customer->email;

					if($customer->login != "admin"){
						echo "</td><td>";
						echo "<a href='/estore/index.php/customers/delete/".$customer->id."'>Delete</a>";
					}
				echo "</td></tr>";

					
			}
			echo "</table>";
 	  	}
?>	

