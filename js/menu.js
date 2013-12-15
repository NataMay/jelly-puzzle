function Menu(ctx,width, height,CountLevel, count, images) {
	
	var self = this;
	this.height = height;
	this.width = width;
	this.enabled = true;
	this.redraw = false;
	//this.resume = true;
	this.CountLevel = CountLevel;
	this.GlobalCount = count;
	var startNum = 0;
	var ctx = ctx;
	
	this.page = 'main';
	
	
	if(localStorage.getItem("enableSFX") == "true")
		this.enableSFX=true;
	else
		this.enableSFX=false;

	
	if(localStorage.getItem("enableMusic") == "true")
		this.enableMusic=true;
	else
		this.enableMusic=false;
	
	//this.newGame = function(levelNum) {};
	this.exitGame = function() {};
	
	var	hint;
	this.page_hint=0;
	
	var N_level=0;

	var hint1 = images.hint1;
	var hint2 = images.hint2;
	var hint3 = images.hint3;	
	var logo = images.logo;
	var winner = images.winner;
	var eyes = images.eyes;
	var shadow = images.shadow;
	var numbers = images.numbers;
	var help = images.helpImg;
	
	var widthText = this.width-this.height/2;
	var heightText = this.height/4;
	var k = widthText/heightText;
	
	var Bright1 = 0;
	var Bright2 = 0;
	this.step1 = 0;
	this.step2 = 0;
	
	var btnNewGame = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnNewGame,
				light	: images.btnNewGameLight },
	x		: (this.width - this.height * 0.3) / 2,
	y		: (this.height - this.height * 0.3) -  this.height / 4,
	width	: this.height * 0.3,
	height	: this.height * 0.3,
	onDrawBefore : function() {
		//5.95 отношение ширины к высоте
		
		clear((self.width - self.width/2) / 2, 20,self.width/2,((self.width/2)/5.95));
		ctx.drawImage(logo, (self.width - self.width/2) / 2, 20,self.width/2,((self.width/2)/5.95));
		
		//отношение 2.88
		var blockH = (((self.height - self.height * 0.3) -  self.height / 4) - position.y);
		//console.log(blockH);
		clear((self.width - this.width*1.2) / 2 + blockH/2, (self.height/2) + self.height * 0.14,this.width*1.2 - blockH, (self.height * 0.3)/2);
		ctx.drawImage(shadow, (self.width - this.width*1.2) / 2 + blockH/2, (self.height/2) + self.height * 0.14,this.width*1.2 - blockH, (self.height * 0.3)/2);
	},
	onDraw	: function() {
		ctx.drawImage(eyes, 0, this.height /4 ,this.width,this.width/2)
	},
	});
	var velocity = new PVector(0,-2);
	var gravity = new PVector(0,0.1);
	var position = new PVector((this.width - this.height * 0.3) / 2,(this.height - this.height * 0.3) -  this.height / 4);
	var pointScale = (this.height - this.height * 0.3) - this.height / 4  - btnNewGame.height*0.1;
	var anim = new Kinetic.Animation(function(frame) {
		position.add(velocity);
		velocity.add(gravity);
		clear(btnNewGame.x-10,btnNewGame.y-10,btnNewGame.width+20,btnNewGame.height+20);
		
		if(position.y > pointScale) {
			
			btnNewGame.height = self.height * 0.3 - Math.abs(pointScale - position.y);
			btnNewGame.width = self.height * 0.3 + (self.height * 0.3 - btnNewGame.height);
			position.x = ((self.width - self.height * 0.3) / 2) - (self.height * 0.3 - btnNewGame.height)/2;
		}
		else
			btnNewGame.height =  self.height * 0.3;
			btnNewGame.SetPos(position.x,position.y);
			btnNewGame.draw();
			if(position.y > (self.height - self.height * 0.3) - self.height / 4) {
				velocity.y = Math.random()*(-2) -3;
		}
	});
	
	var btnMusic = new Button({
	ctx		: ctx,
	state	: (this.enableMusic ? "normal" : "light"),
	images	: { normal	: images.btnMusic,
				light	: images.btnMusic_Off },
	x		: this.width/2 - this.width/8,
	y		: this.height/2 - this.height/3.5,
	width	: this.width/8,
	height	: this.width/8
	});	
	
	var btnSFX = new Button({
	ctx		: ctx,
	state	: (this.enableMusic ? "normal" : "light"),
	images	: { normal	: images.btnSFX,
				light	: images.btnSFX_Off },
	x		: this.width/2,
	y		: this.height/2 - this.height/3.5,
	width	: this.width/8,
	height	: this.width/8
	});	
	
	var btnSettings = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnSettings,
				light	: images.btnSettings },
	x		: 0.1,
	y		: this.height-this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});
	
	var btnHint = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnHint,
				light	: images.btnHint },
	x		: this.width/2-this.height/8,
	y		: this.height/2,
	width	: this.height/4,
	height	: this.height/4
	});
	
	var btnExitGame = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnExitGame,
				light	: images.btnExitGame },
	x		: this.width - this.height/4,
	y		: this.height-this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});

	var btnBackMenu = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnBackMenu,
				light	: images.btnBackMenu },
	x		: this.width/2 - this.height/8,
	y		: this.height - this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnToLevels = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnToLevels,
				light	: images.btnToLevels },
	x		: this.width/2 - this.height/8-this.height/4,
	y		: this.height - this.height/2,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnRestart = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnRestart,
				light	: images.btnRestart },
	x		: this.width/2-this.height/8,
	y		: this.height - this.height/2,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnResume = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnResume,
				light	: images.btnResume },
	x		: this.width/2 + this.height/8,
	y		: this.height - this.height/2,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnNextLevel = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnNextLevel,
				light	: images.btnNextLevel },
	x		: this.width/2 + this.height/8,
	y		: this.height - this.height/2,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnNextPage = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnNext,
				light	: images.btnNext },
	x		: this.width - this.height/4,
	y		: this.height - this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});
	
	var btnPrevPage = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnPrevious,
				light	: images.btnPrevious },
	x		: 0.1,
	y		: this.height - this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});
	
	var btnsLevel = [];
	
	this.createLevelsPage = function(num) {
		for (var i = num; i < this.CountLevel + num; i++) {
			var x = (i-num) % 5;
			var y = Math.floor((i-num) / 5);	
			btnsLevel[(i-num)] = new Button({
			index	: i+1,
			ctx		: ctx,
			images	: { normal	: images.btnsLevel,
						locked	: images.btnsLevel_locked },
			x		: this.width/5*x + (this.width/5 - (this.height/4 - 10))/2,
			y		: this.height/4*y + 5,
			width	: this.height/4 - 10,
			height	: this.height/4 - 10,
			state	: (user_progress[i] == "locked" ? "locked" : "normal"),
			variant : (num/this.CountLevel) >> 0,
			onDraw	: function() {
				if(this.state != "locked")
				{
					if(this.index < 10) {
						ctx.drawImage(numbers, this.index*256, 0, 256, numbers.height,this.width*0.25,this.height*0.25,this.width/2,this.height/2);
					} else {
						var n = this.index%10;
						ctx.drawImage(numbers, n*256, 0, 256, numbers.height,this.width*0.41,this.height*0.25,this.width/2,this.height/2);
						n = (this.index/10) >> 0;
						ctx.drawImage(numbers, n*256, 0, 256, numbers.height,this.width*0.1,this.height*0.25,this.width/2,this.height/2);
					}
				}
			}
			});	
		}
	
	}
	
	this.createLevelsPage(0);

	this.draw = function() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		switch(this.page) {
		case 'main':
			ctx.drawImage(help, self.width/8, self.height/3,self.width/4,((self.width/4)/2.88));
			anim.start();
			btnSettings.draw();
			btnExitGame.draw();
		break;
		case 'settings':
			btnMusic.draw();
			btnSFX.draw();
			btnBackMenu.draw();
			btnHint.draw();
		break;
		
		case 'hints':
			clear(btnExitGame.x,btnExitGame.y,btnExitGame.width,btnExitGame.height);
			clear(btnNextPage.x,btnNextPage.y,btnNextPage.width,btnNextPage.height);
			
			btnExitGame.SetPos(width - height/4, 0, height/4, height/4);
			btnExitGame.draw();
			if(this.page_hint<2){
				btnNextPage.draw();
			}
			clear(btnPrevPage.x,btnPrevPage.y,btnPrevPage.width,btnPrevPage.height);
			if(this.page_hint>0){
				
				btnPrevPage.draw();
			}
			var kImg=hint1.width/hint1.height;
			var widthImg;
			var heightImg;
			if(k > kImg){
				widthImg = heightText*kImg;
				heightImg = heightText;
				//console.log(k, kImg, widthImg, heightImg, widthText, heightText);
			}
			else
			{
				widthImg = widthText;
				heightImg = widthText/kImg;
			}
			clear((width-widthImg)/2, height - heightImg, widthImg, heightImg);
			if(this.page_hint==0){
				ctx.drawImage(hint1, (width-widthImg)/2, height - heightImg, widthImg, heightImg);
			}
			if(this.page_hint==1){
				ctx.drawImage(hint2, (width-widthImg)/2, height - heightImg, widthImg, heightImg);
			}
			if(this.page_hint==2){
				ctx.drawImage(hint3, (width-widthImg)/2, height - heightImg, widthImg, heightImg);
			}
		break;
		
		case 'levels':
			for (var i = 0; i < this.CountLevel; i++) {
				btnsLevel[i].draw();
			}
			btnBackMenu.SetPos(this.width/2 - this.height/8, this.height - this.height/4);
			btnBackMenu.draw();
			btnNextPage.draw();
			btnPrevPage.draw();
		break;
		
		case 'view_level':	
			ctx.fillStyle='rgba(10,10,10,0.5)';
			ctx.fillRect(0, 0, this.width, this.height/6);
			ctx.fillRect(0, this.height - this.height/6, this.width, this.height/6);
			ctx.fillStyle='rgba(10,10,10,0.8)';
			ctx.fillRect(0, this.height/6, this.width, this.height-this.height/3);
			if(localStorage.getItem("levelPlayed") == N_level)
			{
				btnBackMenu.SetPos(this.width/2 - this.height/8-this.height/4,this.height - this.height/2.2);
				btnBackMenu.draw();
				btnRestart.SetPos(this.width/2-this.height/8, this.height - this.height/2.2);
				btnRestart.draw();
				btnResume.SetPos(this.width/2 + this.height/8, this.height - this.height/2.2);
				btnResume.draw();
			}
			else
			{
				btnBackMenu.SetPos(this.width/2-this.height/4, this.height - this.height/2.2);
				btnBackMenu.draw();
				btnResume.SetPos(this.width/2, this.height - this.height/2.2);
				btnResume.draw();			
			}
			currentLevel=N_level;
			circlesCount=levels[currentLevel][1].length;
			var scaleRect=this.height/3/circlesCount;
			drawLevel(ctx, this.width/2-scaleRect*circlesCount/2, this.height/5.5, scaleRect);
		break;
		
		case 'pause':
			btnRestart.SetPos(this.width/2-this.height/8, this.height - this.height/2);
			btnResume.SetPos(this.width/2 + this.height/8, this.height - this.height/2);
			ctx.fillStyle='rgba(10,10,10,0.5)';
			ctx.fillRect(0, 0, this.width, this.height/6);
			ctx.fillRect(0, this.height - this.height/6, this.width, this.height/6);
			ctx.fillStyle='rgba(10,10,10,0.8)';
			ctx.fillRect(0, this.height/6, this.width, this.height-this.height/3);
			btnToLevels.draw();
			btnMusic.draw();
			btnSFX.draw();
			btnRestart.draw();
			btnResume.draw();		
		break;
		
		case 'win':
			clear();
			ctx.fillStyle='rgba(10,10,10,'+ Bright1 +')';
			ctx.fillRect(0, 0, this.width, this.height/6);
			ctx.fillRect(0, this.height - this.height/6, this.width, this.height/6);

			ctx.fillStyle='rgba(10,10,10,'+ Bright2 +')';
			ctx.fillRect(0, this.height/6, this.width, this.height-this.height/3);
			
			Bright1 += this.step1;
			Bright2 += this.step2;
			
			if(bang.isPlaying())
				bang.draw();
			if(bang1.isPlaying())
				bang1.draw();
				
			if(Bright1 >= 0.2 && Bright2 >= 0.3 && !bang.isPlaying())
			{
				bang.play();
			}

			if(Bright1 >= 0.4 && Bright2 >= 0.6 && !bang1.isPlaying())
			{
				bang1.play();
			}			
				
			if(Bright1 >= 0.5 && Bright2 >= 0.8)
			{
				this.step1 = 0;
				this.step2 = 0;
			}
			
			if(bang.isFinished() && bang1.isFinished())
				this.redraw = false;
				
			ctx.drawImage(winner, (this.width - winner.width) / 2, this.height/4);
			btnToLevels.draw();	
			btnRestart.draw();
			btnNextLevel.draw();
		
		break;
		}
		ctx.restore();
	}
	
	this.click = function(clickX, clickY) {
		clickStartX = clickX;
		clickStartY = clickY;
	
	}
	
	this.clickUp = function(clickX, clickY) {
		switch(this.page) {
		case 'main':
			if (btnNewGame.checkMouse(clickX, clickY)) {
				this.page = 'levels';
				anim.stop();
				clear();
				this.draw();
			}

			if (btnSettings.checkMouse(clickX, clickY)) {
				this.page = 'settings';
				anim.stop();
				clear();
				this.draw();
			}			
		break;
		
		case 'settings' :
			if (btnMusic.checkMouse(clickX, clickY)) {
				if(this.enableMusic){
					this.enableMusic=false;
					backgroundSound.pause();
					localStorage.setItem("enableMusic","false");
					btnMusic.setState('light');	
				}else{
					this.enableMusic=true;
					backgroundSound.play();
					localStorage.setItem("enableMusic","true");
					btnMusic.setState('normal');
				}
			}
			if (btnSFX.checkMouse(clickX, clickY)) {
				if(this.enableSFX){
					this.enableSFX=false;
					localStorage.setItem("enableSFX","false");
					btnSFX.setState('light');
				}else{
					this.enableSFX=true;
					localStorage.setItem("enableSFX","true");
					btnSFX.setState('normal');
				}
			}			
			if (btnBackMenu.checkMouse(clickX, clickY)) {
				this.page = 'main';
				clear();
				this.draw();
			}
			if (btnHint.checkMouse(clickX, clickY)) {
				clearInterval(id);
				clear();
				ctx.setTransform(1, 0, 0, 1, 0, 0);
				currentLevel=0;
				circlesCount=levels[currentLevel][1].length;
				hint = new Hint(ctx, this.width, this.height, (this.height/4)/circlesCount);
				this.page = 'hints';
				this.draw();
			}			
		break;
		
		case 'hints':
			if (btnExitGame.checkMouse(clickX, clickY)) {
				hint.stop();
				hint = null;
				this.page = 'main';
				btnExitGame.SetPos(this.width - this.height/4, this.height-this.height/4, this.height/4, this.height/4);
				id = setInterval(drawScene, 30);
				this.page_hint = 0;
			}	
			if(this.page_hint<2){
				if (btnNextPage.checkMouse(clickX, clickY)) {
					//clear(0,0,this.width, this.height-this.height/3);
					if(!blocked){
						this.page_hint++;
						if(this.page_hint==1)
						{
							hint.shiftRect(0,1);
						}
						if(this.page_hint==2){
							hint.shiftRect(2,2);
						}
						this.draw();
					}
				}
			}	
			if(this.page_hint>0){
				if (btnPrevPage.checkMouse(clickX, clickY)) {
					//clear(0,0,this.width, this.height-this.height/3);
					if(!blocked){
						this.page_hint--;
						if(this.page_hint==1)
						{
							hint.shiftRect(5,2);
						}
						if(this.page_hint==0){
							hint.shiftRect(8,1);
						}
						this.draw();
					}
				}
			}			
		break;
		
		case 'levels' :
			if (btnBackMenu.checkMouse(clickX, clickY)) {
				this.page = 'main';
				clear();
				this.draw();
			}
			else if (btnNextPage.checkMouse(clickX, clickY)) {
				//“упо пересоздать страницу с левелами. Ќа этот раз начинать с 15 30 и т.д..
				
				if(startNum + 1 < (this.GlobalCount/this.CountLevel) >> 0)
				{
					startNum++;
					this.createLevelsPage(this.CountLevel * startNum);
					clear();
					this.draw();
				}				
			}
			else if (btnPrevPage.checkMouse(clickX, clickY)) {
				if(startNum)
				{
					startNum--;
					this.createLevelsPage(this.CountLevel * startNum);
					clear();
					this.draw();
				}
			}
			else {
				for (var i = 0; i < this.CountLevel; i++) {
				
					if (btnsLevel[i].checkMouse(clickX, clickY) && btnsLevel[i].state != "locked") {				
						this.page = 'view_level';
						N_level = i + this.CountLevel * startNum;
						this.draw();
					}
				}
				
			}
	
		break;
		
		case 'view_level' :
			if (btnBackMenu.checkMouse(clickX, clickY)) {
				this.page = 'levels';
				clear();
				this.draw();
			}
			if (btnRestart.checkMouse(clickX, clickY) && localStorage.getItem("levelPlayed") == N_level) {
				clear();
				this.newGame(N_level);
			}
			if (btnResume.checkMouse(clickX, clickY)) {
				clear();
				if(localStorage.getItem("levelPlayed") == N_level)
					this.newGame(N_level,true);
				else
					this.newGame(N_level,false);
				btnRestart.SetPos(this.width/2-this.width/14, this.height - this.height/2);
			}
			
		break;
		case 'pause' :
			if (btnToLevels.checkMouse(clickX, clickY)) {
				this.page = 'levels';
				localStorage.setItem("levelPlayed", currentLevel);
				localStorage.setItem("level", JSON.stringify(circles));
				clear();
				this.draw();
			}
			if (btnMusic.checkMouse(clickX, clickY)) {
				if(this.enableMusic){
					this.enableMusic=false;
					backgroundSound.pause();
					btnMusic.setState('light');	
				}else{
					this.enableMusic=true;
					backgroundSound.play();
					btnMusic.setState('normal');
				}
			}
			if (btnSFX.checkMouse(clickX, clickY)) {
				if(this.enableSFX){
					this.enableSFX=false;
					btnSFX.setState('light');
				}else{
					this.enableSFX=true;
					btnSFX.setState('normal');
				}
			}
			if (btnResume.checkMouse(clickX, clickY)) {
				clear();
				this.enabled=false;
				drawLevel(ctx, -circlesCount*blockSize*0.3-50, 0, blockSize*0.301);
				drawBorder(ctx);
				btnPause_Menu.draw();
			}
			if (btnRestart.checkMouse(clickX, clickY)) {
				clear();
				this.newGame(currentLevel);
				this.enabled=false;
			}
			
		break;
		case 'win' :
			if (btnToLevels.checkMouse(clickX, clickY)) {
				this.page = 'levels';
				this.redraw = false;
				clear();
				clearBackground();
				this.draw();
			}
			if (btnRestart.checkMouse(clickX, clickY)) {
				this.redraw = false;
				clear();
				clearBackground();
				this.newGame(currentLevel-1);
				this.enabled=false;
			}
			if (btnNextLevel.checkMouse(clickX, clickY)) {
				this.redraw = false;
				clear();
				clearBackground();
				this.newGame(currentLevel);
				this.enabled=false;
			}
		break;
		}
	}
	
	this.move = function(mouseX, mouseY) {
	}
	
	this.unlockLevel = function(i) {
		if(i >= this.CountLevel * startNum && i <= this.CountLevel * (startNum + 1))
			btnsLevel[i].state = "normal";
	}
	
	this.resetBrightness = function() {
		Bright1 = 0;
		Bright2 = 0;
	}
	
	this.GetButton = function(n) {
		switch(n) {
			case 0 :
				return btnToLevels;
			break;
			case 1 :
				return btnRestart;
			break;
			case 2 :
				return btnNextLevel;
			break;
		}
	}
	
}