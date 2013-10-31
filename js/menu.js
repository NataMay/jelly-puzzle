function Menu(width, height,CountLevel) {
	
	this.height = height;
	this.width = width;
	this.enabled = true;
	//this.resume = true;
	this.CountLevel = CountLevel;
	
	var page = 'main';
	
	this.newGame = function(levelNum) {};
	this.exitGame = function() {};
	
	var logo = new Image();
	logo.src = 'menu/Jelly.png';
	logo.onload = function() {}
	
	var text = new Image();
	text.src = 'menu/help.png';
	text.onload = function() {}
	
	var eyes = new Image();
	eyes.src = 'menu/eyes.png';
	eyes.onload = function() {}
	
	var shadow = new Image();
	shadow.src = 'menu/shadow.png';
	shadow.onload = function() {}
	
	var btnNewGame = new Image();
	btnNewGame.src = 'menu/start.png';
	btnNewGame.onload = function() {}
	var btnNewGameLight = new Image();
	btnNewGameLight.src = 'menu/start_light.png';
	btnNewGameLight.onload = function() {}
	var isNewGameSelect = false;
	
	//var btnResumeGame = new Image();
	//btnResumeGame.src = 'img/resume_game.png';
	//btnResumeGame.onload = function() {}
	
	var btnExitGame = new Image();
	btnExitGame.src = 'menu/exit.png';
	btnExitGame.onload = function() {}
	var btnExitGameLight = new Image();
	btnExitGameLight.src = 'menu/exit.png';
	btnExitGameLight.onload = function() {}
	var isExitGameSelect = false;
	
	var btnSettings = new Image();
	btnSettings.src = 'menu/settings.png';
	btnSettings.onload = function() {}
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
		isLevelBlocked[i] = true;
	}

	for (var i = 0; i < this.CountLevel; i++) {
		isLevelBlocked[i] = false;
	}
	
	this.draw = function(ctx) {
		if (page == 'main') {
			ctx.drawImage(logo, (this.width - logo.width) / 2, 30);
			ctx.drawImage(text, 30, logo.height+30, text.width/5.2, text.height/5.2);
			ctx.drawImage(shadow, (this.width - shadow.width) / 2, 290);
			if (isNewGameSelect) {
				ctx.drawImage(btnNewGameLight, (this.width - btnNewGame.width) / 2, 290);
			} else {
				ctx.drawImage(btnNewGame, (this.width - btnNewGame.width) / 2, 290);
			}
			ctx.drawImage(eyes, (this.width - eyes.width) / 2, 322);
			//if (this.resume) {
			//	ctx.drawImage(btnResumeGame, (this.width - btnResumeGame.width) / 2, 290);
			//}
			if (isSettingsSelect) {
				ctx.drawImage(btnSettingsLight, (this.width - 64) / 2 - 100, 455, 64, 64);
			} else {
				ctx.drawImage(btnSettings, (this.width - 64) / 2 - 100, 455, 64, 64);
			}
			if (isExitGameSelect) {
				ctx.drawImage(btnExitGameLight, (this.width - 64) / 2 + 100, 455, 64, 64);
			} else {
				ctx.drawImage(btnExitGame, (this.width - 64) / 2 + 100, 455, 64, 64);
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
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 400);
			} else {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 400);
			}
		}
	}
	
	this.click = function(clickX, clickY) {
		if (page == 'main') {
			var btnNewGameX = (this.width - btnNewGame.width) / 2;
			var btnNewGameY = 290;
			if (clickX > btnNewGameX && clickY > btnNewGameY 
					&& clickX < btnNewGameX + btnNewGame.width
					&& clickY < btnNewGameY + btnNewGame.height) {
				page = 'levels';
			}
			
			var btnSettingsX = (this.width - 64) / 2 - 100;
			var btnSettingsY = 455;
			if (clickX > btnSettingsX && clickY > btnSettingsY 
					&& clickX < btnSettingsX + 64
					&& clickY < btnSettingsY + 64) {
				page = 'settings';
			}
			
			//var btnResumeGameX = (this.width - btnResumeGame.width) / 2;
			//var btnResumeGameY = 290;
			//if (clickX > btnResumeGameX && clickY > btnResumeGameY 
			//		&& clickX < btnResumeGameX + btnResumeGame.width
			//		&& clickY < btnResumeGameY + btnResumeGame.height) {
			//	this.enabled = !this.enabled;
			//}
		} else if (page == 'settings') {
			var btnBackMenuX = (this.width - btnBackMenu.width) / 2;
			var btnBackMenuY = 290;
			if (clickX > btnBackMenuX && clickY > btnBackMenuY 
					&& clickX < btnBackMenuX + btnBackMenu.width
					&& clickY < btnBackMenuY + btnBackMenu.height) {
				page = 'main';
			}
		} else if (page == 'levels') {
			var btnBackMenuX = (this.width - btnBackMenu.width) / 2;
			var btnBackMenuY = 400;
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
		var btnNewGameX = (this.width - btnNewGame.width) / 2;
		var btnNewGameY = 290;
		if (mouseX > btnNewGameX && mouseY > btnNewGameY 
				&& mouseX < btnNewGameX + btnNewGame.width
				&& mouseY < btnNewGameY + btnNewGame.height) {
			isNewGameSelect = true;
		} else {
			isNewGameSelect = false;
		}
		
		var btnExitGameX = (this.width - 64) / 2 + 100;
		var btnExitGameY = 455;
		if (mouseX > btnExitGameX && mouseY > btnExitGameY 
				&& mouseX < btnExitGameX + 64
				&& mouseY < btnExitGameY + 64) {
			isExitGameSelect = true;
		} else {
			isExitGameSelect = false;
		}
		
		var btnSettingsX = (this.width - 64) / 2 - 100;
		var btnSettingsY = 455;
		if (mouseX > btnSettingsX && mouseY > btnSettingsY 
				&& mouseX < btnSettingsX + 64
				&& mouseY < btnSettingsY + 64) {
			isSettingsSelect = true;
		} else {
			isSettingsSelect = false;
		}
	}
	
	this.show = function() {
		
	}
	
}