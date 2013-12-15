var canvas, ctx, ctxBcg, canvasBcg;
var circles = [];
var selectedCircleX;
var selectedCircleY;
var offsetX = [];
var offsetY = [];
var Dmove = 10.0;
var clickX;
var clickY;
var width;
var height;
var blockSize = 66;
var sprite_size = 48;
var fieldSize = blockSize * circlesCount;
var moving = 0; // 0-никуда 1-перемещение строки 2-перемещение столбца
var TranslateX = 0;
var TranslateY = 0;
var dMove = 5;
var Candies = [];
var Candies_light = [];
var eyes = [];
var eyes_sprite;
var candies_sprite;
var border = [];
var jump_stepX = 0.07;
var jump_stepY = -1;
var cur_blockSizeX = 0.2;
var cur_blockSizeY = blockSize;
var currentLevel = 0;
var levelHint = [[1,1,1,0],[1,0,1,0],[0,1,1,0],[1,0,0,0]];
var levels = [
   	//[0,[[1,1,1,0],[1,0,1,1],[1,0,0,0],[0,1,0,0]]],
	[0,[[1,1,1,1],[1,1,1,1],[0,0,0,0],[0,0,0,0]]],
    [1,[[2,2,2,2],[2,0,0,0],[2,0,0,0],[2,0,0,0]]],
    [2,[[1,1,1,1],[2,2,2,2],[1,1,1,1],[2,2,2,2]]],
    [3,[[0,0,0,0],[0,3,3,0],[0,3,3,0],[0,0,0,0]]],
    [4,[[3,2,2,3],[2,3,3,2],[2,3,3,2],[3,2,2,3]]],
    [5,[[1,1,1,1],[0,0,0,0],[2,2,2,2],[1,1,1,1]]],
    [6,[[3,2,2,3],[4,3,3,4],[4,3,3,4],[3,2,2,3]]],
    [7,[[5,5,1,6],[5,1,6,5],[1,6,5,5],[6,5,5,5]]],
    [8,[[0,0,0,0],[4,3,3,4],[0,2,2,0],[4,3,3,4]]],
    [9,[[0,0,0,0],[2,5,5,2],[2,0,0,2],[0,0,0,0]]],
    [10,[[1,1,1,1,1],[1,5,5,5,1],[1,5,3,5,1],[1,5,5,5,1],[1,1,1,1,1]]],
    [11,[[2,0,0,0,0],[5,2,0,0,0],[5,5,2,0,0],[5,5,5,2,0],[5,5,5,5,2]]],
    [12,[[4,4,1,1,1],[4,4,4,6,6],[6,6,4,6,6],[6,6,4,4,4],[1,1,1,4,4]]],
    [13,[[2,2,5,2,2],[2,3,5,3,2],[2,3,3,3,2],[2,3,5,3,2],[2,2,5,2,2]]],
	[14,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,3,3,3,2],[2,3,3,3,3,2],[2,3,5,3,3,2],[2,2,5,3,2,2]]]
   // [14,[[1,0,1,0,1],[1,4,1,4,1],[4,4,4,4,4],[0,1,1,1,0],[1,0,1,0,1]]]
]
var circlesCount=levels[currentLevel][1].length; //= 7; // мы нарисуем n окружностей
var fieldSize = blockSize * circlesCount;
var level_random = [];
var animate = 0;
var animateTo;
var animSpeed = 7;
var blocked = false;
var animationRow;
var AnimateID;
var CountShift=20;
var circlesOpenEyes = [];
var sounds = [];
var backgroundSound;
var soundCelebrate;
var menu;
var sources;
var btnBackMenu_Main;
var btnPause_Menu;
var enableMusic=true;
var enableSFX=true;
var bang;
var win = 0;
var id;


// -------------------------------------------------------------
function draw(func, transform){

	ctx.save();
    ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
    func(ctx);	
	ctx.restore();
}

// -------------------------------------------------------------

// функции отрисовки :

function clear(x,y,w,h) { // функци€ очищает canvas
	ctx.save();
	//ctx.translate(0,0);
	//ctx.clearRect(-10, -10, fieldSize+20, fieldSize+20);
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	// Will always clear the right space
	//console.log(x,y,width,height);
	
	if(x)
		ctx.clearRect(x, y, w, h);
	else
		ctx.clearRect(0, 0, width, height);
	ctx.restore();
}

function clearBackground() {
	ctxBcg.save();
	//ctx.translate(0,0);
	//ctx.clearRect(-10, -10, fieldSize+20, fieldSize+20);
	ctxBcg.setTransform(1, 0, 0, 1, 0, 0);
	// Will always clear the right space
	//console.log(x,y,width,height);
	ctxBcg.fillRect(0, 0, width, height);
	ctxBcg.restore();
}

function WinGame() {
		if (currentLevel+1==levels.length){
			alert('Game completed');
			menu.page='main';
			menu.enabled=true;
		}else{
			ctxBcg.drawImage(canvas,0,0);
			menu.page = 'win';
			CountShift=20;
			clear(); // очистить canvas

			bang = new Bang({
				x: width/2,
				y: height/2,
				count: 30,
				radius: (height/2) >> 0,
				duration: 3
			});
			bang.play();
			menu.enabled=true;	
			if(menu.enableSFX){
				soundCelebrate.play();
			}
		}

}

function drawFantom(ctx,color,eye,light) { // функци€ рисует окружность
		var border = Math.ceil((blockSize*0.04)/2);		
		ctx.drawImage(candies_sprite,
			color*sprite_size,
			light*sprite_size,
			sprite_size,sprite_size,
			border,border,
			blockSize-border,
			blockSize-border);
		if(eye)
		{
			ctx.save();
			ctx.translate(0,blockSize/4);

			ctx.drawImage(eyes_sprite,0,
				color*(sprite_size/2),
				sprite_size,
				sprite_size/2,
				border*2,
				border*2,
				blockSize-border*3,
				blockSize/2-border*2);
			ctx.restore();
		}
}

function UpdateEyes() {
	win=6;
	circlesOpenEyes = [];
	for (var i = 0; i < circlesCount; i++) {
		for (var j = 0; j < circlesCount; j++) {
			if (circles[i][j].color != levels[currentLevel][1][i][j]) {
				circlesOpenEyes.push(circles[i][j]);
				circles[i][j].OpenEyes();
				win=0;
			}
			else
			circles[i][j].CloseEyes();
		}
	}
}

function processEyes() {
	for (var i = 0; i <  circlesOpenEyes.length; i++) {
		if (circlesOpenEyes[i].drawEyes == false) 
			circlesOpenEyes[i].OpenEyes();
	}

	if (circlesOpenEyes.length > 0) {
		// 4 - чем больше параметр, тем меньшее кол-во моргает
		if (Math.random() * 8 < circlesOpenEyes.length / (circlesCount * circlesCount)) {
			circlesOpenEyes[Math.floor(Math.random() * circlesOpenEyes.length)].CloseEyes();
		}
	}
}

function shiftRow(k,n) {   // сдвиг строки
	var b = [];
	
	if(n != 0)
	{
		if(n>0)
		{
			for (var i = circlesCount-1; i >= 0; i--) {
				if(i+n >= circlesCount){
					b[i+n-circlesCount] = circles[k][i];
				}
				else{
					b[i+n] = circles[k][i];
				}
				
			}
		}
		if(n<0)
		{
			n = Math.abs(n);
			for (var i = circlesCount-1; i >= 0; i--) {
				if(i-n < 0){
					b[i-n+circlesCount] = circles[k][i];
				}
				else{
					b[i-n] = circles[k][i];
				}
			}				
		}
		circles[k] = b;
	}
	blocked = false;
}

function shiftColl(k,n) {
	var b = [];
	
	if(n != 0)
	{
		if(n>0)
		{
			for (var i = circlesCount-1; i >= 0; i--) {
				if(i+n >= circlesCount){
					b[i+n-circlesCount] = circles[i][k];
				}
				else{
					b[i+n] = circles[i][k];
				}
			}
		} 
		if(n<0)
		{
			n = Math.abs(n);
			for (var i = circlesCount-1; i >= 0; i--) {
				if(i-n < 0){
					b[i-n+circlesCount] = circles[i][k];
				}
				else{
					b[i-n] = circles[i][k];
				}
			}					
		}
		for(var i = 0; i < circlesCount; i++)
		{
			circles[i][k] = b[i];
		}
	}
	blocked = false;
}

function drawField(context) {
	context.save();
		context.fillStyle = 'rgba(51,53,52,255)';
		context.fillRect(0, 0, blockSize*circlesCount, blockSize*circlesCount);
	context.restore();
}

function drawBorder(context) {
	var halfblock = (blockSize/2) >> 0;
	var imageSize = border[0].width;	
	
	
	context.drawImage(border[0],-halfblock,-halfblock,blockSize,blockSize);
	//ctx.drawImage(border[0],-imageSize,-imageSize);
	context.drawImage(border[3],-halfblock,blockSize*(circlesCount-1) + halfblock,blockSize,blockSize);
	context.drawImage(border[1],blockSize*(circlesCount-1) + halfblock,-halfblock,blockSize,blockSize);
	context.drawImage(border[2],blockSize*(circlesCount-1) + halfblock,blockSize*(circlesCount-1) + halfblock,blockSize,blockSize);
	context.drawImage(border[5],0,0,imageSize,imageSize, -halfblock, halfblock, blockSize, (circlesCount-1)*blockSize);
	context.drawImage(border[7],0,0,imageSize,imageSize, blockSize*(circlesCount-1) + halfblock,halfblock,blockSize,(circlesCount-1)*blockSize);
	context.drawImage(border[6],0,0,imageSize,imageSize, halfblock,-halfblock,(circlesCount-1)*blockSize,blockSize);
	context.drawImage(border[4],0,0,imageSize,imageSize, halfblock,blockSize*(circlesCount-1) + halfblock,(circlesCount-1)*blockSize,blockSize);
}

function drawLevel(context, translateX, translateY, scaleRect)//отобразить мини уровень
{
	var border = Math.ceil((blockSize*0.04)/2);		
	context.save();
	
	context.translate(translateX, translateY);//-circlesCount*blockSize*0.3);
    for (var i=0; i<circlesCount; i++) { // отобразить все окружности
		for(var j = 0; j < circlesCount; j++) {
			context.save();
			context.translate(j*scaleRect,i*scaleRect);
			context.drawImage(candies_sprite,
				levels[currentLevel][1][i][j]*sprite_size,
				0,
				sprite_size,sprite_size,
				border,border,
				scaleRect,
				scaleRect);
			context.restore();
		}
	}
	context.restore();
	//console.log(circlesCount, currentLevel,(blockSize*0.04)/2, -circlesCount*blockSize*0.3-50, 1*blockSize*0.301, 1*blockSize*0.301);
}

	
function drawScene() { // главна€ функци€ отрисовки	
	var transformBlock = {m11:1,
	m12:0,
	m21:(animate ? cur_blockSizeX : 0),
	m22:1,
	dx:0,
	dy:0};
	if (menu.enabled) {
		if(menu.page =='win' && bang.isPlaying()) {
			menu.draw(ctx);
		}
		return;
	}
	//console.log(1);

	var loopX = 0;
	var loopY = 0;
	var light = 0;
	
	drawField(ctx);

	if (cur_blockSizeX + jump_stepX > 0.2 || cur_blockSizeX + jump_stepX < -0.2)
		jump_stepX = -jump_stepX;
	cur_blockSizeX += jump_stepX;

	processEyes();

	ctx.save();
	ctx.beginPath();
	ctx.rect(0, 0, blockSize*circlesCount, blockSize*circlesCount);
	ctx.clip();
	
    for (var i=0; i<circlesCount; i++) { // отобразить все окружности
	
		for(var j = 0; j < circlesCount; j++) {
			if((j*blockSize + offsetX[i])%fieldSize < 0)
			{
				loopX = fieldSize;
			}
			else loopX = 0;
			if((i*blockSize + offsetY[j])%fieldSize < 0)
			{
				loopY = fieldSize;
			}
			else loopY = 0;
			if(selectedCircleX != undefined) 
			{
				if((moving == 0 && (selectedCircleX==j || selectedCircleY==i)) || (moving == 1 && selectedCircleY==i) || (moving == 2 && selectedCircleX==j))
					light = 1;

			}
			if(offsetX[i] != 0)
			{
				var fantom_pos;
				var fantom_pos_x;				
				if(offsetX[i] > 0)
				{
					//¬ычислить цвет и координаты блока фантома
					//÷вет = кол-во блоков - округленное до величины целых блоков смещение - это при движении вправо
					//ѕозици€ = смещение mod размер блока - х
					fantom_pos = (circlesCount - Math.floor(offsetX[i] / blockSize)%circlesCount) - 1;
					fantom_pos_x = offsetX[i]%blockSize - blockSize;
				}
				if(offsetX[i] < 0)
				{
					//тут надо вз€ть блок координаты которого наход€тс€ на первом местве в р€ду
					fantom_pos = Math.floor(Math.abs(offsetX[i]) / blockSize)%circlesCount;
					fantom_pos_x = offsetX[i]%blockSize;
				}
				transformBlock.dx = fantom_pos_x + TranslateX;
				transformBlock.dy = (i*blockSize + offsetY[j])%fieldSize + loopY + TranslateY;
				
				draw(function(ctx){
				drawFantom(ctx, circles[i][fantom_pos].color,circles[i][fantom_pos].drawEyes,light);
				},transformBlock);	
			}
			if(offsetY[j] != 0)
			{
				var fantom_pos;
				var fantom_pos_y;
				if(offsetY[j] > 0)
				{
					//¬ычислить цвет и координаты блока фантома
					//÷вет = кол-во блоков - округленное до величины целых блоков смещение - это при движении вправо
					//ѕозици€ = смещение mod размер блока - х
					fantom_pos = (circlesCount - Math.floor(offsetY[j] / blockSize)%circlesCount) - 1;
					fantom_pos_y = offsetY[j]%blockSize - blockSize;
				}
				if(offsetY[j] < 0)
				{
					//тут надо вз€ть блок координаты которого наход€тс€ на первом месте в р€ду
					fantom_pos = Math.floor(Math.abs(offsetY[j]) / blockSize)%circlesCount;
					fantom_pos_y = offsetY[j]%blockSize;
				}
				//console.log(fantom_pos,fantom_pos_y);
				transformBlock.dx = (j*blockSize + offsetX[i])%fieldSize + loopX + TranslateX;
				transformBlock.dy = fantom_pos_y + TranslateY;
				
				draw(function(ctx){
				drawFantom(ctx, circles[fantom_pos][j].color,circles[fantom_pos][j].drawEyes,light);
				},transformBlock);	
			}
			transformBlock.dx = (j*blockSize + offsetX[i])%fieldSize + loopX + TranslateX;
			transformBlock.dy = (i*blockSize + offsetY[j])%fieldSize + loopY + TranslateY;
			
			circles[i][j].draw(ctx,transformBlock,light);

			light = 0;
		}
    }
	ctx.restore();
	if(win > 0) {
		win--;
		if(win == 0)
			WinGame();
	}
}

// -------------------------ѕеремешивание уровн€----------------------
function RandomShift(){
	blocked=true;
	var napravl=Math.floor(Math.random() * 2);
	do var kol=Math.floor(Math.random() * ((circlesCount-1) - (-(circlesCount-1)) + 1)) - (circlesCount-1);
	while(kol==0);
	//console.log(kol);
	var nomer=Math.floor(Math.random() * ((circlesCount-1) - 0 + 1)) + 0;
	var tween = new Kinetic.Tween({
		node: 0,
		x: kol*blockSize,
		duration: 0.1,
		//easing: Kinetic.Easings.ElasticEaseOut,
		onStep: function(i) {
			if(napravl == 0)
				offsetX[nomer] = i;
			else
				offsetY[nomer] = i;
		},
		onFinish: function() {
			var n = kol%circlesCount
			if(napravl == 0)
			{
				shiftRow(nomer,n);
				offsetX[nomer] = 0;
			}
			else
			{
				shiftColl(nomer,n);
				offsetY[nomer] = 0.0;
			}
			if(CountShift == 0)
			{
				for (var i = 0; i < circlesCount; i++) {
					for (var j = 0; j < circlesCount; j++) {
						if (circles[i][j].color != levels[currentLevel][1][i][j]) {
								circles[i][j].OpenEyes();
						}
					}
				}
				circlesOpenEyes = [];
				for (var i = 0; i < circlesCount; i++) {
					for (var j = 0; j < circlesCount; j++) {
						if (circles[i][j].color != levels[currentLevel][1][i][j]) {
								circlesOpenEyes.push(circles[i][j]);
						}
					}
				}
				blocked = false;
			}
			else
			{
				RandomShift();
				CountShift--;
			}
		}
	});
	tween.play();	
}

function startGame(levelNum) {
	currentLevel = levelNum;
	circlesCount=levels[currentLevel][1].length; //= 7; // мы нарисуем n окружностей
	fieldSize = blockSize * circlesCount;
	clear();
	blockSize = Math.floor((height - height*0.1)/circlesCount);
	
	var avaliable_sizes = [48,64,128,256];
	var b;
	for(var i = 0; i < avaliable_sizes.length; i++)
	{
		if(i != avaliable_sizes.length - 1)
		{
			b = (avaliable_sizes[i+1] - avaliable_sizes[i]) * 0.2 + avaliable_sizes[i];
			console.log(b);
			
			if(blockSize > avaliable_sizes[i] && blockSize < b)
			{
				sprite_size = avaliable_sizes[i];
				break;
			}
			if(blockSize > b && blockSize < avaliable_sizes[i+1])
			{
				sprite_size = avaliable_sizes[i+1];
				break;
			}
		}
		else
			sprite_size = avaliable_sizes[avaliable_sizes.length - 1];
	}
	fieldSize = blockSize * circlesCount;
	for (var i = 0; i < circlesCount; i++) {
		circles[i] = [];
		offsetX[i] = 0.0;
		offsetY[i] = 0.0;
		for (var j = 0; j < circlesCount; j++) {
			var color = levels[currentLevel][1][i][j];
			circles[i][j] = new Tile(blockSize, color, color, sprite_size);
		}
	}
	blocked = true;
	drawLevel(ctx, -circlesCount*blockSize*0.3-50, 0, blockSize*0.301);
	drawBorder(ctx);
	RandomShift();

	btnPause_Menu.draw();
	
}

// инициализаци€
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
	canvasBcg = document.getElementById('background');
    ctxBcg = canvasBcg.getContext('2d');
	width = document.body.clientWidth;
	height = document.body.clientHeight;

	canvas.width = width;
	canvasBcg.width = width;
	
	canvas.height = height;
	canvasBcg.height = height;

	var grd = ctxBcg.createRadialGradient(width/2, height/2, 10, width/2, height/2, height);
	grd.addColorStop(0, '#02f1fb');
	grd.addColorStop(1, '#0a53c8');
	ctxBcg.fillStyle = grd;
	ctxBcg.fillRect(0, 0, width, height);	
		
	blockSize = Math.floor((height - height*0.1)/circlesCount);
	
	var avaliable_sizes = [48,64,128,256];
	var b;
	for(var i = 0; i < avaliable_sizes.length; i++)
	{
		if(i != avaliable_sizes.length - 1)
		{
			b = (avaliable_sizes[i+1] - avaliable_sizes[i]) * 0.2 + avaliable_sizes[i];
			console.log(b);
			
			if(blockSize > avaliable_sizes[i] && blockSize < b)
			{
				sprite_size = avaliable_sizes[i];
				break;
			}
			if(blockSize > b && blockSize < avaliable_sizes[i+1])
			{
				sprite_size = avaliable_sizes[i+1];
				break;
			}
		}
		else
			sprite_size = avaliable_sizes[avaliable_sizes.length - 1];
	}
	fieldSize = blockSize * circlesCount;
	
	// «вуки
	for(var i = 0; i < 10; i++)
	{
		sounds[i] = new Audio('media/glee'+i+'.ogg');
		sounds[i].volume = 0.9;	
	}
	
	backgroundSound = new Audio('media/music1.ogg');
    backgroundSound.volume = 0.9;
    backgroundSound.addEventListener('ended', function() { // зациклить воспроизведение фонового звука
        this.currentTime = 0;
        this.play();
    }, false);
    backgroundSound.play();
	
	soundCelebrate = new Audio('media/celebrate.wav');
    soundCelebrate.volume = 0.9;
	
	
	for(var i = 0; i < 8; i++)
	{
		border[i] = new Image();
		border[i].src = 'img/border'+i+'.png';
	}
	
	TranslateX = (width - blockSize*circlesCount)/2;
	TranslateY = (height - blockSize*circlesCount)/2;
	ctx.translate(TranslateX,TranslateY);

    sources = {
        candy_sprite: 'img_'+sprite_size+'/candy_sprite.png',
        eyes_sprite: 'img_'+sprite_size+'/eyes_sprite.png',
		logo: 'menu/Jelly.png',
		eyes: 'menu/eyes.png',
		winner: 'menu/win.png',
		shadow: 'menu/shadow.png',
		btnNewGame: 'menu/start.png',
		btnNewGameLight: 'menu/start_light.png',
		btnExitGame: 'menu/exit.png',
		btnExitGameLight: 'menu/exit.png',
		btnSettings: 'menu/settings.png',
		btnSettingsLight: 'menu/settings.png',
		btnBackMenu: 'menu/back.png',
		btnMusic: 'menu/music.png',
		btnMusic_Off: 'menu/music_off.png',
		btnSFX: 'menu/sfx.png',
		btnSFX_Off: 'menu/sfx_off.png',
		btnToLevels: 'menu/to_levels.png',
		btnNextLevel: 'menu/next_level.png',
		btnPauseMenu: 'menu/pause.png',
		btnLevelBlocked: 'menu/level_block.png',
		btnResume: 'menu/resume.png',
		btnRestart: 'menu/restart.png',
		btnsLevel: 'menu/level1.png',
		btnHint: 'menu/hint.png',
		hint1: 'menu/hint1.png',
		hint2: 'menu/hint2.png',
		hint3: 'menu/hint3.png',
		btnNext: 'menu/next.png',
		btnPrevious: 'menu/previous.png',
		numbers: 'menu/numbers.png'
      };
		
	loadImages(sources, function(images) {
		menu = new Menu(ctx, width, height,levels.length,images);
		menu.newGame = startGame;
		candies_sprite = images.candy_sprite;
		eyes_sprite = images.eyes_sprite;
		menu.draw();
		//setInterval(drawScene, 30);	
	
	btnPause_Menu = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnPauseMenu,
				light	: images.btnPauseMenu },
	x		: width - height/4,
	y		: 0,
	width	: height/4,
	height	: height/4
	});	
	
	
	// прив€зываем событие нажати€ мыши (дл€ перетаскивани€)
	//$('#scene').mousedown(function(e) {
	var mousedownf=function (e){
	//menu.draw(ctx);
		var canvasPosition = $(this).offset();
		if (e.offsetX){
			clickX = e.offsetX || 0;
			clickY = e.offsetY || 0;
		}else{
			clickX = e.touches[0].pageX || 0;
			clickY = e.touches[0].pageY || 0;
		}
		if (menu.enabled) {
			menu.click(clickX, clickY);
			return;
		}
		
		/*if (btnBackMenu_Main.checkMouse(clickX, clickY)) {
			menu.page = 'levels';
			clear();
			menu.enabled=true;
			CountShift=20;
			menu.draw();
			if(enableSound){
				enableSound=false;
				backgroundSound.pause();
			}else{
				enableSound=true;
				backgroundSound.play();
			}
		}*/

		if (btnPause_Menu.checkMouse(clickX, clickY)) {
			menu.page = 'pause';
			menu.enabled=true;
			CountShift=20;
			clear(btnPause_Menu.x,btnPause_Menu.y,btnPause_Menu.width,btnPause_Menu.height);
			menu.draw();
			
			/*if(enableSound){
				enableSound=false;
				backgroundSound.pause();
			}else{
				enableSound=true;
				backgroundSound.play();
			}*/
		}

		if(!blocked)
		{
			var cX = Math.floor((clickX-TranslateX)/blockSize);
			var cY = Math.floor((clickY-TranslateY)/blockSize);
			if((cX >=0 && cX < circlesCount) && (cY >=0 && cY < circlesCount))
			{
				selectedCircleX = cX;
				selectedCircleY = cY;
				//console.log(selectedCircleX,selectedCircleY);
				if(menu.enableSFX){
					sounds[circles[selectedCircleX][selectedCircleY].color].play();
				}
			}
		}
    }//);

	var support=0;
	try {
		document.createEvent('TouchEvent');
		support=1;
	} catch (e) {
		support=0;
	}
	if(support==1) canvas.addEventListener('touchstart',mousedownf);
	else canvas.addEventListener('mousedown',mousedownf);
	support=0;
	
    //$('#scene').mousemove(function(e) { // прив€зываем событие движени€ мыши дл€ перетаскивани€ выбранной окружности
	var mousemovef=function (e){
		var mouseX;
		var mouseY;
		if (e.offsetX){
			mouseX = e.offsetX || 0;
			mouseY = e.offsetY || 0;
		}else{
			mouseX = e.touches[0].pageX || 0;
			mouseY = e.touches[0].pageY || 0;
		}

		if (menu.enabled) {
			menu.move(mouseX, mouseY);
		}
		
        if (selectedCircleX != undefined && selectedCircleY != undefined) {
			
            var canvasPosition = $(this).offset();
			var dX = mouseX - clickX;
			var dY = mouseY - clickY;
			
			if(Math.abs(dX) > dMove && Math.abs(dX) >= Math.abs(dY) && moving == 0) {
				moving = 1;
			}
			if(Math.abs(dY) > dMove && Math.abs(dX) < Math.abs(dY) && moving == 0) {
				moving = 2;
			}			
				
			if(moving == 1) {
				offsetX[selectedCircleY] = dX;
			}
			if(moving == 2) {
				offsetY[selectedCircleX] = dY;
			}
			if(Math.abs(dX) <= dMove && Math.abs(dY) <= dMove)
			{
				moving = 0;
				offsetX[selectedCircleY] = 0;
				offsetY[selectedCircleX] = 0;
			}
        }
	}//);
	
	try {
		document.createEvent('TouchEvent');
		support=1;
	} catch (e) {
		support=0;
	}
	if(support==1) canvas.addEventListener('touchmove',mousemovef);
	else canvas.addEventListener('mousemove',mousemovef);
	support=0;

    //$('#scene').mouseup(function(e) { // событие mouseup - очистка выбранной окружности
	var mouseupf=function (e){
		var loop = 0;

		if(moving == 1)
		{
			if (selectedCircleX != undefined && selectedCircleY != undefined) {
				//ѕересчитать оффсет и пон€ть куда именно его надо подвинуть
				var mX = offsetX[selectedCircleY]%blockSize;
				if(mX != 0)
				{
					if(Math.abs(mX) > blockSize/2)
					{
						animateTo = offsetX[selectedCircleY] - mX + (mX > 0 ? blockSize : 0-blockSize);
					}
					else
					{
						animateTo = offsetX[selectedCircleY] -mX;
					}
					blocked = true;
					var animationRow = selectedCircleY;
					selectedCircleX = undefined;
					selectedCircleY = undefined;
					
					var tween = new Kinetic.Tween({
							node: offsetX[animationRow],
							x: animateTo,
							duration: 0.1,
							onStep: function(i) {
								offsetX[animationRow] = i;
							},
							onFinish: function() {
								var n = Math.floor(animateTo / blockSize)%circlesCount;
								
								shiftRow(animationRow,n);
								UpdateEyes();
								offsetX[animationRow] = 0;
								moving = 0;
								//console.log(offsetX[animationRow]);
							}
						});
					tween.play();
				
				}			
			}
		}
		if(moving == 2)
		{
			if (selectedCircleX != undefined && selectedCircleY != undefined) {
				//сдвинуть кружочки в массиве
				var mY = offsetY[selectedCircleX]%blockSize;
				if(mY != 0)
				{
					if(Math.abs(mY) > blockSize/2)
					{
						animateTo = offsetY[selectedCircleX] - mY + (mY > 0 ? blockSize : 0-blockSize);
					}
					else
					{
						animateTo = offsetY[selectedCircleX] - mY;
					}
					blocked = true;
					var animationRow = selectedCircleX;
					selectedCircleX = undefined;
					selectedCircleY = undefined;
				
					var tween = new Kinetic.Tween({
							node: offsetY[animationRow],
							x: animateTo,
							duration: 0.1,
							onStep: function(i) {
								offsetY[animationRow] = i;
							},
							onFinish: function() {
								var n = Math.floor(animateTo / blockSize)%circlesCount;
								
								shiftColl(animationRow,n);
								UpdateEyes();
								offsetY[animationRow] = 0;
								moving = 0;
								//console.log(offsetY[animationRow]);
							}
						});
					tween.play();
				}	
			}		
		}
		if(moving == 0)
		{
			selectedCircleX = undefined;
			selectedCircleY = undefined;		
		}
		
    }//);
	try {
		document.createEvent('TouchEvent');
		support=1;
	} catch (e) {
		support=0;
	}
	if(support==1) canvas.addEventListener('touchend',mouseupf);
	else canvas.addEventListener('mouseup',mouseupf);

	id=setInterval(drawScene, 30);	// скорость отрисовки
	});
});