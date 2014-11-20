<html>
<head>
	<title>A Shop:: <?php echo $title ?></title>
	<link rel="stylesheet" type="text/css" href="/estore/css/base.css">
	<link rel="stylesheet" type="text/css" href="/estore/css/form_reset.css">
</head>
<body>
	<script type="text/javascript" src="/estore/js/jQuery.js"></script>
	<section id="header">
		<?php
			if ($this->session->userdata("logged_in")){
				echo('
					<section id="loginbox">
						<a href="/estore/index.php/me/">' . $this->session->userdata("username") . '</a>
						<a href=/estore/index.php/me/cart/> Cart </a>
						<a href="/estore/index.php/login/logOut"> Log Out </a>');
				echo('</section>');

			} else{
				echo('
					<form id="loginbox" action="/estore/index.php/login" method="post" enctype="multipart/form-data">
						<br>
						<input type="text" name="login" placeholder="username">
						<br>
						<input type="password" name="password" placeholder="password">
						<br>
						<a href="/estore/index.php/register">Register</a>
						<input type="submit" value="Login">
					</form>
					');		
			}
		?>
		<a href="/estore/"> <h1>Estore </h1> </a>
		<nav>
			<a href = "/estore/">Estore Home</a>
		<?php
		if($this->session->userdata("is_admin")){
			echo('<a href = "/estore/index.php/customers">Customer List</a>');
			echo('<a href = "/estore/index.php/orders">Order List</a>');
		}
		?>

		</nav>
	</section>