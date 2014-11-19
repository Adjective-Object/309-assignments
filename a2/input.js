/* Input Tracker*/
function KeyState(left, right, space){
	this.left = left;
	this.right = right;
	this.space = space;

	return this;
}

function InputTracker(disabled){

	this.buff = new KeyState(false, false, false);
	this.real = new KeyState(false, false, false);
	this.just = new KeyState(false, false, false);
	this.down = new KeyState(false, false, false);

	this.enabled = !disabled;

	this.keydown = function(e){
		//console.log("keydown", e.keyCode);
		// Left
		if(e.keyCode == 37){
			this.real.left = true;
			this.buff.left = true;}
		if(e.keyCode == 39){
			this.real.right = true;
			this.buff.right = true;}
		if(e.keyCode == 32){
			this.real.space = true;
			this.buff.space = true;}
	}

	this.keyup = function(e){
		//console.log("keyup", e.keyCode);
		if(e.keyCode == 37){this.real.left = false;}
		if(e.keyCode == 39){this.real.right = false;}
		if(e.keyCode == 32){this.real.space = false;}	
	}

	this.update = function(){
		if (!this.enabled){
			// Held
			this.down.left = false;
			this.down.right = false;
			this.down.space = false;

			// Just pressed
			this.just.left = false;
			this.just.right = false;
			this.just.space = false;
			return;
		}

		// Held
		this.down.left = this.buff.left || this.real.left;
		this.down.right = this.buff.right || this.real.right;
		this.down.space = this.buff.space || this.real.space;

		// Just pressed
		this.just.left = this.buff.left;
		this.just.right = this.buff.right;
		this.just.space = this.buff.space;

		// Clear buffer
		this.buff.left  = false;
		this.buff.right = false;
		this.buff.space = false;
	}
}
