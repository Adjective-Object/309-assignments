
function Point(x, y){
	this.x = x;
	this.y = y;
}

/* Object Definitions */
function Rect(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}

function GRect(color){
	this.x = 0;
	this.y = 0;
	this.alpha = 1;
	this.xscale = 1;
	this.yscale = 1;
	this.rotation = 0;
	this.color = color;
}

function Elem(x, y, width, height, color){
	this.logic = new Rect(x, y, width, height);
	this.graphic = new GRect(color);

	this.animationtime = 0;
	this.animation = nilanim;

	this.update = function(input, tstep){
		// update animation
		this.animationtime += tstep;
		this.graphic = this.animation(
			this.animationtime,
			this.graphic);
	};

	this.render = function(context){
		var sx = this.graphic.x + this.logic.x;
		var sy = this.graphic.y + this.logic.y;

		var w2 = this.logic.width/2 * this.graphic.xscale;
		var h2 = this.logic.height/2 * this.graphic.yscale;

		context.translate(
			sx+w2, 
			sy+h2);
		context.rotate(-this.graphic.rotation);

		context.globalAlpha = this.graphic.alpha;
		context.fillStyle = this.graphic.color;

		context.fillRect(
			-w2,
			-h2, 
			this.logic.width*this.graphic.xscale, 
			this.logic.height*this.graphic.yscale);

		context.globalAlpha = 1;

		context.rotate(this.graphic.rotation);
		context.translate(
			-sx-w2,
			-sy-h2);
	};
}

function Player(x, y, width, height, color){
	Elem.call(this,x,y,width,height,color);

	this.momentum = 0;
	this.maxspeed = 50;
	this.speed = 10;
	this.friction = 0.6;

	supdate = this.update;
	this.update = function(input, tstep){
		supdate.call(this, input, tstep);

		this.logic.x += this.momentum;

		if (input.down.left) {
			this.momentum = Math.max(-this.maxspeed, this.momentum-this.speed);
		}
		if (input.down.right) {
			this.momentum = Math.min(this.maxspeed, this.momentum+this.speed);
		}

		this.momentum = this.momentum * this.friction;
		if (this.logic.x < 32){
			this.logic.x = 32;
			this.momentum = 0;
		}
		if (this.logic.x > canvaswidth-this.logic.width-32){
			this.logic.x = canvaswidth-this.logic.width-32;
			this.momentum = 0;
		}

	}
}

function Ball(x, y, size, color){
	Elem.call(this,x,y,size,size,color);

	this.speed = 10;

	this.momentum = new Point(0,0);
	this.started = false;

	supdate = this.update;
	this.update = function(input, tstep){
		supdate.call(this, input, tstep);

		this.logic.x += this.momentum.x;
		this.logic.y += this.momentum.y;

		if(!this.started && input.just.space){
			this.started = true;
			this.momentum.x = Math.random()*this.speed - Math.random()*this.speed;
			this.momentum.y = - (0.5 + Math.random())*this.speed;
		}

		if(this.logic.x < 16){
			this.logic.x = 16;
			this.momentum.x = Math.abs(this.momentum.x);
		}

		if(this.logic.x + this.logic.width > canvaswidth - 16){
			this.logic.x = canvaswidth - 16 - this.logic.width ;
			this.momentum.x = -Math.abs(this.momentum.x);
		}

		if(this.logic.y < 16){
			this.momentum.y = Math.abs(this.momentum.y);
			this.logic.y = 16;
		}


		if(this.logic.y > canvasheight - 16){
			console.log("you lose");
			this.momentum.y = - Math.abs(this.momentum.y);
			this.logic.y = canvasheight - 16;
		}
	}

	this.collideAll = function(blocks){
		this.right = this.logic.x + this.logic.x + this.logic.width;
		this.bottom = this.logic.y + this.logic.y + this.logic.height;
		this.left = this.logic.x;
		this.top = this.logic.y;

		for (var i=0; i<blocks; i++){
			this.collide(blocks[i]);
		}
	}

	this.collide = function(block){
		//console.log("!");
		blockright = block.logic.x + block.logic.width;
		blockbottom = block.logic.y + block.logic.height;
		blockleft = block.logic.x;
		blocktop = block.logic.y;

		var r =(this.right > blockright && this.left < blockright);
		var l = (this.right > blockleft  && this.left < blockleft);
		var t = (this.top < blocktop && this.bottom > blocktop);
		var b = (this.top < blockbottom && this.bottom > blockbottom);

		if (r&(t||b) || l&(t||b)) {
			//collision
			console.log("collision");
			var centerx = this.logic.x + this.logic.width/2;
			var centerbx = block.logic.x + block.logic.width/2;

			this.momentum.x = centerx - centerbx;
			this.momentum.y = (0.5+Math.random())*this.speed;
		}

	}
}
