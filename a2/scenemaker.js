
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
						fade(500,0,1),
						scale(600, 0.9, 1),
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
		canvasheight-64,
		128, 32, playercolor);

	p.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.9, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 900);
	return p;
}

function makeBall(){
	var b = new Ball(
		canvaswidth/2-8, 
		canvasheight-64-24,
		16, playercolor);

	b.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.9, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 1000);
	return b
}

function makeIntroText(){
	var t = new DissapearText(
		"press space to start",
		canvaswidth/2,
		canvasheight/2,
		playercolor);

	t.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 800);

	return t;
}


function makeInitialScreen(elems){
	/* Initialize game elements */
	blocks = makeField();
	elems = elems.concat(blocks);
	
	player = makePlayer();
	elems.push(player);

	ball = makeBall();
	elems.push(ball);

	elems.push(makeIntroText());
	return elems
}

function makeGameOverScreen(elems){
	var t1 = new DissapearText(
	"game over",
	canvaswidth/2,
	canvasheight/2,
	playercolor);

	t1.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 400);
	
	var t2 = new DissapearText(
	"press space to play again",
	canvaswidth/2,
	canvasheight/2 + 132,
	playercolor);

	t2.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 600);


	elems.push(t1);
	elems.push(t2);

	elems.push(new GameReStarter());

	return elems;
}