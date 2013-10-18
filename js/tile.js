function Tile(size,color,eye,sprite_size){
    this.size = size;
	this.color = color;
	this.eye = eye;
	this.drawEyes = false;
	this.EyesSpeed = 0;
	this.currentEye = 4;
	this.targetEye = 4;
	this.sprite_size = sprite_size;
	this.border = Math.ceil((this.size*0.04)/2);
	
	this.draw = function(ctx, transform,light) {
		ctx.save();
		ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
		//if(light != 0)
		//	light = sprite_size;
			//ctx.drawImage(Candies[color],this.border,this.border,this.size-this.border,this.size-this.border);
		//else
		
		ctx.drawImage(candies_sprite,this.color*this.sprite_size,light*this.sprite_size,this.sprite_size,this.sprite_size,this.border,this.border,this.size-this.border,this.size-this.border);
		//console.log(light);
			
		if(this.drawEyes === true)
		{
			
			/*ctx.save();
			console.log(size);
			ctx.translate(0,(size-eyes[eye][this.currentEye].height)/2);
			ctx.drawImage(eyes[eye][this.currentEye],0,0);
			ctx.restore();*/
			
			ctx.save();
			ctx.translate(0,size/4);
			
			ctx.drawImage(eyes_sprite,this.currentEye*this.sprite_size,this.eye*(this.sprite_size/2),this.sprite_size,this.sprite_size/2,this.border*2,this.border*2,this.size-this.border*3,this.size/2-this.border*2);
			//console.log();
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