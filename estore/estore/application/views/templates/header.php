<html>
<head>
	<title>A Shop:: <?php echo $title ?></title>
	<link rel="stylesheet" type="text/css" href="/estore/css/base.css">
</head>
<body>
	<section id="header">
		<?php
			if ($this->session->userdata("logged_in")){
				echo('
					<section id="loginbox">
						<a href="/estore/root/view/page/"> User: </a>');
				echo($this->session->userdata("uid"));
				echo('</section>');

			} else{
				echo('
					<form id="loginbox" action="/estore/index.php/login" method="post" enctype="multipart/form-data">
						<br>
						<input type="text" name="login" placeholder="username">
						<br>
						<input type="password" name="password" placeholder="password">
						<br>
						<a href="/register">Register</a>
						<input type="submit" value="Login">
					</form>
					');		
			}
		?>
		<h1>Estore </h1>
		<nav>
			<a href = "/estore/">Estore Home</a>
			<a href = "admin panel"></a>
		</nav>
	</section>