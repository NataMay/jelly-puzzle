function Menu(width, height, realWidth, realHeight, CountLevel) {
	
	this.height = height;
	this.width = width;
	this.enabled = true;
	//this.resume = true;
	this.CountLevel = CountLevel;
	
	var page = 'main';
	
	this.newGame = function(levelNum) {};
	this.exitGame = function() {};
	
	var scale = 1;
	if (realWidth < 500 || realHeight < 550) {
		var scaleX = realWidth / 500;
		var scaleY = realHeight / 550;
		if (scaleX < scaleY) {
			scale = scaleX;
		} else {
			scale = scaleY;
		}
	}
	
	var logoWidth, logoHeight, logoX, logoY = 30 * scale;
	var logo = new Image();
	logo.src = 'menu/Jelly.png';
	logo.onload = function() {
		logoWidth = logo.width * scale;
		logoHeight = logo.height * scale;
		logoX = (width - logoWidth) / 2;
	}
	
	var eyesWidth, eyesHeight, eyesX, eyesY = 322 * scale;
	var eyes = new Image();
	eyes.src = 'menu/eyes2.png';
	eyes.onload = function() {
		eyesWidth = eyes.width / 5 * scale;
		eyesHeight = eyes.height * scale;
		eyesX = (width - eyesWidth) / 2;
	}
	
	var currentEye = 0;
	var targetEye = 0;
	
	var textWidth, textHeight, textX, textY = 284 * scale;
	var text = new Image();
	text.src = 'menu/help.png';
	text.onload = function() {
		textWidth = text.width / 5.2 * scale;
		textHeight = text.height / 5.2 * scale;
		textX = (width - textWidth) / 2 - 170 * scale;
	}
	
	var shadowWidth, shadowHeight, shadowX, shadowY = 290 * scale;
	var shadow = new Image();
	shadow.src = 'menu/shadow.png';
	shadow.onload = function() {
		shadowWidth = shadow.width * scale;
		shadowHeight = shadow.height * scale;
		shadowX = (width - shadowWidth) / 2;
	}
	
	var btnNewGameWidth, btnNewGameHeight, btnNewGameX, btnNewGameY = 290 * scale;
	var btnNewGame = new Image();
	btnNewGame.src = 'menu/start.png';
	btnNewGame.onload = function() {
		btnNewGameWidth = btnNewGame.width * scale;
		btnNewGameHeight = btnNewGame.height * scale;
		btnNewGameX = (width - btnNewGameWidth) / 2;
	}
	var btnNewGameLight = new Image();
	btnNewGameLight.src = 'menu/start_light.png';
	btnNewGameLight.onload = function() {}
	var isNewGameSelect = false;
	
	var jumpY = 0;
	var jumpSpeed = 0;
	var jumpAcc = 1 * scale;
	var isJump = true;
	
	//var btnResumeGame = new Image();
	//btnResumeGame.src = 'img/resume_game.png';
	//btnResumeGame.onload = function() {}
	
	var btnExitGameWidth, btnExitGameHeight, btnExitGameX, btnExitGameY = 455 * scale;
	var btnExitGame = new Image();
	btnExitGame.src = 'menu/exit.png';
	btnExitGame.onload = function() {
		btnExitGameWidth = btnExitGame.width * scale;
		btnExitGameHeight = btnExitGame.height * scale;
		btnExitGameX = (width - btnExitGameWidth) / 2 + 100 * scale;
	}
	var btnExitGameLight = new Image();
	btnExitGameLight.src = 'menu/exit.png';
	btnExitGameLight.onload = function() {}
	var isExitGameSelect = false;
	
	var btnSettingsWidth, btnSettingsHeight, btnSettingsX, btnSettingsY = 455 * scale;
	var btnSettings = new Image();
	btnSettings.src = 'menu/settings.png';
	btnSettings.onload = function() {
		btnSettingsWidth = btnSettings.width * scale;
		btnSettingsHeight = btnSettings.height * scale;
		btnSettingsX = (width - btnSettingsWidth) / 2 - 100 * scale;
	}
	var btnSettingsLight = new Image();
	btnSettingsLight.src = 'menu/settings.png';
	btnSettingsLight.onload = function() {}
	var isSettingsSelect = false;
	
	var btnBackMenu = new Image();
	btnBackMenu.src = 'menu/back.png';
	btnBackMenu.onload = function() {}
	var isBackMenuSelect = false;
	
	var btnLevelBlocked = new Image();
	btnLevelBlocked.src = 'menu/level_block.png';
	btnLevelBlocked.onload = function() {}
	
	var btnsLevel = [];
	var isLevelSelect = [];
	var isLevelBlocked = [];
	for (var i = 0; i < this.CountLevel; i++) {
		btnsLevel[i] = new Image();
		btnsLevel[i].src = 'menu/level1.png';
		btnsLevel[i].onload = function() {}
		isLevelSelect[i] = false;
		isLevelBlocked[i] = false;
	}
	
	this.draw = function(ctx) {
		if (page == 'main') {
			ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
			
			ctx.drawImage(text, textX, textY, textWidth, textHeight);
			
			ctx.drawImage(shadow, shadowX, shadowY, shadowWidth, shadowHeight);
			if (isNewGameSelect) {
				ctx.drawImage(btnNewGameLight, btnNewGameX, btnNewGameY-jumpY, btnNewGameWidth, btnNewGameHeight);
			} else {
				ctx.drawImage(btnNewGame, btnNewGameX, btnNewGameY-jumpY, btnNewGameWidth, btnNewGameHeight);
			}
			ctx.drawImage(eyes, currentEye*eyes.width/5, 0, eyes.width/5, eyes.height, eyesX, eyesY-jumpY, eyesWidth, eyesHeight);
			
			if (currentEye < targetEye) {
				currentEye++;
			} else if (currentEye > targetEye) {
				currentEye--;
			} else if (currentEye == 4) {
				targetEye = 0;
			} else if (currentEye == 0 && Math.random() < 0.02) {
				targetEye = 4;
			}
			
			if (isJump) {
				jumpY += jumpSpeed;
				jumpSpeed -= jumpAcc;
				if (jumpY < 0) {
					isJump = false;
				}
			} else {
				if (Math.random() < 0.5) {
					isJump = true;
					jumpSpeed = (Math.random() * 5 + 2) * scale;
				}
			}
			
			if (isSettingsSelect) {
				ctx.drawImage(btnSettingsLight, btnSettingsX, btnSettingsY, btnSettingsWidth, btnSettingsHeight);
			} else {
				ctx.drawImage(btnSettings, btnSettingsX, btnSettingsY, btnSettingsWidth, btnSettingsHeight);
			}
			if (isExitGameSelect) {
				ctx.drawImage(btnExitGameLight, btnExitGameX, btnExitGameY, btnExitGameWidth, btnExitGameHeight);
			} else {
				ctx.drawImage(btnExitGame, btnExitGameX, btnExitGameY, btnExitGameWidth, btnExitGameHeight);
			}
		} else if (page == 'settings') {
			if (isBackMenuSelect) {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 290);
			} else {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 290);
			}
		} else if (page == 'levels') {
			for (var i = 0; i < this.CountLevel; i++) {
				var x = i % 3 - 1;
				var y = Math.floor(i / 3) - 1;
				if (isLevelBlocked[i]) {
					ctx.drawImage(btnLevelBlocked, (this.width - btnsLevel[i].width) / 2 + x * 100, 200 + y * 100);
				} else {
					if (isLevelSelect[i]) {
						ctx.drawImage(btnsLevel[i], (this.width - btnsLevel[i].width) / 2 + x * 100, 200 + y * 100);
					} else {
						ctx.drawImage(btnsLevel[i], (this.width - btnsLevel[i].width) / 2 + x * 100, 200 + y * 100);
					}
				}
			}
			if (isBackMenuSelect) {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2 - 200, 500);
			} else {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2 - 200, 500);
			}
		}
	}
	
	this.click = function(clickX, clickY) {
		if (page == 'main') {
			if (clickX > btnNewGameX && clickY > btnNewGameY 
					&& clickX < btnNewGameX + btnNewGameWidth
					&& clickY < btnNewGameY + btnNewGameHeight) {
				page = 'levels';
			}
			
			if (clickX > btnSettingsX && clickY > btnSettingsY 
					&& clickX < btnSettingsX + btnSettingsWidth
					&& clickY < btnSettingsY + btnSettingsHeight) {
				page = 'settings';
			}
		} else if (page == 'settings') {
			var btnBackMenuX = (this.width - btnBackMenu.width) / 2;
			var btnBackMenuY = 290;
			if (clickX > btnBackMenuX && clickY > btnBackMenuY 
					&& clickX < btnBackMenuX + btnBackMenu.width
					&& clickY < btnBackMenuY + btnBackMenu.height) {
				page = 'main';
			}
		} else if (page == 'levels') {
			var btnBackMenuX = (this.width - btnBackMenu.width) / 2 - 200;
			var btnBackMenuY = 500;
			if (clickX > btnBackMenuX && clickY > btnBackMenuY 
					&& clickX < btnBackMenuX + btnBackMenu.width
					&& clickY < btnBackMenuY + btnBackMenu.height) {
				page = 'main';
			}
			for (var i = 0; i < this.CountLevel; i++) {
				if (isLevelBlocked[i]) {
					break;
				}
				var x = i % 3 - 1;
				var y = Math.floor(i / 3) - 1;
				var btnsLevelX = (this.width - btnsLevel[i].width) / 2 + x * 100;
				var btnsLevelY = 200 + y * 100;
				if (clickX > btnsLevelX && clickY > btnsLevelY 
						&& clickX < btnsLevelX + btnsLevel[i].width
						&& clickY < btnsLevelY + btnsLevel[i].height) {
					this.enabled = !this.enabled;
					this.newGame(i);
					break;
				}
			}
		}
	}
	
	this.move = function(mouseX, mouseY) {
		if (mouseX > btnNewGameX && mouseY > btnNewGameY 
				&& mouseX < btnNewGameX + btnNewGameWidth
				&& mouseY < btnNewGameY + btnNewGameHeight) {
			isNewGameSelect = true;
		} else {
			isNewGameSelect = false;
		}
		
		if (mouseX > btnExitGameX && mouseY > btnExitGameY 
				&& mouseX < btnExitGameX + btnExitGameWidth
				&& mouseY < btnExitGameY + btnExitGameHeight) {
			isExitGameSelect = true;
		} else {
			isExitGameSelect = false;
		}
		
		if (mouseX > btnSettingsX && mouseY > btnSettingsY 
				&& mouseX < btnSettingsX + btnSettingsWidth
				&& mouseY < btnSettingsY + btnSettingsHeight) {
			isSettingsSelect = true;
		} else {
			isSettingsSelect = false;
		}
	}
	
	this.show = function() {
		
	}
	
}