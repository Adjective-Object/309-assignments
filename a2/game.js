var canvas, context
var canvaswidth, canvasheight, tilewidth

var STATE_LOSE = 0;
var STATE_RESET = 1;
var STATE_WIN 	= 2;


var lives = 3; // Number of lives a player starts with
var started = false;
var width_halved = false;
var elems, blocks, player, ball, scoreText, livesText

	/* Initialize the canvas */2
	canvas = document.getElementById("game");
	context = canvas.getContext("2d");

	/* global information variables and flags*/
	canvaswidth = canvas.width;
	canvasheight = canvas.height;

	tilewidth = (canvaswidth - (fieldwidth * tilepadding) - 2 * (extpadding)) / fieldwidth;

	var nextstate = null;
	var statechangehandled = true;
	var score = 0;

	/* Initialize the input system */
	var input = new InputTracker(true) // Disabled at start
	document.addEventListener('keydown', 
		function(e){input.keydown(e)},
		false);
	document.addEventListener('keyup',
		function(e){input.keyup(e)},
		false);

	/* Global methods to be called by game objects*/
	function updateScore(block) {
		score += Math.floor((10 * ((canvasheight - block.logic.y)/canvasheight)));
		//console.log("score", score);
		scoreText.text = ""+score;
		scoreText.fontsize = 24+(score/5);
		scoreText.animation = multiAnim(
								fade(200, 0.8, 0.2+score/1000),
								scale(200,1.5,1), 
								shake(250, (score/50)*(Math.random()-Math.random()) ));
		scoreText.animationtime = 0;

		if(block.graphic.color == tilecolors[0] && !width_halved){
			width_halved = true;
			player.logic.x = player.logic.x + player.logic.width/4;
			player.logic.width = player.logic.width/2;
		}
	}

	function gameLose() { // Called when lives === 0
		nextstate = STATE_LOSE;
		statechangehandled = false;
		lives = 3;

		input.enabled = false;
		setTimeout(function(){
			input.enabled = true;
		}, 1500)
	}


	function gameReset() {  // Resets game state upon level completion
		nextstate = STATE_RESET;
		started = false;
		statechangehandled = false
		width_halved = false;
		input.enabled = false;
		setTimeout(function(){
			input.enabled = true;
		}, 1500)
	}

	function checkWinstate() {
		console.log("Checking winstate");
		if(statechangehandled){
			for (var i=0; i<blocks.length; i++) {
				if (blocks[i].active){
					return;
				}
			}
			console.log("winstate!");
			nextstate = STATE_WIN;
			statechangehandled = false;
		}
	}


	/* Game Logic */
	function updateGame(elems, input, tstep) {
		input.update();
		for (var i=0; i < elems.length; i++) {
			elems[i].update(input, tstep);
		}
	}

	function renderGame(context, elems) {
		context.fillStyle = bkgcolor;
		context.globalAlpha=1;
		//context.globalAlpha=0.6;
		context.fillRect(0,0,canvaswidth, canvasheight)
		for (var i=0; i< elems.length; i++) {
			elems[i].render(context);
		}
		context.globalAlpha=1;
	}

	function stripDeadObjects(lst) {
		for (var i=0; i < lst.length; i++) {
			if (!lst[i].alive){
				lst.splice(i,1);
			}
		}
		return lst
	}

	function killAll(lst) {
		for (var i=0; i < lst.length; i++) {
			if(lst[i].active){
				lst[i].destroy();
			}
		}
	}

	function spawn(e) {
		elems.push(e);
	}

	function run() {
		/* initialize timing and input */
		var lastupdate = new Date().getTime();
		elems = new Array();
		elems = makeInitialScreen(elems);
		
		/* set timeout on game start for loading animation to complete*/
		setTimeout(function() {
			input.enabled = true;
		}, 1500)


		/* mainloop with fps controlled by timer callbacks*/
		function mainloop() {
			var newtime = new Date().getTime();

			if (!statechangehandled){

				// Game over
				if(nextstate == STATE_LOSE) {
					killAll(elems)
					elems = makeGameOverScreen(elems);
				} 

				// Restart game
				else if ( nextstate == STATE_RESET) {
					killAll(elems);
					elems = makeInitialScreen(elems);
				}

				// Win game
				else if (nextstate == STATE_WIN) {
					killAll(elems);
					elems = makeWinScreen(elems);
				}
				else {
					console.log("unknown state change", nextstate)
				}
				nextstate = null;
				statechangehandled = true;
			}

			elems = stripDeadObjects(elems);
			blocks = stripDeadObjects(blocks);
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

window.onload = run();
