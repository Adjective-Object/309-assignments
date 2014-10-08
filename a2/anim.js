
var ease = function(frac){
	return 1-Math.sin((1-frac)*1.57)
}

/* Animation functions */
function nilanim(t, graphic){
	return graphic;
}

function makeshake(animtime, intensity){
	var shaker = function(t, graphic){
		if (t>animtime){
			graphic.rotation = 0;
			return graphic;
		}

		graphic.rotation = (
			Math.sin(t/animtime*6.28) * 
			((animtime-t)/animtime) ) *
			intensity;
		return graphic;
	}
	return shaker;
}

function fadeIn(animtime){
	var fade = function(t, graphic){
		if (t>animtime){
			graphic.alpha = 1;
			return graphic;
		}

		graphic.alpha = ease(t/animtime)
		return graphic;
	}
	return fade;
}

function scaleIn(animtime, initial){
	var zoom = function(t, graphic){

		if(t>animtime){
			graphic.scale = 1;
			return graphic;
		}

		graphic.scale = initial + (1-initial) * ease(t/animtime)
		return graphic;
	}
	return zoom;
}

function zoomIn(animtime, offx, offy){
	var zoom = function(t, graphic){

		if(t>animtime){
			graphic.x = 0;
			graphic.y = 0;
			return graphic;
		}

		graphic.x = (ease(1 - t/animtime) * offx)
		graphic.y = (ease(1 - t/animtime) * offy)

		return graphic;
	}
	return zoom;
}

function multiAnim(){
	var anims = arguments;
	var multi = function(t, graphic){
		for (var i=0; i<anims.length; i++){
			graphic = anims[i](t, graphic);	
		}
		return graphic;
	}
	return multi;
}

function delayAnim(anim, delaytime){
	var delayed = function(t, graphic){
		t = t - delaytime;
		if (t<0){t = 0;}

		return anim(t, graphic);
	}
	return delayed
}
