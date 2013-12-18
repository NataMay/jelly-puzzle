var canvas, ctx, ctxBcg, canvasBcg;
var circles = [];
var selectedCircleX;
var selectedCircleY;
var offsetX = [];
var offsetY = [];
var Dmove = 10.0;
var clickX;
var clickY;
var maxBigX;
var minBigX;
var maxBigY;
var minBigY;
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
var big_sprite;
var small_sprite;
var locked_img;
var lockX;
var lockY;
var border = [];
var jump_stepX = 0.07;
var jump_stepY = -1;
var cur_blockSizeX = 0.2;
var cur_blockSizeY = blockSize;
var currentLevel = 0;
var levelHint = [[1,1,1,0],[1,0,1,0],[0,1,1,0],[1,0,0,0]];

var levels = [
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
    [10,[[15,16,1,1,1],[17,18,5,5,1],[1,5,3,5,1],[1,5,5,5,1],[1,1,1,1,1]]],
    [11,[[2,0,0,0,0],[5,2,0,0,0],[5,5,2,0,0],[5,5,5,2,0],[5,5,5,5,2]]],
    [12,[[4,4,1,1,1],[4,4,4,6,6],[6,6,4,6,6],[6,6,4,4,4],[1,1,1,4,4]]],
    [13,[[2,2,5,2,2],[2,3,5,3,2],[2,3,3,3,2],[2,3,5,3,2],[2,2,5,2,2]]],
	[14,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[15,[[0,0,0,0,0,0],[0,5,5,5,5,0],[0,5,15,16,5,0],[0,5,17,18,5,0],[0,5,5,5,5,0],[0,0,0,0,0,0]]],
	[16,[[2,2,23,24,2,2],[2,3,25,26,3,2],[3,3,2,2,3,3],[2,3,3,3,3,2],[2,3,3,3,3,2],[5,5,5,5,5,5]]],
	[17,[[1,1,1,1,1,1],[5,5,5,5,5,5],[2,2,2,2,2,2],[6,6,19,20,6,6],[0,0,21,22,0,0],[1,1,1,1,1,1]]],
	[18,[[0,3,6,6,6,0],[3,0,3,6,6,6],[6,3,0,3,6,6],[6,6,3,0,3,6],[6,6,6,3,15,16],[0,6,6,6,17,18]]],
	[19,[[5,2,4,4,2,5],[2,5,4,4,5,2],[2,2,15,16,2,2],[2,2,17,18,2,2],[2,5,4,4,5,2],[5,2,4,4,2,5]]],
	[20,[[100,2,5,3,3,3],[3,3,3,5,2,2],[3,3,5,5,3,3],[5,5,1,1,5,5],[3,3,5,5,3,3],[1,1,1,2,2,2]]],
	[21,[[0,0,0,0,0,0],[1,1,1,1,1,1],[2,2,2,2,2,2],[3,3,3,3,3,3],[4,4,4,4,4,4],[5,5,5,5,5,5]]],
	[22,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[23,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[24,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[25,[[2,2,15,16,2,2],[2,3,17,18,3,2],[3,3,2,2,3,3],[2,3,3,3,3,2],[2,3,3,3,3,2],[5,5,5,5,5,5]]],
	[26,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[27,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[28,[[2,2,5,3,2,2],[2,3,5,3,3,2],[2,3,1,1,3,2],[2,3,1,1,3,2],[2,3,5,3,3,2],[2,102,5,3,2,2]]],
	[29,[[0,0,23,24,0,0],[3,3,25,26,3,3],[5,5,5,5,5,5],[4,4,4,4,4,4],[3,3,3,3,3,3],[2,2,2,2,2,2]]]
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
var bang1;
var win = 0;
var bigBlock = 0; 	// 0 - нет большого блока в выделеннии
					// 1 - большой блок должен двигаться только по оси Х
					// 2 - большой блок должен двигаться только по оси У
					// 3 - было нажатие по большому блоку, двигать его по обои осям
// -------------------------------------------------------------
var user_progress;
var id;

function draw(func, transform){

	ctx.save();
    ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
    func(ctx);	
	ctx.restore();
}


function isLocalStorageAvailable() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

// -------------------------------------------------------------

// функции отрисовки :

function clear(x,y,w,h) { // функция очищает canvas
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	
	if(x)
		ctx.clearRect(x, y, w, h);
	else
		ctx.clearRect(0, 0, width, height);
	ctx.restore();
}

function clearBackground() {
	ctxBcg.save();
	ctxBcg.setTransform(1, 0, 0, 1, 0, 0);
	ctxBcg.fillRect(0, 0, width, height);
	ctxBcg.restore();
}

function drawFantom(ctx,color,eye,light) { // функция рисует окружность
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
	win = 5;
	circlesOpenEyes = [];
	for (var i = 0; i < circlesCount; i++) {
		for (var j = 0; j < circlesCount; j++) {
			if (circles[i][j].color != (levels[currentLevel][1][i][j]%100)) {
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

function WinGame() {
	if (currentLevel+1==levels.length){
		menu.page='main';
		menu.enabled=true;
	}else{
		//alert('Level completed');
		user_progress[currentLevel+1] = "unlocked";
		localStorage.removeItem('user_progress');
		localStorage.setItem('user_progress', JSON.stringify(user_progress));
		menu.unlockLevel(currentLevel+1);
		menu.page = 'win';
		menu.GetButton(0).SetPos(this.width/2 - this.height/8-this.height/4,this.height - this.height/2.2);
		menu.GetButton(1).SetPos(this.width/2-this.height/8, this.height - this.height/2.2);
		menu.GetButton(2).SetPos(this.width/2 + this.height/8, this.height - this.height/2.2);
		CountShift=20;
		ctxBcg.drawImage(canvas,0,0);
		clear(); // очистить canvas
		bang = new Bang({
			x: width/2,
			y: height/2,
			count: 30,
			radius: (height/2) >> 0,
			duration: 3
		});
		bang1 = new Bang({
			x: width/2,
			y: height/2,
			count: 20,
			radius: (height/3) >> 0,
			duration: 2
		});
		menu.redraw = true;
		menu.resetBrightness();
		currentLevel=currentLevel+1;
		menu.step1 = 0.5 / 30;
		menu.step2 = 0.8 / 30;
		menu.enabled=true;	
		if(menu.enableSFX){
			soundCelebrate.play();
		}
		
	}
}

// -------------------------Перемешивание уровня----------------------
function shiftRow(k,n) {
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



var oldnomer = 0;

function RandomShift(){
	blocked=true;
	var napravl=Math.floor(Math.random() * 2);
	
	do var nomer=Math.floor(Math.random() * circlesCount);
	while(nomer == oldnomer);
	oldnomer = nomer;
	bigBlock = 0;
	// Просмотреть строку и столбец клика по массиву. Искать числа больше 14
	if(napravl == 0)
	{
		for(var i = 0; i < circlesCount; i++) {
			if(circles[nomer][i].color > 14)
			{
				//В строке найден большой блок
				bigBlock = 1;
				//Расчитать границы диапазона перемещения этой строки
				maxBigX = circlesCount - i - 1;
				minBigX = i;
				//Определить это верхняя или нижняя часть блока
				if((circles[nomer][i].color - 15) % 4 == 2 || (circles[nomer][i].color - 15) % 4 == 3)
				{
					//Мы в нижней части. Поднять выделенную строку на 1
					nomer--;
				}
				break;
			}
			if(circles[nomer][i].locked)
				nomer = (nomer + 1)%circlesCount;
			
		}
	}
	else
	{
		for(var i = 0; i < circlesCount; i++) {
			if(circles[i][nomer].color > 14)
			{
				//В строке найден большой блок
				bigBlock = 2;
				maxBigX = circlesCount - i - 1;
				minBigX = i;
				//Определить это левая или правая часть блока
				if((circles[i][nomer].color - 15) % 4 == 1 || (circles[i][nomer].color - 15) % 4 == 3)
				{
					//Мы в правой части. Сдвинуть выделенный стобец на 1
					nomer--;
				}
				break;
			}
			if(circles[i][nomer].locked)
				nomer = (nomer + 1)%circlesCount;
		}
	}
	if(bigBlock) {
		do var kol=Math.floor(Math.random() * (maxBigX + minBigX) - minBigX);
		while(kol==0);
	}
	else
	{
		do var kol=Math.floor(Math.random() * ((circlesCount-1)*2) - (circlesCount-1));
		while(kol==0);		
	}
	var tween = new Kinetic.Tween({
		node: 0,
		x: kol*blockSize,
		duration: 0.2,
		//easing: Kinetic.Easings.ElasticEaseOut,
		onStep: function(i) {
			if(napravl == 0)
				offsetX[nomer] = i;
			else
				offsetY[nomer] = i;
			if(bigBlock) {
				if(napravl == 0)
					offsetX[nomer+1] = i;
				else
					offsetY[nomer+1] = i;			
			}
		},
		onFinish: function() {
			var n = kol%circlesCount;
			if(napravl == 0)
			{
				if(bigBlock)
				{
					shiftRow(nomer+1,n);
					offsetX[nomer+1] = 0;					
				}
				shiftRow(nomer,n);
				offsetX[nomer] = 0;
			}
			else
			{
				if(bigBlock)
				{
					shiftColl(nomer+1,n);
					offsetY[nomer+1] = 0;					
				}
				shiftColl(nomer,n);
				offsetY[nomer] = 0.0;
			}
			if(CountShift == 0)
			{
				for (var i = 0; i < circlesCount; i++) {
					for (var j = 0; j < circlesCount; j++) {
						if (circles[i][j].color != (levels[currentLevel][1][i][j]%100)) {
								circles[i][j].OpenEyes();
						}
					}
				}
				circlesOpenEyes = [];
				for (var i = 0; i < circlesCount; i++) {
					for (var j = 0; j < circlesCount; j++) {
						if (circles[i][j].color != (levels[currentLevel][1][i][j]%100)) {
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
	var small_size = small_sprite.height >> 1;
	
	context.translate(translateX, translateY);//-circlesCount*blockSize*0.3);
    for (var i=0; i<circlesCount; i++) { // отобразить все окружности
		for(var j = 0; j < circlesCount; j++) {
			context.save();
			context.translate(j*scaleRect,i*scaleRect);
			if(levels[currentLevel][1][i][j] > 14  && levels[currentLevel][1][i][j] < 100 && (levels[currentLevel][1][i][j] - 15)%4 == 0) {
			
				context.drawImage(small_sprite,
					((levels[currentLevel][1][i][j] - 15)/4)*small_size,
					0,
					small_size,small_size,
					border,border,
					scaleRect << 1,
					scaleRect << 1);
				context.restore();				
			} else {
				context.drawImage(small_sprite,
					(levels[currentLevel][1][i][j]%100)*small_size,
					0,
					small_size,small_size,
					border,border,
					scaleRect,
					scaleRect);
				context.restore();
			}
		}
	}
	context.restore();
}

	
function drawScene() { // главная функция отрисовки	
	var transformBlock = {m11:1,
	m12:0,
	m21:(animate ? cur_blockSizeX : 0),
	m22:1,
	dx:0,
	dy:0};
	
	if (menu.enabled) {
		if(menu.redraw) {
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
		
			if(circles[i][j].color > 15 && (circles[i][j].color-15)%4 != 0)
				continue;
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
					
				if(bigBlock == 3 && (selectedCircleX + 1==j || selectedCircleY + 1==i) && moving == 0)
					light = 1;
				/*if(selectedCircleY + 1==i && bigBlock == 1)
					light = 1;*/
				
			}

			if(offsetX[i] != 0)
			{
				var fantom_pos;
				var fantom_pos_x;				
				if(offsetX[i] > 0)
				{
					//Вычислить цвет и координаты блока фантома
					//Цвет = кол-во блоков - округленное до величины целых блоков смещение - это при движении вправо
					//Позиция = смещение mod размер блока - х
					fantom_pos = (circlesCount - Math.floor(offsetX[i] / blockSize)%circlesCount) - 1;
					fantom_pos_x = offsetX[i]%blockSize - blockSize;
				}
				if(offsetX[i] < 0)
				{
					//тут надо взять блок координаты которого находятся на первом местве в ряду
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
					//Вычислить цвет и координаты блока фантома
					//Цвет = кол-во блоков - округленное до величины целых блоков смещение - это при движении вправо
					//Позиция = смещение mod размер блока - х
					fantom_pos = (circlesCount - Math.floor(offsetY[j] / blockSize)%circlesCount) - 1;
					fantom_pos_y = offsetY[j]%blockSize - blockSize;
				}
				if(offsetY[j] < 0)
				{
					//тут надо взять блок координаты которого находятся на первом месте в ряду
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
	
	if(win) {
		win--;
		if(win == 0)
			WinGame();
	}
	
}

function startGame(levelNum,loadGame) {
	currentLevel = levelNum;
	circlesCount=levels[currentLevel][1].length; //= 7; // мы нарисуем n окружностей
	fieldSize = blockSize * circlesCount;
	clear();
	blockSize = Math.floor((height - height*0.1)/circlesCount);

	sprite_size = get_spriteSize(blockSize);

	//Проверить есть ли в уровне большой блок
	sources = {
        candy_sprite: 'img_'+sprite_size+'/candy_sprite.png',
        eyes_sprite: 'img_'+sprite_size+'/eyes_sprite.png',
		locked: 'img_'+sprite_size+'/locked.png'
      };
	  
	for(var i = 0; i < circlesCount; i++) {
		for(var j = 0; j < circlesCount; j++) {
			if(levels[currentLevel][1][i][j] > 14) {
				sources.big_sprite = 'img_'+(sprite_size == 48 ? 64 : sprite_size << 1)+'/candy_sprite.png';
				break;
			}
		}
		if(sources.big_sprite)
			break;
	}
	sources.small_sprite = 'img_'+(sprite_size > 64 ? sprite_size >> 1 : 48)+'/candy_sprite.png';

	loadImages(sources, function(images) {
		candies_sprite = images.candy_sprite;
		eyes_sprite = images.eyes_sprite;
		big_sprite = images.big_sprite;
		small_sprite = images.small_sprite;
		locked_img = images.locked;
		fieldSize = blockSize * circlesCount;
		
		var level = JSON.parse(localStorage.getItem('level'));
		
		for (var i = 0; i < circlesCount; i++) {
			circles[i] = [];
			offsetX[i] = 0.0;
			offsetY[i] = 0.0;
			for (var j = 0; j < circlesCount; j++) {
				if(loadGame) {
					circles[i][j] = new Tile(blockSize, level[i][j].color, level[i][j].eye, sprite_size, level[i][j].locked);
				} else {
					var color = levels[currentLevel][1][i][j];
					var eye = undefined;
					var locked = false;
					if(color > 14 && color < 100 && (color-15)%4 != 0)
						eye = -1;
					if(color >= 100)
					{
						color -= 100;
						locked = true;
					}
					circles[i][j] = new Tile(blockSize, color, (eye ? eye : color), sprite_size,locked);
				}
			}
		}
		
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		TranslateX = (width - blockSize*circlesCount)/2;
		TranslateY = (height - blockSize*circlesCount)/2;
		ctx.translate(TranslateX,TranslateY);
		
		menu.enabled = false;
		drawLevel(ctx, -circlesCount*blockSize*0.3-50, 0, blockSize*0.301);
		drawBorder(ctx);
		if(!loadGame){
			blocked = true;
			RandomShift();
		} else
			UpdateEyes();
		btnPause_Menu.draw();
	});
	
}

function get_spriteSize(size) {
	var avaliable_sizes = [48,64,128,256,512];
	var ret;
	var b;
	if(size <= avaliable_sizes[0])
		return avaliable_sizes[0];
	for(var i = 0; i < avaliable_sizes.length; i++)
	{
		if(i != avaliable_sizes.length - 1)
		{
			b = (avaliable_sizes[i+1] - avaliable_sizes[i]) * 0.2 + avaliable_sizes[i];
			
			if(size > avaliable_sizes[i] && size < b)
			{
				ret = avaliable_sizes[i];
				break;
			}
			if(size > b && size < avaliable_sizes[i+1])
			{
				ret = avaliable_sizes[i+1];
				break;
			}
		}
		else
			ret = avaliable_sizes[avaliable_sizes.length - 1];
	}
	return ret;
}

// инициализация
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
		
	blockSize = Math.floor((height - height*0.1)/12);
	
	if(!isLocalStorageAvailable())
	{
		alert("Локальное хранилище не доступно");
		return;
	}
	
	if (localStorage.getItem("firststart") === null) {
		//Сохранить в локальное хранилище что игра уже один раз запусклась + сохранить что все левелы закрыты и не пройдены
		localStorage.setItem("firststart", "true");
		user_progress = [];
		user_progress[0] = "unlocked";
		for(var i = 1; i < levels.length; i++)
		{
			user_progress[i] = "locked";
		}
		localStorage.setItem('user_progress', JSON.stringify(user_progress));
	} else {
		user_progress = JSON.parse(localStorage.getItem('user_progress'));
	}
	
	// Звуки
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
	if(localStorage.getItem("enableMusic") == "true"){
		backgroundSound.play();
	}
	
	soundCelebrate = new Audio('media/celebrate.wav');
    soundCelebrate.volume = 0.9;
	
	
	for(var i = 0; i < 8; i++)
	{
		border[i] = new Image();
		border[i].src = 'img/border'+i+'.png';
	}
	
    sources = {
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
		helpImg: 'menu/help.png',
		btnLevelBlocked: 'menu/level_block.png',
		btnResume: 'menu/resume.png',
		btnRestart: 'menu/restart.png',
		btnsLevel: 'img_'+ get_spriteSize(height/4) +'/levels.png',
		btnsLevel_locked: 'img_'+ get_spriteSize(height/4) +'/level_locked.png',
		numbers: 'menu/numbers.png',
		btnHint: 'menu/hint.png',
		hint1: 'menu/hint1.png',
		hint2: 'menu/hint2.png',
		hint3: 'menu/hint3.png',
		btnNext: 'menu/next.png',
		btnPrevious: 'menu/previous.png',
	};
	sources.small_image = 'img_'+ get_spriteSize(blockSize) +'/candy_sprite.png';

	loadImages(sources, function(images) {
		menu = new Menu(ctx, width, height,15,30,images);//levels.length,30,images);
		menu.newGame = startGame;
		small_sprite = images.small_image;
		menu.draw();
	
	btnPause_Menu = new Button({
	ctx		: ctx,
	images	: { normal	: images.btnPauseMenu,
				light	: images.btnPauseMenu },
	x		: width - width/7,
	y		: 0,
	width	: width/7,
	height	: width/7
	});	
	
	// Загрузка музыки и звуков
	
	// привязываем событие нажатия мыши (для перетаскивания)
	var mousedownf=function(e) {
	//menu.draw(ctx);
		
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

		if(!blocked)
		{
			var cX = Math.floor((clickX-TranslateX)/blockSize);
			var cY = Math.floor((clickY-TranslateY)/blockSize);
			if((cX >=0 && cX < circlesCount) && (cY >=0 && cY < circlesCount))
			{
			
				if(circles[cY][cX].locked)
				{
					lockX = true;
					lockY = true;
				}
				//console.log(cX,cY,circles);
				if(circles[cY][cX].color > 14)
				{
					bigBlock = 3;
					var tile = (circles[cY][cX].color - 15)%4;
					switch(tile) {
					case 0:
						selectedCircleX = cX;
						selectedCircleY = cY;
					break;
					case 1:
						selectedCircleX = cX-1;
						selectedCircleY = cY;
					break;
					case 2:
						selectedCircleX = cX;
						selectedCircleY = cY-1;
					break;
					case 3:
						selectedCircleX = cX-1;
						selectedCircleY = cY-1;
					break;
					}
					maxBigX = fieldSize - (2*blockSize);
					minBigX = 0;
					maxBigY = fieldSize - (2*blockSize);
					minBigY = 0;
					//console.log(bigMoveX,bigMoveY);
				}
				else
				{
					// Просмотреть строку и столбец клика по массиву. Искать числа больше 14
					for(var i = 0; i < circlesCount; i++) {
						if(circles[cY][i].color > 14)
						{
							//В строке найден большой блок
							bigBlock = 1;
							//Расчитать границы диапазона перемещения этой строки
							maxBigX = fieldSize - (2*blockSize) + (cX - i)*blockSize;
							minBigX = (cX - i)*blockSize;
							//Определить это верхняя или нижняя часть блока
							if((circles[cY][i].color - 15) % 4 == 2 || (circles[cY][i].color - 15) % 4 == 3)
							//if(circles[cY][i].color == 17 || circles[cY][i].color == 18)
							{
								//Мы в нижней части. Поднять выделенную строку на 1
								cY--;
							}
							break;
						}
						if(circles[cY][i].locked)
							lockX = true;
					}
					
					for(var i = 0; i < circlesCount; i++) {
						if(circles[i][cX].color > 14)
						{
							//В строке найден большой блок
							bigBlock = 2;
							maxBigY = fieldSize - (2*blockSize) + (cY - i)*blockSize;
							minBigY = (cY - i)*blockSize;
							//Определить это левая или правая часть блока
							if((circles[i][cX].color - 15) % 4 == 1 || (circles[i][cX].color - 15) % 4 == 3)
							//if(circles[i][cX].color == 16 || circles[i][cX].color == 18)
							{
								//Мы в правой части. Сдвинуть выделенный стобец на 1
								cX--;
							}
							break;
						}
						if(circles[i][cX].locked)
							lockY = true;						
					}
					selectedCircleX = cX;
					selectedCircleY = cY;
				}
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

    var mousemovef=function(e) { // привязываем событие движения мыши для перетаскивания выбранной окружности
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
		return;
	}
	
        if (selectedCircleX != undefined && selectedCircleY != undefined) {
		
			var dX = mouseX - clickX;
			var dY = mouseY - clickY;
			
			if(Math.abs(dX) > dMove && Math.abs(dX) >= Math.abs(dY) && moving == 0) {
				moving = 1;
			}
			if(Math.abs(dY) > dMove && Math.abs(dX) < Math.abs(dY) && moving == 0) {
				moving = 2;
			}

			if(Math.abs(dX) <= dMove && Math.abs(dY) <= dMove)
			{
				moving = 0;
				offsetX[selectedCircleY] = 0;
				offsetY[selectedCircleX] = 0;
			}			
			
			if(bigBlock)
			{
				if(moving == 1 && (bigBlock == 1 || bigBlock == 3))
				{
					if(selectedCircleX*blockSize + dX < minBigX)
					{
						offsetX[selectedCircleY] = minBigX - selectedCircleX*blockSize;
						offsetX[selectedCircleY+1] = minBigX - selectedCircleX*blockSize;
						return;
					}
					if(selectedCircleX*blockSize + dX > maxBigX)
					{
						offsetX[selectedCircleY] = maxBigX - selectedCircleX*blockSize;
						offsetX[selectedCircleY+1] = maxBigX - selectedCircleX*blockSize;
						return;					
					}
				}
				if(moving == 2 && (bigBlock == 2 || bigBlock == 3))
				{
					if(selectedCircleY*blockSize + dY < minBigY)
					{
						offsetY[selectedCircleX] = minBigY - selectedCircleY*blockSize;
						offsetY[selectedCircleX+1] = minBigY - selectedCircleY*blockSize;
						return;
					}
					if(selectedCircleY*blockSize + dY > maxBigY)
					{
						offsetY[selectedCircleX] = maxBigY - selectedCircleY*blockSize;
						offsetY[selectedCircleX+1] = maxBigY - selectedCircleY*blockSize;
						return;					
					}				
				}
			}
		
			if(moving == 1) {
				if(lockX)
					return;
				offsetX[selectedCircleY] = dX;
			}
			if(moving == 2) {
				if(lockY)
					return;
				offsetY[selectedCircleX] = dY;
			}
			if(bigBlock)
			{
				if(moving == 1 && (bigBlock == 1 || bigBlock == 3)) {
					offsetX[selectedCircleY+1] = dX;
				}
				if(moving == 2 && (bigBlock == 2 || bigBlock == 3)) {			
					offsetY[selectedCircleX+1] = dY;
				}
				if(Math.abs(dX) <= dMove && Math.abs(dY) <= dMove)
				{
					offsetX[selectedCircleY+1] = 0;
					offsetY[selectedCircleX+1] = 0;
				}
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

    var mouseupf=function(e) { // событие mouseup - очистка выбранной окружности
		
		if (menu.enabled) {
			menu.clickUp(clickX, clickY);
			return;
		}

		if (btnPause_Menu.checkMouse(clickX, clickY) && !blocked) {
			menu.page = 'pause';
			menu.enabled=true;
			CountShift=20;
			clear(btnPause_Menu.x,btnPause_Menu.y,btnPause_Menu.width,btnPause_Menu.height);
			menu.draw();
			return;
		}
		
		var loop = 0;
		if(moving == 1)
		{
			if (selectedCircleX != undefined && selectedCircleY != undefined) {
				//Пересчитать оффсет и понять куда именно его надо подвинуть
				var mX = offsetX[selectedCircleY]%blockSize;
				if(Math.abs(mX) > blockSize/2)
				{
					animateTo = offsetX[selectedCircleY] - mX + (mX > 0 ? blockSize : 0-blockSize);
				}
				else
				{
					animateTo = offsetX[selectedCircleY] -mX;
				}
				var animationRow = selectedCircleY;
				selectedCircleX = undefined;
				selectedCircleY = undefined;
				
				if(mX != 0)
				{
					blocked = true;

					var tween = new Kinetic.Tween({
							node: offsetX[animationRow],
							x: animateTo,
							duration: 0.1,
							onStep: function(i) {
								offsetX[animationRow] = i;
								if(bigBlock == 1 || bigBlock == 3)
								{
									offsetX[animationRow+1] = i;
								}
							},
							onFinish: function() {
								var n = Math.floor(animateTo / blockSize)%circlesCount;
								shiftRow(animationRow,n);
								if(bigBlock == 1 || bigBlock == 3)
								{
									shiftRow(animationRow+1,n);
									offsetX[animationRow+1] = 0;
								}
								UpdateEyes();
								offsetX[animationRow] = 0;
								bigBlock = 0;
								moving = 0;
							}
						});
					tween.play();
				
				}
				else
				{
					var n = Math.floor(animateTo / blockSize)%circlesCount;
					shiftRow(animationRow,n);
					if(bigBlock == 1 || bigBlock == 3)
					{
						shiftRow(animationRow+1,n);
						offsetX[animationRow+1] = 0;
					}
					UpdateEyes();
					moving = 0;
					bigBlock = 0;
					offsetX[animationRow] = 0;				
				}
				
			}
		}
		if(moving == 2)
		{
			if (selectedCircleX != undefined && selectedCircleY != undefined) {
				//сдвинуть кружочки в массиве
				var mY = offsetY[selectedCircleX]%blockSize;
				if(Math.abs(mY) > blockSize/2)
				{
					animateTo = offsetY[selectedCircleX] - mY + (mY > 0 ? blockSize : 0-blockSize);
				}
				else
				{
					animateTo = offsetY[selectedCircleX] - mY;
				}
				
				var animationRow = selectedCircleX;
				selectedCircleX = undefined;
				selectedCircleY = undefined;				
				if(mY != 0)
				{
					blocked = true;
					var tween = new Kinetic.Tween({
							node: offsetY[animationRow],
							x: animateTo,
							duration: 0.1,
							onStep: function(i) {
								offsetY[animationRow] = i;
								if(bigBlock > 1)
									offsetY[animationRow+1] = i;
							},
							onFinish: function() {
								var n = Math.floor(animateTo / blockSize)%circlesCount;
								
								shiftColl(animationRow,n);
								if(bigBlock > 1)
								{
									shiftColl(animationRow+1,n);
									offsetY[animationRow+1] = 0;
								}
								offsetY[animationRow] = 0;
								
								UpdateEyes();
								bigBlock = 0;
								moving = 0;
							}
						});
					tween.play();
				}
				else
				{
					var n = Math.floor(animateTo / blockSize)%circlesCount;
					
					shiftColl(animationRow,n);
					if(bigBlock > 1)
					{
						shiftColl(animationRow+1,n);
						offsetY[animationRow+1] = 0;
					}
					offsetY[animationRow] = 0;
					
					UpdateEyes();
					bigBlock = 0;
					moving = 0;					
				}
			}		
		}
		if(moving == 0)
		{
			selectedCircleX = undefined;
			selectedCircleY = undefined;		
		}
		lockX = false;
		lockY = false;
		
    }//);

	
	try {
		document.createEvent('TouchEvent');
		support=1;
	} catch (e) {
		support=0;
	}
	if(support==1) canvas.addEventListener('touchend',mouseupf);
	else canvas.addEventListener('mouseup',mouseupf);

    id = setInterval(drawScene, 30); // скорость отрисовки
	});
});