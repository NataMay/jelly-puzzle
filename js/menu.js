function Menu(ctx,width, height,CountLevel, images) {
	
	this.height = height;
	this.width = width;
	this.enabled = true;
	//this.resume = true;
	this.CountLevel = CountLevel;
	var ctx = ctx;
	this.page = 'main';
	this.enableSFX=true;
	this.enableMusic=true;
	
	this.newGame = function(levelNum) {};
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
	var widthText = this.width-this.height/2;
	var heightText = this.height/4;
	var k = widthText/heightText;
	
	
	var btnNewGame = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnNewGame,
				light	: images.btnNewGameLight },
	x		: (this.width - this.height * 0.3) / 2,
	y		: (this.height - this.height * 0.3) / 2,
	width	: this.height * 0.3,
	height	: this.height * 0.3
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
	
	var btnMusic = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnMusic,
				light	: images.btnMusic_Off },
	x		: this.width/2 - this.height/4,
	y		: this.height/2 - this.height/3.5,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var btnSFX = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnSFX,
				light	: images.btnSFX_Off },
	x		: this.width/2,
	y		: this.height/2 - this.height/3.5,
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
	
	var btnNext = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnNext,
				light	: images.btnNext },
	x		: this.width - this.height/4,
	y		: this.height - this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});
	
	var btnPrevious = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnPrevious,
				light	: images.btnPrevious },
	x		: 0.1,
	y		: this.height - this.height/4,
	width	: this.height/4,
	height	: this.height/4
	});	
	
	var isNewGameSelect = false;
	var isExitGameSelect = false;
	var isSettingsSelect = false;
	var isBackMenuSelect = false;
	
	var btnsLevel = [];
	var isLevelSelect = [];
	var isLevelBlocked = [];
	for (var i = 0; i < this.CountLevel; i++) {
		var x = i % 5;
		var y = Math.floor(i / 5);	
		btnsLevel[i] = new Button({
		index	: i+1,
		ctx		: ctx,
		images	: { normal	: images.btnsLevel,
					light	: images.btnsLevel },
		x		: this.width/5*x + (this.width/5 - (this.height/4 - 10))/2,
		y		: this.height/4*y + 5,
		width	: this.height/4 - 10,
		height	: this.height/4 - 10,
		onDraw	: function() {
			if(this.index < 10) {
				ctx.drawImage(numbers, this.index*256, 0, 256, numbers.height,this.width*0.25,this.height*0.25,this.width/2,this.height/2);
			} else {
				var n = this.index%10;
				ctx.drawImage(numbers, n*256, 0, 256, numbers.height,this.width*0.41,this.height*0.25,this.width/2,this.height/2);
				n = (this.index/10) >> 0;
				ctx.drawImage(numbers, n*256, 0, 256, numbers.height,this.width*0.1,this.height*0.25,this.width/2,this.height/2);
			}
		}
		});	
	}

	for (var i = 0; i < this.CountLevel; i++) {
		isLevelBlocked[i] = false;
	}
	
	this.draw = function() {
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		switch(this.page) {
		case 'main':
			ctx.drawImage(logo, (this.width - logo.width) / 2, 30);
			ctx.drawImage(shadow, (this.width - shadow.width) / 2, 290);
			/*var tween = new Kinetic.Tween({
				node: 0,
				x: btnNewGame.y,
				duration: 0.5,
				onStep: function(i) {
					clear(btnNewGame.x-2,btnNewGame.y-2,btnNewGame.width+4,btnNewGame.height+4);
					btnNewGame.y = i;
					btnNewGame.draw();
					//console.log(i);
				}
			});
			tween.play();*/
			btnNewGame.draw(function() {ctx.drawImage(eyes, (btnNewGame.width - eyes.width) / 2, (btnNewGame.height - eyes.height) / 2)});
			
			btnSettings.draw();
			btnExitGame.draw();

		break;
		case 'settings':
			//ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 290);
			btnMusic.draw();
			btnSFX.draw();
			btnBackMenu.draw();
			btnHint.draw();
		break;
		
		case 'hints':
			//clear();
			clear(btnExitGame.x,btnExitGame.y,btnExitGame.width,btnExitGame.height);
			clear(btnNext.x,btnNext.y,btnNext.width,btnNext.height);
			
			btnExitGame.SetPos(width - height/4, 0, height/4, height/4);
			btnExitGame.draw();
			if(this.page_hint<2){
				btnNext.draw();
			}
			clear(btnPrevious.x,btnPrevious.y,btnPrevious.width,btnPrevious.height);
			if(this.page_hint>0){
				
				btnPrevious.draw();
			}
			var kImg=hint1.width/hint1.height;
			var widthImg;
			var heightImg;
			if(k > kImg){
				widthImg = heightText*kImg;
				heightImg = heightText;
				console.log(k, kImg, widthImg, heightImg, widthText, heightText);
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
				//ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 400);
			btnBackMenu.SetPos(this.width/2 - this.height/8, this.height - this.height/4);
			btnBackMenu.draw();
		break;
		
		case 'view_level':	
			//enabled=true;
			currentLevel=N_level;
			circlesCount=levels[currentLevel][1].length;
			var scaleRect=this.height/3/circlesCount;
			clear(btnBackMenu.x,btnBackMenu.y,btnBackMenu.width,btnBackMenu.height);
			ctx.fillStyle='rgba(10,10,10,0.5)';
			ctx.fillRect(0, 0, this.width, this.height/6);
			//ctx.fillRect(this.width/2-scaleRect*circlesCount/2, this.height/5.5, scaleRect*circlesCount, scaleRect*circlesCount);
			ctx.fillRect(0, this.height - this.height/6, this.width, this.height/6);
			ctx.fillStyle='rgba(10,10,10,0.85)';
			ctx.fillRect(0, this.height/6, this.width, this.height-this.height/3);
			btnBackMenu.SetPos(this.width/2-this.height/4, this.height - this.height/2.2);
			btnBackMenu.draw();
			btnResume.SetPos(this.width/2, this.height - this.height/2.2);
			btnResume.draw();
			
			//console.log(circlesCount, currentLevel,(blockSize*0.04)/2, -circlesCount*blockSize*0.3-50, 1*blockSize*0.301, 1*blockSize*0.301);
			drawLevel(ctx, this.width/2-scaleRect*circlesCount/2, this.height/5.5, scaleRect);
		break;
		
		case 'pause':
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
			ctx.fillStyle='rgba(10,10,10,0.5)';
			ctx.fillRect(0, 0, this.width, this.height/6);
			ctx.fillRect(0, this.height - this.height/6, this.width, this.height/6);

			ctx.fillStyle='rgba(10,10,10,0.8)';
			ctx.fillRect(0, this.height/6, this.width, this.height-this.height/3);
			/*if(enableSFX){
				soundCelebrate.play();
			}*/
			if(bang.isPlaying())
				bang.draw();
			ctx.drawImage(winner, (this.width - winner.width) / 2, this.height/4);
			btnToLevels.draw();	
			btnRestart.draw();
			btnNextLevel.draw();
		
		break;
		}
		ctx.restore();
	}
	
	this.click = function(clickX, clickY) {
		switch(this.page) {
		case 'main':
			if (btnNewGame.checkMouse(clickX, clickY)) {
				this.page = 'levels';
				clear();
				this.draw();
			}

			if (btnSettings.checkMouse(clickX, clickY)) {
				this.page = 'settings';
				clear();
				this.draw();
			}			
		break;
		
		case 'settings' :
			/*var btnBackMenuX = (this.width - btnBackMenu.width) / 2;
			var btnBackMenuY = 290;
			if (clickX > btnBackMenuX && clickY > btnBackMenuY 
					&& clickX < btnBackMenuX + btnBackMenu.width
					&& clickY < btnBackMenuY + btnBackMenu.height) {
				this.page = 'main';
			}*/
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
				this.page = 'main';
				btnExitGame.SetPos(this.width - this.height/4, this.height-this.height/4, this.height/4, this.height/4);
				id = setInterval(drawScene, 30);
				this.page_hint = 0;
			}	
			if(this.page_hint<2){
			if (btnNext.checkMouse(clickX, clickY)) {
				//clear(0,0,this.width, this.height-this.height/3);
				if(!blocked){
					this.page_hint = this.page_hint + 1;
					if(this.page_hint==1)
					{
						hint.shiftRect(0,1);
					}
					if(this.page_hint==2){
						hint.shiftRect(2,2);
					}
					this.page = 'hints';
					this.draw();
				}
			}}	
			if(this.page_hint>0){
			if (btnPrevious.checkMouse(clickX, clickY)) {
				//clear(0,0,this.width, this.height-this.height/3);
				if(!blocked){
					this.page_hint = this.page_hint - 1;
					this.page = 'hints';
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
			else {
				for (var i = 0; i < this.CountLevel; i++) {
				
					if (btnsLevel[i].checkMouse(clickX, clickY)) {				
						this.page = 'view_level';
						//clear();
						N_level = i;
						this.draw();
					//this.enabled = !this.enabled;
						//this.newGame(i);
					//	break;
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
			if (btnResume.checkMouse(clickX, clickY)) {
				clear();
				this.enabled = !this.enabled;
				this.newGame(N_level);
				btnResume.SetPos(this.width/2 + this.height/8, this.height - this.height/2);
				break;
			}
			//btnBackMenu.SetPos(this.width/2 - this.width/14, this.height - this.width/7);
			//btnResume.SetPos(this.width/2 + this.width/14, this.height - this.height/2);	
		break;
		case 'pause' :
		//clear(btnPause_Menu.x,btnPause_Menu.y,btnPause_Menu.width,btnPause_Menu.height);
			if (btnToLevels.checkMouse(clickX, clickY)) {
				this.page = 'levels';
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
				clear();
				clearBackground();
				this.draw();
			}
			if (btnRestart.checkMouse(clickX, clickY)) {
				clear();
				clearBackground();
				this.newGame(currentLevel);
				this.enabled=false;
			}
			if (btnNextLevel.checkMouse(clickX, clickY)) {
				clear();
				clearBackground();
				this.newGame(currentLevel+1);
				this.enabled=false;
			}
		break;
		}
	}
	
	this.move = function(mouseX, mouseY) {
		switch(this.page) {
		case 'main':
			if (btnNewGame.checkMouse(mouseX, mouseY)) {
				if(btnNewGame.getState() == 'normal')
				{
					//console.log();
					btnNewGame.setState('light',function() {ctx.drawImage(eyes, (btnNewGame.width - eyes.width) / 2, (btnNewGame.height - eyes.height) / 2);});
				}
			} else {
				if(btnNewGame.getState() == 'light')
				{
					btnNewGame.setState('normal',function() {ctx.drawImage(eyes, (btnNewGame.width - eyes.width) / 2, (btnNewGame.height - eyes.height) / 2);});
				}
			}
			
			if (btnSettings.checkMouse(mouseX, mouseY)) {
				if(btnSettings.getState() == 'normal')
				{
					//console.log();
					clear(btnSettings.x,btnSettings.y,btnSettings.width,btnSettings.height);
					btnSettings.setState('light');
				}
			} else {
				if(btnSettings.getState() == 'light')
				{
					clear(btnSettings.x,btnSettings.y,btnSettings.width,btnSettings.height);
					btnSettings.setState('normal');
				}
			}			
			
		break;
		
		}
	}
	
	
	this.show = function() {
	}
	
}