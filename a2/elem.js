
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

	this.active = true;
	this.alive = true;
	this.animationtime = 0;
	this.animation = nilanim;
}
Elem.prototype = {
	update: function(input, tstep){
		// update animation
		this.animationtime += tstep;
		this.graphic = this.animation(
			this.animationtime,
			this.graphic);
	},

	draw: function(context){
		context.fillRect(
			-this.logic.width/2 	* this.graphic.xscale,
			-this.logic.height/2  	* this.graphic.yscale, 
			this.logic.width 		* this.graphic.xscale,
			this.logic.height 	 	* this.graphic.yscale);
	},

	render: function(context){
		var sx = this.graphic.x + this.logic.x;
		var sy = this.graphic.y + this.logic.y;

		context.translate(
			sx+this.logic.width/2,
			sy+this.logic.height/2);
		context.rotate(-this.graphic.rotation);

		context.globalAlpha = this.graphic.alpha;
		context.fillStyle = this.graphic.color;

		context.scale(
			this.graphic.xscale,
			this.graphic.yscale);

		//actual drawing content
		this.draw(context);

		context.scale(
			1/this.graphic.xscale,
			1/this.graphic.yscale);

		context.globalAlpha = 1;

		context.rotate(this.graphic.rotation);
		context.translate(
			-sx-this.logic.width/2,
			-sy-this.logic.height/2);
	},

	destroy: function(callback){
		this.active = false;
		this.animationtime = 0;
		this.animation = multiAnim(
			scale(100,1,0.2),
			fade(100,1,0));

		tokill = this
		setTimeout(
			function() {
				tokill.alive = false
				if (callback){
					callback()
				}
			}, 200);
	}
};


function Player(x, y, width, height, color){
	Elem.call(this,x,y,width,height,color);

	this.velocity = 0;
	this.maxmovespeed = 800;
	this.movespeed = 200;
	this.friction = 0.01;
}
Player.prototype = new Elem;
Player.prototype.update = function(input, tstep){
	Elem.prototype.update.call(this, input, tstep);

	this.logic.x += this.velocity * tstep/1000;

	if (input.down.left) {
		this.velocity = Math.max(-this.maxmovespeed, this.velocity-this.movespeed);
	}
	if (input.down.right) {
		this.velocity = Math.min(this.maxmovespeed, this.velocity+this.movespeed);
	}

	this.velocity = (this.velocity - 
		(this.velocity * this.friction * tstep));

	if (this.logic.x < 32){
		this.logic.x = 32;
		this.velocity = 0;
	}
	if (this.logic.x > canvaswidth-this.logic.width-32){
		this.logic.x = canvaswidth-this.logic.width-32;
		this.velocity = 0;
	}

}


function Ball(x, y, size, color){
	Elem.call(this,x,y,size,size,color);

	this.initmovespeed = 500
	this.movespeed = 500;

	this.velocity = new Point(0,0);
}
Ball.prototype = new Elem;

Ball.prototype.goToAngle = function(rad){
	this.velocity.x = Math.cos(rad)*this.movespeed;
	this.velocity.y = -Math.sin(rad)*this.movespeed;
}

Ball.prototype.update = function(input, tstep){
	Elem.prototype.update.call(this, input, tstep);

	this.right = this.logic.x + this.logic.width;
	this.bottom = this.logic.y + this.logic.height;
	this.left = this.logic.x;
	this.top = this.logic.y;

	if(this.active){
		this.logic.x += this.velocity.x * tstep/1000;
		this.logic.y += this.velocity.y * tstep/1000;

		if(!started && input.just.space){
			started = true;
			this.goToAngle(Math.random() * Math.PI / 2 + Math.PI / 4);
		} if (!started){
			this.logic.x = player.logic.x + player.logic.width/2 - this.logic.width/2;
		}

		if(this.logic.x < extpadding){
			this.logic.x = extpadding;
			this.velocity.x = Math.abs(this.velocity.x);
		}

		if(this.logic.x + this.logic.width > canvaswidth - extpadding){
			this.logic.x = canvaswidth - extpadding - this.logic.width ;
			this.velocity.x = -Math.abs(this.velocity.x);
		}

		if(this.logic.y < extpadding){
			this.velocity.y = Math.abs(this.velocity.y);
			this.logic.y = extpadding;
		}


		if(this.logic.y > canvasheight - extpadding){
			lives = lives - 1;
			livesText.text = "Lives: " + lives;
			livesText.animationtime = 0;
			livesText.animation = scale(200,1.3,1);
			if(lives === 0) { gameLose(); } // No more lives left, game over.
			else {

				// Reset positions with same block state but minus one life
				
				started = false;
				this.logic.y = canvasheight - 64 - 24; // Default y position, default x position is bound to !started
				ball.velocity.x = 0;
				ball.velocity.y = 0;
			 } 
		}
	}
}

Ball.prototype.collidePaddle = function (paddle){
	var paddleCollideCallback = function(paddle){
		cx = this.logic.x + this.logic.width/2
		cbx = paddle.logic.x + paddle.logic.width/2

		angle = Math.atan2(this.velocity.y , this.velocity.x);

		
		angle = (angle
			- (Math.PI/4 * paddle.velocity/paddle.maxmovespeed)
			+ (Math.PI/16 * (cbx-cx)/paddle.logic.width)
			);

		if(angle>Math.PI*7/8){
			angle = Math.PI*7/8;
		}

		if(angle<Math.PI*1/8){
			angle = Math.PI*1/8;
		}

		if(Math.abs((cbx-cx)/paddle.logic.width) < 0.25){
			console.log("resetting movespeed");
			this.movespeed = this.initmovespeed;
		}

		this.goToAngle(angle);
	}
	if(this.velocity.y>0){
		this.collide(paddle, paddleCollideCallback);
	}
}

Ball.prototype.collideAll = function(blocks){
	var blockCollideCallback = function(block){
		//TODO ball collission logic
		this.movespeed = this.movespeed * 1.05;
		console.log(this.movespeed);
		
		block.destroy( function(){checkWinstate()} );

		cy = this.logic.y + this.logic.height/2
		cby = block.logic.y + block.logic.height/2

		if(cy<cby){
			this.velocity.y = -Math.abs(this.velocity.y);
		} else if (cy>cby){
			this.velocity.y = Math.abs(this.velocity.y);
		}

		/*
		num = 5 + score/ 100 * intensity * (1+Math.random());
		for (var i=0; i<num; i++){
			spawn(new Sparker(
				block.logic.x, 
				block.logic.y, 
				block.graphic.color,
				200+300*Math.random() ));
		}*/

		updateScore(block);
	}

	for (var i=0; i<blocks.length; i++){
		if(blocks[i].active){
			this.collide(
				blocks[i],
				blockCollideCallback
				);
		}
	}
}

Ball.prototype.collide = function(block, callback){
	//console.log("!");
	blockright = block.logic.x + block.logic.width;
	blockbottom = block.logic.y + block.logic.height;
	blockleft = block.logic.x;
	blocktop = block.logic.y;

	var l = (this.left < blockright);
	var r = (this.right > blockleft);
	var t = (this.top < blockbottom);
	var b = (this.bottom > blocktop);

	if ( (l&&r) && (t&&b) ){
		//collision
		
		callback.call(this,block)
	}
}


function ElemText(text,x,y,color){
	Elem.call(this, x, y, 0, 0, color)
	this.text = text;
	this.textAlign = "center";
	this.fontsize = 64
}
ElemText.prototype = new Elem;
ElemText.prototype.draw = function(context){
	context.textAlign = this.textAlign;
	context.font = 	this.font = this.fontsize+"px "+uifont;
	context.fillText(this.text,0,this.fontsize/4);
}

ElemText.prototype.destroy = function(){
	this.active = false;
	this.animationtime = 0;
	this.animation = multiAnim(
		scale(100,1,0.2),
		fade(100,1,0)
		);
	setTimeout(function() {this.alive = false;}, 200);
}


function WowText(text,x,y,color){
	ElemText.call(this, text,x,y,color);
}
WowText.prototype = new ElemText;
WowText.prototype.destroy = function(){
	this.active = false;
	this.animationtime = 0;
	this.animation = multiAnim(
		scale(400,1,0.2),
		fade(400,1,0)
		);
	setTimeout(function() {this.alive = false;}, 200);
}


function DissapearText(text,x,y,color){
	ElemText.call(this, text, x, y, color);
}
DissapearText.prototype = new ElemText;
DissapearText.prototype.update = function(input, tstep){
	ElemText.prototype.update.call(this, input, tstep);

	if(this.active){
		if(input.just.space){
			this.destroy();
		}
	}
}

function GameReStarter(){
	
	this.alive = true;

	this.update = function(input, tstep){
		if (input.just.space){
			this.alive = false;
			score = 0
			gameReset();
		}
	};

	this.render = function(canvas){};
}

function GameIncrementer(){
	
	this.alive = true;

	this.update = function(input, tstep){
		if (input.just.space){
			this.alive = false;
			gameReset();
		}
	};

	this.render = function(canvas){};
}

function Sparker(x,y,color,life) {
	Elem.call(this, x, y, 16, 16, color);

	this.animation = multiAnim( 
		fade(life, 1, 0)
	);
	
	this.velocity = new Point()
	this.velocity.x = intensity*120 * (Math.random() - Math.random())
	this.velocity.y = intensity*120 * (Math.random() - Math.random())

	this.friction = 0.0005;

	t = this;
	setTimeout(function(){
		t.active = false;
		t.alive = false;
	}, life);
}
Sparker.prototype = new Elem;
Sparker.prototype.update = function(input, tstep){
	Elem.prototype.update.call(this,input,tstep);

	this.velocity.x = (this.velocity.x - 
		(this.velocity.x * this.friction * tstep));
	this.velocity.y = (this.velocity.y - 
		(this.velocity.y * this.friction * tstep));

	this.logic.x += this.velocity.x * tstep/1000;
	this.logic.y += this.velocity.y * tstep/1000;
}


function Img(src, x, y){
	this.img = new Image();
	this.img.src = src;
	Elem.call(this, x, y, this.img.naturalWidth, this.img.naturalHeight);
}
Img.prototype = new Elem
Img.prototype.draw = function(context){
	context.drawImage(this.img, -this.img.naturalWidth/2, -this.img.naturalHeight/2);
}