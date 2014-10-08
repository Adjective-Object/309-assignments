/* control constants */
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

extpadding = 32;
tilepadding = 16;
tileheight = 32;
tilewidth = 81.6;

font = '48pt Droid Sans Mono';
textAlign = 'center';


/* Initialize the canvas */
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");


/* globalinformation variables and flags*/
var canvaswidth = canvas.width;
var canvasheight = canvas.height;

var started = false;
var gameover = false;
var statechangehandled = true;

var elems, blocks, player, ball

context.font = font;
context.textAlign = textAlign;


/* Initialize the input system */
var input = new InputTracker(true) //disabled at start
document.addEventListener('keydown', 
	function(e){input.keydown(e)},
	false);
document.addEventListener('keyup',
	function(e){input.keyup(e)},
	false);

function gameLose(){
	gameover = true;
	statechangehandled = false;
	
	input.enabled = false;
	setTimeout(function(){
		input.enabled = true;
	}, 1500)
}

function gameReset(){
	started = false;
	gameover = false
	statechangehandled = false

	input.enabled = false;
	setTimeout(function(){
		input.enabled = true;
	}, 1500)
}


/* Game Logic */
function updateGame(elems, input, tstep){
	input.update();
	for (var i=0; i<elems.length; i++){
		elems[i].update(input, tstep);
	}
}

function renderGame(context, elems){
	context.fillStyle = bkgcolor;
	context.globalAlpha=0.6;
	context.fillRect(0,0,canvaswidth, canvasheight)
	for (var i=0; i< elems.length; i++){
		elems[i].render(context);
	}
	context.globalAlpha=1;
}

function stripDeadObjects(elems){
	for (var i=0; i< elems.length; i++){
		if (!elems[i].alive){
			elems.splice(i,1);
		}
	}
	return elems
}

function killAll(lst){
	for (var i=0; i<lst.length; i++){
		if(lst[i].active){
			lst[i].destroy();
		}
	}
}


function run(){
	/* initialize timing and input */
	var lastupdate = new Date().getTime();
	elems = new Array();
	elems = makeInitialScreen(elems);
	
	/* set timeout on game start for loading animation to complete*/
	setTimeout(function(){
		input.enabled = true;
	}, 1500)


	/* mainloop with fps controlled by timer callbacks*/
	function mainloop(){
		var newtime = new Date().getTime();

		//gameover game
		if(gameover && !statechangehandled){
			statechangehandled = true;
			killAll(elems)
			elems = makeGameOverScreen(elems);
		} 
		//restart game
		else if (!statechangehandled){
			statechangehandled = true;
			killAll(elems);
			elems = makeInitialScreen(elems);
		}

		elems = stripDeadObjects(elems);
		updateGame(elems, input, newtime - lastupdate);


		ball.collideAll(blocks);
		ball.collidePaddle(player);
		lastupdate = newtime;

		/* cap fps at 60 */
		setTimeout(mainloop, 
			1000/120 - (new Date().getTime() - lastupdate));

		renderGame(context, elems);
	}

	mainloop();
}

window.onload = function() {run();}
