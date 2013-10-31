var canvas, ctx;
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
var TranslateX = 0;
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
    [10,[[1,1,1,1,1],[1,5,5,5,1],[1,5,3,5,1],[1,5,5,5,1],[1,1,1,1,1]]],
    [11,[[2,0,0,0,0],[5,2,0,0,0],[5,5,2,0,0],[5,5,5,2,0],[5,5,5,5,2]]],
    [12,[[4,4,1,1,1],[4,4,4,6,6],[6,6,4,6,6],[6,6,4,4,4],[1,1,1,4,4]]],
    [13,[[2,2,5,2,2],[2,3,5,3,2],[2,3,3,3,2],[2,3,5,3,2],[2,2,5,2,2]]],
    [14,[[1,0,1,0,1],[1,4,1,4,1],[4,4,4,4,4],[0,1,1,1,0],[1,0,1,0,1]]]
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
var menu;
// -------------------------------------------------------------

function draw(func, transform){

	ctx.save();
    ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
    func(ctx);	
	ctx.restore();
}

// -------------------------------------------------------------

// функции отрисовки :

function clear() { // функци€ очищает canvas
	ctx.save();
	ctx.translate(0,0);
    ctx.clearRect(-10, -10, fieldSize+20, fieldSize+20);
	ctx.restore();
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
	circlesOpenEyes = [];
	for (var i = 0; i < circlesCount; i++) {
		for (var j = 0; j < circlesCount; j++) {
			if (circles[i][j].color != levels[currentLevel][1][i][j]) {
					circlesOpenEyes.push(circles[i][j]);
					circles[i][j].OpenEyes();
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

function drawField() {
	ctx.drawImage(border[0],-blockSize/2,-blockSize/2,blockSize,blockSize);
	ctx.drawImage(border[3],-blockSize/2,blockSize*(circlesCount-1) + blockSize/2,blockSize,blockSize);
	ctx.drawImage(border[1],blockSize*(circlesCount-1)+blockSize/2,-blockSize/2,blockSize,blockSize);
	ctx.drawImage(border[2],blockSize*(circlesCount-1) + blockSize/2,blockSize*(circlesCount-1) + blockSize/2,blockSize,blockSize);
	for (var i=0; i<circlesCount-1; i++) {
		ctx.drawImage(border[5],-blockSize/2,blockSize*i + blockSize/2,blockSize,blockSize);
		ctx.drawImage(border[7],blockSize*(circlesCount-1) + blockSize/2,blockSize*i + blockSize/2,blockSize,blockSize);
		ctx.drawImage(border[6],blockSize*i + blockSize/2,-blockSize/2,blockSize,blockSize);
		ctx.drawImage(border[4],blockSize*i + blockSize/2,blockSize*(circlesCount-1) + blockSize/2,blockSize,blockSize);
	}
}

function drawLevel()//отобразить мини уровень
{
	var border = Math.ceil((blockSize*0.04)/2);		
	ctx.save();
	ctx.translate(-circlesCount*blockSize*0.3-50, 0);//-circlesCount*blockSize*0.3);
    for (var i=0; i<circlesCount; i++) { // отобразить все окружности
		for(var j = 0; j < circlesCount; j++) {
			ctx.save();
			ctx.translate(j*blockSize*0.301,i*blockSize*0.301);
			ctx.drawImage(candies_sprite,
				levels[currentLevel][1][i][j]*sprite_size,
				0,
				sprite_size,sprite_size,
				border,border,
				blockSize*0.3,
				blockSize*0.3);
			ctx.restore();
		}
	}
	ctx.restore();
}
	
function drawScene() { // главна€ функци€ отрисовки
    clear(); // очистить canvas
	
	if (menu.enabled) {
		menu.draw(ctx);
		return;
	}

	var loopX = 0;
	var loopY = 0;
	var light = 0;
	
	ctx.beginPath();
	ctx.rect(blockSize/2, blockSize/2, blockSize*(circlesCount-1) + 1, blockSize*(circlesCount-1) + 1);
	ctx.fillStyle = 'rgba(51,53,52,255)';
	ctx.fill();
	ctx.closePath();
	
	drawField();

	if (cur_blockSizeX + jump_stepX > 0.2 || cur_blockSizeX + jump_stepX < -0.2)
		jump_stepX = -jump_stepX;
	cur_blockSizeX += jump_stepX;

	processEyes();
	
	var transformBlock = {m11:1,
	m12:0,
	m21:(animate ? cur_blockSizeX : 0),
	m22:1,
	dx:0,
	dy:0};
	
	
	var transformBlock2 = {m11:0.3,
	m12:0,
	m21:(animate ? cur_blockSizeX : 0),
	m22:0.3,
	dx:0,
	dy:0};
	
	ctx.save();
	ctx.beginPath();
	ctx.rect(0, 0, blockSize*circlesCount, blockSize*circlesCount);
	ctx.clip();
	
	for (var i=0; i<circlesCount; i++) { // отобразить мини уровень
		for(var j = 0; j < circlesCount; j++) {
		
		transformBlock2.dx = j*blockSize/3;
		transformBlock2.dy = i*blockSize/3;
		draw(function(ctx){
		drawFantom(ctx, levels[currentLevel][1][i][j],0,0);
		},transformBlock2);			
		}	
	}
	
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
	drawLevel();
}

// -------------------------ѕеремешивание уровн€----------------------
function RandomShift(){
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
	RandomShift();
}

// инициализаци€
$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
	width = canvas.width = $(window).width();
	height = canvas.height = $(window).height();
	
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
	for(var i = 0; i < 11; i++)
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
	
	candies_sprite = new Image();
	candies_sprite.src = 'img_'+sprite_size+'/candy_sprite.png';
	candies_sprite.onload = function() {}	
	
	eyes_sprite = new Image();
	eyes_sprite.src = 'img_'+sprite_size+'/eyes_sprite.png';
	eyes_sprite.onload = function() {}	
	
	for(var i = 0; i < 8; i++)
	{
		border[i] = new Image();
		border[i].src = 'img/border'+i+'.png';
	}
	
	TranslateX = (width - blockSize*circlesCount)/2;
	TranslateY = (height - blockSize*circlesCount)/2;
	ctx.translate(TranslateX,TranslateY);
	menu = new Menu(fieldSize, fieldSize, width, height, levels.length);
	menu.newGame = startGame;
	
	// прив€зываем событие нажати€ мыши (дл€ перетаскивани€)
	$('#scene').mousedown(function(e) {
		var canvasPosition = $(this).offset();
		
		clickX = e.offsetX || 0;
		clickY = e.offsetY || 0;

		if (menu.enabled) {
			menu.click(clickX-TranslateX, clickY-TranslateY);
			return;
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
				sounds[circles[selectedCircleX][selectedCircleY].color].play();
			}
		}
		
    });

    $('#scene').mousemove(function(e) { // прив€зываем событие движени€ мыши дл€ перетаскивани€ выбранной окружности
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;

	if (menu.enabled) {
		menu.move(mouseX-TranslateX, mouseY-TranslateY);
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
	});

    $('#scene').mouseup(function(e) { // событие mouseup - очистка выбранной окружности
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
		
    });

    setInterval(drawScene, 30); // скорость отрисовки
});