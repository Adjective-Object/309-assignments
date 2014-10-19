
function makeField(){	
	var elems = Array();
	for(var y=0; y<tilecolors.length; y++){
		for(var x=0; x<fieldwidth; x++){// this is 10
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
					((5-Math.abs(x-fieldwidth/2))*5+y*10)*10+
						10*Math.random()
				));
			
			elems.push(e);
		}
	}
	return elems;
}

function makePlayer(){
	var p = new Player(
		canvaswidth/2-128, 
		canvasheight-64,
		256, 32, playercolor);

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
		canvasheight/2 + 128,
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

function makeUI(){
	var t = new ElemText(
		"Score",
		extpadding,
		canvasheight-extpadding-64,
		playercolor);
	t.textAlign = "left";
	t.fontsize = 24;

	t.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 800);
	return [t];
}

function makeScoreText(){
	var t2 = new ElemText(
			"0",
			canvaswidth/2,
			canvasheight/2,
			playercolor);
		t2.fontsize = 24;

	return t2;
}

function makeLivesText(){
	var t2 = new ElemText(
			"Lives: 3",
			canvaswidth-extpadding-72,
			canvasheight-extpadding,
			playercolor);
		t2.fontsize = 24;
		t2.textAlign = "center"

	return t2;
}


function makeInitialScreen(elems){
	/* UI */
	//elems = elems.concat(makeUI());
	scoreText = makeScoreText();
	scoreText.graphic.color = darktext
	scoreText.graphic.alpha = 0;
	elems.push(scoreText);


	livesText = makeLivesText();
	elems.push(livesText);

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


function makeWinScreen(elems){
	var t1 = new DissapearText(
	"You Win!",
	canvaswidth/2,
	canvasheight/2-132,
	playercolor);

	t1.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 400);
	

	var t2 = new DissapearText(
	"your score: "+score,
	canvaswidth/2,
	canvasheight/2,
	playercolor);

	t2.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 500);

	var t3 = new DissapearText(
	"press space to play again",
	canvaswidth/2,
	canvasheight/2 + 132,
	playercolor);

	t3.animation = delayAnim(
		multiAnim(
			fade(500, 0, 1),
			scale(600, 0.95, 1),
			zoomIn(500, 0,
				128+10*Math.random()
			)), 600);


	elems.push(t1);
	elems.push(t2);
	elems.push(t3);

	elems.push(new GameIncrementer());

	return elems;
}