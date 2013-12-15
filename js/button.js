function Button(config) {//(ctx,images,x,y,width,height) {
	this.state = (config.state ? config.state : 'normal');
	this.index = config.index;
	this.x = config.x;
	this.y = config.y;
	var images = config.images;
	this.width = config.width;
	this.height = config.height;
	this.onDraw = config.onDraw;
	this.onDrawBefore = config.onDrawBefore;

	var ctx = config.ctx;
	var variant = (config.variant ? config.variant : 0);
	
	this.draw = function(callback) {
		//clear(this.x,this.y,this.width,this.height);
		ctx.save();
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		
		if(this.onDrawBefore)
			this.onDrawBefore();
				
		ctx.translate(this.x,this.y);
		//console.log(this.x,this.y);
		switch(this.state) {
		case 'normal':
			ctx.drawImage(images.normal, variant*images.normal.height, 0,images.normal.height, images.normal.height,0,0,this.width,this.height);
			break;
		case 'light':
			ctx.drawImage(images.light, 0, 0,images.light.height, images.light.height,0,0,this.width,this.height);
			break;
		case 'locked':
			ctx.drawImage(images.locked, 0, 0,images.locked.height, images.locked.height,0,0,this.width,this.height);
			break;
		}
		if(callback)
			callback();
			

			
		if(this.onDraw)
			this.onDraw();
		ctx.restore();
	}
	
	this.setState = function(state,callback) {
		this.state = state;
		this.draw(callback);
	}
	
	this.getState = function() {
		return this.state;
	}
	
	this.checkMouse = function(mouseX, mouseY) {
		if( (mouseX > this.x && mouseX < this.x + this.width) && (mouseY > this.y && mouseY < this.y + this.height) )
			return true;
		else
			return false;
	}
	this.SetPos = function(x,y)
	{
		this.x = x;
		this.y = y;
		//this.draw();
	}

}