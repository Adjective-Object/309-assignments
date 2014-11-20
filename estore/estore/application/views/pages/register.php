<?php 
$CI =& get_instance();
if ($CI->session->userdata('logged_in')){
	header("Location: /estore/root/view/me");
	die();
}

?>
<style>
#register{
  margin:36px;
  width:200px;
  margin-left:auto;
  margin-right:auto;
}
</style>
<section id="register">
<h2>Register New User</h2>

<style>
	input { display: block;}
	
</style>

<form action="/estore/index.php/register/register" method="post" enctype="multipart/form-data">
		
<p>
  <label for="login">Login:</label>
  <input type="text" id="login" name="login" value="<?php echo set_value('login'); ?>" />
</p>

<p>
  <label for="password">Password:</label>
  <input type="password" id="password" name="password" value="<?php echo set_value('password'); ?>" />
</p>

<p>
  <label for="passconf">Confirm Password:</label>
  <input type="password" id="passconf" name="passconf" value="<?php echo set_value('passconf'); ?>" />
</p>

<p>
  <label for="first">First:</label>
  <input type="text" id="first" name="first" value="<?php echo set_value('first'); ?>" />
</p>

<p>
  <label for="last">Last:</label>
  <input type="text" id="last" name="last" value="<?php echo set_value('last'); ?>" />
</p>
  
<p>
  <label for="email_address">Your Email:</label>
  <input type="text" id="email_address" name="email_address" value="<?php echo set_value('email_address'); ?>" />
</p>

<p>
  <input type="submit" class="greenButton" value="Submit" />
</p>

</form>
</section>