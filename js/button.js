function Button(config) {//(ctx,images,x,y,width,height) {
	this.state = 'normal';
	this.index = config.index;
	this.x = config.x;
	this.y = config.y;
	var images = config.images;
	this.width = config.width;
	this.height = config.height;
	this.onDraw = config.onDraw;
	var ctx = config.ctx;
	
	this.draw = function(callback) {
		//clear(this.x,this.y,this.width,this.height);
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(this.x,this.y);
		//console.log(this.x,this.y);
		switch(this.state) {
		case 'normal':
			ctx.drawImage(images.normal, 0, 0,images.normal.width, images.normal.height,0,0,this.width,this.height);
			break;
		case 'light':
			ctx.drawImage(images.light, 0, 0,images.light.width, images.light.height,0,0,this.width,this.height);
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