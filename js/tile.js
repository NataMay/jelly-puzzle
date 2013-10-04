function Tile(size,color,eye){
    this.size = size;
	this.color = color;
	this.eye = eye;
	this.drawEyes = false;
	this.EyesSpeed = 0;
	this.currentEye = 4;
	this.targetEye = 4;
	
	this.draw = function(ctx, transform,light) {
		ctx.save();
		ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
		if(light == 0)
			ctx.drawImage(Candies[color],1,1);
		else
			ctx.drawImage(Candies_light[color],1,1,64,64);
			
		if(this.drawEyes === true)
		{
			
			ctx.save();
			ctx.translate((size-eyes[eye][this.currentEye].width)/2-1,(size-eyes[eye][this.currentEye].height)/2);
			ctx.drawImage(eyes[eye][this.currentEye],0,0);
			ctx.restore();
			if(this.currentEye > this.targetEye)
				this.currentEye--;
			if(this.currentEye < this.targetEye)
				this.currentEye++;
			if(this.currentEye == this.targetEye)
			{
				if(this.currentEye == 4)
					this.drawEyes = false;
			}
		}
		
		ctx.restore();
	}
	
	this.OpenEyes = function(s) {
		this.drawEyes = true;
		this.targetEye = 0;
		this.speed = s;
	}
	
	this.OpenEyes = function() {
		this.drawEyes = true;
		this.targetEye = 0;
		this.speed = 0;
	}
	
	this.CloseEyes = function() {
		//this.drawEyes = false;
		this.targetEye = 4;
		this.speed = 0;
	}
	
	this.CloseEyes = function(s) {
		//this.drawEyes = false;
		this.targetEye = 4;
		this.speed = s;
	}
}