function Tile(size,color,eye,sprite_size,locked){
    this.size = size;
	this.color = color;
	this.eye = eye;
	this.drawEyes = false;
	this.currentEye = 4;
	this.targetEye = 4;
	this.sprite_size = sprite_size;
	this.locked = locked;
	this.border = Math.ceil((this.size*0.04)/2);
	
	this.draw = function(ctx, transform,light) {
		ctx.save();
		ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
		if(this.color > 14 && !this.locked) {
			var big_size = sprite_size << 1;
			ctx.drawImage(big_sprite,((this.color-15) / 4)*big_size,light*big_size,big_size,big_size,this.border,this.border,this.size*2-this.border,this.size*2-this.border);
		} else
			ctx.drawImage(candies_sprite,this.color*this.sprite_size,light*this.sprite_size,this.sprite_size,this.sprite_size,this.border,this.border,this.size-this.border,this.size-this.border);
			
		if(this.locked)
			ctx.drawImage(locked_img,0,0,sprite_size,sprite_size,this.border,this.border,this.size-this.border,this.size-this.border);
			
		if(this.drawEyes === true && this.eye != -1)
		{	
			ctx.save();
			if(this.eye > 14 && !this.locked)
			{
				ctx.translate(0,size/2);
				
				ctx.drawImage(eyes_sprite,this.currentEye*this.sprite_size,((this.eye-15) / 4)*(this.sprite_size/2),this.sprite_size,this.sprite_size/2,this.border*2,this.border*2,this.size*2-this.border*3,this.size-this.border*2);
			}
			else
			{
			
				ctx.translate(0,size/4);
				
				ctx.drawImage(eyes_sprite,this.currentEye*this.sprite_size,this.eye*(this.sprite_size/2),this.sprite_size,this.sprite_size/2,this.border*2,this.border*2,this.size-this.border*3,this.size/2-this.border*2);
				//console.log();
			}
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
	
	this.OpenEyes = function() {
		this.drawEyes = true;
		this.targetEye = 0;
	}
	
	this.CloseEyes = function() {
		this.targetEye = 4;
	}

}