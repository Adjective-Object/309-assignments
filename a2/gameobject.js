
/* Object Definitions */
function Rect(x, y, width, height, rotation){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.alpha = 1;
	this.scale = 1;
	this.rotation = rotation;
}

function Elem(x, y, width, height, color){
	this.logic = new Rect(x, y, width, height, 0);
	this.graphic = new Rect(x, y, width, height, 0);

	this.color = color;

	this.animationtime = 0;
	this.animation = nilanim;

	this.update = function(input, tstep){

		// Update animation
		this.animationtime += tstep;
		this.graphic = this.animation(
			this.animationtime,
			this.graphic,
			this.logic);

		if(input.just.space){
			console.log("cool!");
			this.animationtime = 0; 
		}
	};

	this.render = function(context){
		context.translate(
			this.graphic.x + this.graphic.width/2, 
			this.graphic.y + this.graphic.height/2);
		context.rotate(-this.graphic.rotation);

		context.globalAlpha = this.graphic.alpha;
		context.fillStyle = this.color;

		var w2 = this.graphic.width/2 * this.graphic.scale;
		var h2 = this.graphic.height/2 * this.graphic.scale;

		context.fillRect(
			-w2,
			-h2, 
			this.graphic.width * this.graphic.scale, 
			this.graphic.height * this.graphic.scale);

		context.globalAlpha = 1;

		context.rotate(this.graphic.rotation);
		context.translate(
			-this.graphic.x - this.graphic.width/2,
			-this.graphic.y - this.graphic.height/2);
	};
}