function Star(type,index,x,y) {
	this.type = type;
	this.index = index;
	this.drawIndex = index;
	this.x = x;
	this.y = y;
}

function Bang(config) {
	var stars = [];
	var ends = [];
	var f = 0;
	var k = 360/config.count;
	var r;
	var finished = false;
	var StarSize = height/16;
	for(i = 0; i < config.count; i ++) {
		stars.push(new Star(Math.round(Math.random()), Math.floor(Math.random()*6),config.x,config.y));
		r = config.radius + Math.random()*(config.radius*0.2) - config.radius*0.1;
		var X = config.x+r*Math.cos(f*2*Math.PI/360);
		var Y = config.y+r*Math.sin(f*2*Math.PI/360);
		ends.push({x: X,y: Y});
		f = f + k;
	}
	
	var img = new Image();
	img.src = "img/stars.png";
	img.OnLoad = function(){};
	var tween = new Kinetic.Tween({
		node: stars,
		end: ends,
		duration: config.duration,
		easing: Kinetic.Easings.StrongEaseOut,
		onStep: function(n,step) {
			if(Object.prototype.toString.call(n) == '[object Array]') {
				var index;
				for(i = 0; i < n.length;i++)
				{
					if(step > 0.95 && !anim.isRunning())
						anim.start();
					stars[i].x = n[i].x;
					stars[i].y = n[i].y;	
				}
			}
		},
		onFinish: function() {

			play = false;
			finished = true;
			anim.stop();
		}
	});
	
	var anim = new Kinetic.Animation(function(frame) {
		for(i = 0; i < stars.length;i++)
			stars[i].drawIndex = stars[i].index + Math.floor(frame.time / 50);
	});
	var play = false;

	this.isPlaying = function() {
		return play;
	}
	
	this.isFinished = function() {
		return finished;
	}

	this.play = function() {
		if(!finished && !play)
		{
			play = true;
			tween.play();
		}
	}

	this.draw = function() {
		for(i = 0; i < stars.length; i++) {
			if(stars[i].drawIndex < 6)
				ctx.drawImage(img,stars[i].type*64,stars[i].drawIndex*64,64,64,stars[i].x,stars[i].y,StarSize,StarSize);
			
		}
	}

}