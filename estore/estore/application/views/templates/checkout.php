<form id="cardform" action="/estore/index.php/me/checkout" method="post">
<!-- http://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input -->
Card Number: <input type="text" 
	id="card_number" 
	name="card_number" 
	maxlength="16" 
	placeholder="0000000000000000"
	onkeypress='return event.charCode >= 48 && event.charCode <= 57' ><br>
Card Expiration Date (mmyy): <input type="text" 
	id="card_expiration" 
	name="card_expiration" 
	maxlength="5" 
	placeholder="MM/YY"><br>
<input type="submit" value="SUBMIT PAYMENT">
</form>


Total Cost: <?php echo $cost?>

<script type="text/javascript">
	
	var numbers="0123456789"
	function isNumeric(str){
		for(var i=0; i<str.length; i++){
			if (numbers.indexOf(str.charAt(i))==-1){
				return false;
			}
		}
		return str.length == 2;
	}

	$("#cardform").submit(function(){
		//check the card number is of proper length
		if ($("#card_number").val().length != 16 ) {
			alert("card number not 16 digits");
			return false;
		}

		//check MM/YY
		var mmyy = $("#card_expiration").val();
		var slash = mmyy.charAt(2)
		var month = mmyy.substring(0,2);
		var year = mmyy.substring(3);
		
		console.log(mmyy, slash, month, year);

		//check formatted correctly
		if (!isNumeric(month) || !isNumeric(year) || slash != "/"){
			alert("Expiration date must be specified as MM/YY");
			return false;
		}

		//check month field
		if(parseInt(month) > 12){
			alert("no months exist beyond 12");
			return false;
		}

		//check date not passed yet
		expd = new Date(parseInt(year)+2000, parseInt(month),0,0,0,0,0);
		now = new Date();
		if (expd < now){
			alert("expiration date has passed!");
			return false;
		}


	});
</script>