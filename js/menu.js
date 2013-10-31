function Menu(width, height) {

	this.height = height;
	this.width = width;
	this.enabled = true;
	//this.resume = true;
	
	var page = 'main';
	
	this.newGame = function() {};
	this.exitGame = function() {};
	
	var logo = new Image();
	logo.src = 'img/Jelly.png';
	logo.onload = function() {}
	
	var btnNewGame = new Image();
	btnNewGame.src = 'img/start.png';
	btnNewGame.onload = function() {}
	var btnNewGameLight = new Image();
	btnNewGameLight.src = 'img/start_light.png';
	btnNewGameLight.onload = function() {}
	var isNewGameSelect = false;
	
	//var btnResumeGame = new Image();
	//btnResumeGame.src = 'img/resume_game.png';
	//btnResumeGame.onload = function() {}
	
	var btnExitGame = new Image();
	btnExitGame.src = 'img/exit.png';
	btnExitGame.onload = function() {}
	var isExitGameSelect = false;
	
	var btnSettings = new Image();
	btnSettings.src = 'img/settings.png';
	btnSettings.onload = function() {}
	var isSettingsSelect = false;
	
	var btnBackMenu = new Image();
	btnBackMenu.src = 'img/back.png';
	btnBackMenu.onload = function() {}
	var isBackMenuSelect = false;
	
	this.draw = function(ctx) {
		if (page == 'main') {
			ctx.drawImage(logo, (this.width - logo.width) / 2, -30);
			if (isNewGameSelect) {
				ctx.drawImage(btnNewGameLight, (this.width - btnNewGame.width) / 2, 210);
			} else {
				ctx.drawImage(btnNewGame, (this.width - btnNewGame.width) / 2, 210);
			}
			//if (this.resume) {
			//	ctx.drawImage(btnResumeGame, (this.width - btnResumeGame.width) / 2, 240);
			//}
			if (isSettingsSelect) {
				ctx.drawImage(btnSettings, (this.width - btnExitGame.width) / 2 - 100, 375);
			} else {
				ctx.drawImage(btnSettings, (this.width - btnExitGame.width) / 2 - 100, 375);
			}
			if (isExitGameSelect) {
				ctx.drawImage(btnExitGame, (this.width - btnExitGame.width) / 2 + 100, 375);
			} else {
				ctx.drawImage(btnExitGame, (this.width - btnExitGame.width) / 2 + 100, 375);
			}
		} else if (page == 'settings') {
			if (isBackMenuSelect) {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 210);
			} else {
				ctx.drawImage(btnBackMenu, (this.width - btnBackMenu.width) / 2, 210);
			}
		} else if (page == 'levels') {
		}
	}
	
	this.click = function(clickX, clickY) {
		if (page == 'main') {
			var btnNewGameX = (this.width - btnNewGame.width) / 2;
			var btnNewGameY = 210;
			if (clickX > btnNewGameX && clickY > btnNewGameY 
					&& clickX < btnNewGameX + btnNewGame.width
					&& clickY < btnNewGameY + btnNewGame.height) {
				this.enabled = !this.enabled;
				this.newGame();
			}
			
			var btnSettingsX = (this.width - btnSettings.width) / 2 - 100;
			var btnSettingsY = 375;
			if (clickX > btnSettingsX && clickY > btnSettingsY 
					&& clickX < btnSettingsX + btnSettings.width
					&& clickY < btnSettingsY + btnSettings.height) {
				page = 'settings';
			}
			
			//var btnResumeGameX = (this.width - btnResumeGame.width) / 2;
			//var btnResumeGameY = 240;
			//if (clickX > btnResumeGameX && clickY > btnResumeGameY 
			//		&& clickX < btnResumeGameX + btnResumeGame.width
			//		&& clickY < btnResumeGameY + btnResumeGame.height) {
			//	this.enabled = !this.enabled;
			//}
		} else if (page == 'settings') {
			var btnBackMenuX = (this.width - btnBackMenu.width) / 2;
			var btnBackMenuY = 210;
			if (clickX > btnBackMenuX && clickY > btnBackMenuY 
					&& clickX < btnBackMenuX + btnBackMenu.width
					&& clickY < btnBackMenuY + btnBackMenu.height) {
				page = 'main';
			}
		} else if (page == 'levels') {
			this.enabled = !this.enabled;
			this.startGame(level);
		}
	}
	
	this.move = function(mouseX, mouseY) {
		var btnNewGameX = (this.width - btnNewGame.width) / 2;
		var btnNewGameY = 210;
		if (mouseX > btnNewGameX && mouseY > btnNewGameY 
				&& mouseX < btnNewGameX + btnNewGame.width
				&& mouseY < btnNewGameY + btnNewGame.height) {
			isNewGameSelect = true;
		} else {
			isNewGameSelect = false;
		}
		
		var btnExitGameX = (this.width - btnExitGame.width) / 2;
		var btnExitGameY = 375;
		if (mouseX > btnExitGameX && mouseY > btnExitGameY 
				&& mouseX < btnExitGameX + btnExitGame.width
				&& mouseY < btnExitGameY + btnExitGame.height) {
			isExitGameSelect = true;
		} else {
			isExitGameSelect = false;
		}
		
		var btnSettingsX = (this.width - btnSettings.width) / 2;
		var btnSettingsY = 375;
		if (mouseX > btnSettingsX && mouseY > btnSettingsY 
				&& mouseX < btnSettingsX + btnSettings.width
				&& mouseY < btnSettingsY + btnSettins.height) {
			isSettinsSelect = true;
		} else {
			isSettingsSelect = false;
		}
	}
	
	this.show = function() {
		
	}
	
}