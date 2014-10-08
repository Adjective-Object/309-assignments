
/* Game Logic */
function updateGame(elems, input, tstep){
	input.update();
	for (var i=0; i< elems.length; i++){
		elems[i].update(input, tstep);
	}
}

/* Initialize the canvas */
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var canvaswidth = canvas.width;
var canvasheight = canvas.height;
var bkgcolor = "#282A2E";
var playercolor = "#C5C8C6";
var tilecolors = [
	"#A54242",
	"#CC6666",
	"#B5BD68",
	"#F0C674",
	"#81A2BE",
	"#B294BB"
];

function renderGame(context, elems){
	context.fillStyle = bkgcolor;
	context.globalAlpha=0.3;
	context.fillRect(0,0,canvaswidth, canvasheight)
	for (var i=0; i< elems.length; i++){
		elems[i].render(context);
	}
	context.globalAlpha=1;
}

extpadding = 32;
tilepadding = 16;
tileheight = 32;
tilewidth = 81.6;

function makeField(){	
	var elems = Array();
	for(var y=0; y<tilecolors.length; y++){
		for(var x=0; x<10; x++){
			var e = new Elem(
				extpadding+(tilewidth+tilepadding)*x,
				extpadding+(tileheight+tilepadding)*y, 
				tilewidth, 
				tileheight, tilecolors[y]);
			
			e.animation = (
				delayAnim(
					multiAnim(
						fadeIn(500),
						scaleIn(600, 0.9),
						zoomIn(500, 
							0, 
							128+10*Math.random()
						)),
					((5-Math.abs(x-4.5))*5+y*10)*10+
						10*Math.random()
				));
			
			elems.push(e);
		}
	}
	return elems;
}

function makePlayer(){
	var p = new Player(
		canvaswidth/2-64, 
		canvasheight-132,
		128, 32, "#C5C8C6");

	p.animation = delayAnim(
		multiAnim(
			fadeIn(500),
			scaleIn(600, 0.9),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 1000);
	return p;
}

function makeBall(){
	var b = new Ball(
		canvaswidth/2-8, 
		canvasheight-132-24,
		16, "#C5C8C6");

	b.animation = delayAnim(
		multiAnim(
			fadeIn(500),
			scaleIn(600, 0.9),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 1000);
	return b
}

function run(){
	/* initialize timing and input */
	var lastupdate = new Date().getTime();
	var input = new InputTracker(true) //disabled

	document.addEventListener('keydown', 
		function(e){input.keydown(e)},
		false);
	document.addEventListener('keyup',
		function(e){input.keyup(e)},
		false);

	/* Initialize game elements */
	var elems = Array();
	var blocks = makeField();
	elems = elems.concat(blocks);
	
	var player = makePlayer();
	elems.push(player);

	var ball = makeBall();
	elems.push(ball);

	/* set timeout on game start */
	setTimeout(function(){
		console.log("game start");
		input.enabled = true;
	}, 1500)

	function mainloop(){
		var newtime = new Date().getTime();

		ball.collideAll(blocks);

		updateGame(elems, input, newtime - lastupdate);
		renderGame(context, elems);

		lastupdate = newtime;

		setTimeout(mainloop, 
			1000/60);
	}
	mainloop();
}

window.onload = function() {run();}
