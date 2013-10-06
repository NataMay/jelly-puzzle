var canvas, ctx;
var circles = [];
var selectedCircleX;
var selectedCircleY;
var offsetX = [];
var offsetY = [];
var Dmove = 10.0;
var clickX;
var clickY;
var circlesCount = 7; // мы нарисуем 7 окружностей
var width;
var height;
var blockSize = 66;
var fieldSize = blockSize * circlesCount;
var moving = 0; // 0-никуда 1-перемещение строки 2-перемещение столбца
var TranslateX = 0;
var TranslateX = 0;
var dMove = 5;
var Candies = [];
var Candies_light = [];
var eyes = [];
var border = [];
var jump_stepX = 0.07;
var jump_stepY = -1;
var cur_blockSizeX = 0.2;
var cur_blockSizeY = blockSize;
var level = [
	[0,0,0,0,0,0,0],
	[4,1,1,1,1,1,4],
	[4,1,2,2,2,1,4],
	[4,1,2,3,2,1,4],
	[4,1,2,2,2,1,4],
	[4,1,1,1,1,1,4],
	[0,0,0,0,0,0,0]
];
var level_random = [];
var animate = 0;
var animateTo;
var animSpeed = 7;
var blocked = false;
var animationRow;
var AnimateID;

// -------------------------------------------------------------

function draw(func, transform){

	ctx.save();
    ctx.setTransform(transform.m11, transform.m12, transform.m21, transform.m22, transform.dx, transform.dy);
    func(ctx);	
	ctx.restore();
}

// -------------------------------------------------------------

// функции отрисовки :

function clear() { // функция очищает canvas
	ctx.save();
	ctx.translate(0,0);
    ctx.clearRect(-10, -10, fieldSize+20, fieldSize+20);
	ctx.restore();
}

function drawFantom(ctx,color,eye) { // функция рисует окружность
		ctx.drawImage(Candies_light[color],1,1,64,64);
		if(eye)
		{
			ctx.save();
			ctx.translate((blockSize-eyes[color][0].width)/2-1,(blockSize-eyes[color][0].height)/2);
			ctx.drawImage(eyes[color][0],0,0);
			ctx.restore();
		}
}

function processEyes() {
	var circlesOpenEyes = [];
	for (var i = 0; i < circlesCount; i++) {
		for (var j = 0; j < circlesCount; j++) {
			if (circles[i][j].color != level[i][j]) {
				if (circles[i][j].drawEyes == false) {
					circles[i][j].OpenEyes();
				} else if (circles[i][j].currentEye == 0) {
					circlesOpenEyes.push(circles[i][j]);
				}
			}
		}
	}
	if (circlesOpenEyes.length > 0) {
		// 4 - чем больше параметр, тем меньшее кол-во моргает
		if (Math.random() * 4 < circlesOpenEyes.length / (circlesCount * circlesCount)) {
			circlesOpenEyes[Math.floor(Math.random() * circlesOpenEyes.length)].CloseEyes();
		}
	}
}

function animateMove() {
	if(offsetX[animationRow] < animateTo)
	{
		if(Math.abs(offsetX[animationRow] - animateTo) >= animSpeed)
			offsetX[animationRow] += animSpeed;
		else
		{
			offsetX[animationRow] = animateTo;
		}
		
	}
	if(offsetX[animationRow] > animateTo)
	{
		if(Math.abs(offsetX[animationRow] - animateTo) >= animSpeed)
			offsetX[animationRow] -= animSpeed;
		else
		{
			offsetX[animationRow] = animateTo;
		}
	}

	if(offsetX[animationRow] === animateTo)
	{
		console.log(animationRow);
		clearInterval(AnimateID);
		var b = [];
		var n = Math.floor(animateTo / blockSize)%circlesCount;
		if(n != 0)
		{
			if(n>0)
			{
				for (var i = circlesCount-1; i >= 0; i--) {
					if(i+n >= circlesCount){
						b[i+n-circlesCount] = circles[animationRow][i];
					}
					else{
						b[i+n] = circles[animationRow][i];
					}
				}
			}
			if(n<0)
			{
				n = Math.abs(n);
				for (var i = circlesCount-1; i >= 0; i--) {
					if(i-n < 0){
						b[i-n+circlesCount] = circles[animationRow][i];
					}
					else{
						b[i-n] = circles[animationRow][i];
					}
				}				
			}
			circles[animationRow] = b;
		}
		//offsetX[selectedCircleY] = 0.0;
		for (var i = 0; i < circlesCount; i++)
		{
			if(circles[animationRow][i].color != level[animationRow][i])
				circles[animationRow][i].OpenEyes();
			else
				circles[animationRow][i].CloseEyes();
		}
		blocked = false;
		offsetX[animationRow] = 0;
	}


}

function drawField() {
	ctx.drawImage(border[0],-blockSize/2,-blockSize/2);
	ctx.drawImage(border[3],-blockSize/2,blockSize*(circlesCount-1) + blockSize/2);
	ctx.drawImage(border[1],blockSize*(circlesCount-1)+blockSize/2,-blockSize/2);
	ctx.drawImage(border[2],blockSize*(circlesCount-1) + blockSize/2,blockSize*(circlesCount-1) + blockSize/2);
	for (var i=0; i<circlesCount-1; i++) {
		ctx.drawImage(border[5],-blockSize/2,blockSize*i + blockSize/2);
		ctx.drawImage(border[7],blockSize*(circlesCount-1) + blockSize/2,blockSize*i + blockSize/2);
		ctx.drawImage(border[6],blockSize*i + blockSize/2,-blockSize/2);
		ctx.drawImage(border[4],blockSize*i + blockSize/2,blockSize*(circlesCount-1) + blockSize/2);
	}
}
	
function drawScene() { // главная функция отрисовки
    clear(); // очистить canvas

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
				drawFantom(ctx, circles[i][fantom_pos].color,circles[i][fantom_pos].drawEyes);
				},transformBlock);	
			}
			transformBlock.dx = (j*blockSize + offsetX[i])%fieldSize + loopX + TranslateX;
			transformBlock.dy = (i*blockSize + offsetY[j])%fieldSize + loopY + TranslateY;
			
			circles[i][j].draw(ctx,transformBlock,light);

			light = 0;
		}
    }
	ctx.restore();
	
}

// -------------------------------------------------------------

// инициализация

$(function(){
    canvas = document.getElementById('scene');
    ctx = canvas.getContext('2d');
	width = canvas.width = $(window).width();
	height = canvas.height = $(window).height();
  /*  width = canvas.width;
    height = canvas.height;*/
	
	
	for(var i = 0; i < 5; i++)
	{
		Candies[i] = new Image();
		Candies[i].src = 'img/candy'+i+'.png';
		Candies[i].onload = function() {}
		
		Candies_light[i] = new Image();
		Candies_light[i].src = 'img/candy'+i+'_light.png';
		Candies_light[i].onload = function() {}
	}

	for(var i = 0; i < 5; i++)
	{
		eyes[i] = [];
		for(var j = 0; j < 5; j ++)
		{
			eyes[i][j] = new Image();
			eyes[i][j].src = 'img/eyes'+i+'.'+j+'.png';
			eyes[i][j].onload = function() {}
		}
	}
	
	for(var i = 0; i < 8; i++)
	{
		border[i] = new Image();
		border[i].src = 'img/border'+i+'.png';		
	}
	
	TranslateX = (width - blockSize*circlesCount)/2;
	TranslateY = (height - blockSize*circlesCount)/2;
	ctx.translate(TranslateX,TranslateY);
	// -----------------------Перемешивание уровня---------------------
	var temp;
	for (var i=0; i<(circlesCount); i++){
		level_random[i] = [];
		for(var j = 0; j < (circlesCount); j++)
			level_random[i][j]=level[i][j];
	}
	for (var i=0; i<(circlesCount); i++) {
		for(var j = 0; j < (circlesCount); j++) {
			do var i_random=Math.floor(Math.random() * ((circlesCount-1) - 0 + 1)) + 0;
			while(i_random==i);
			do var j_random=Math.floor(Math.random() * ((circlesCount-1) - 0 + 1)) + 0;
			while(j_random==j);
			temp=level_random[i][j];
			level_random[i][j]=level_random[i_random][j_random];
			level_random[i_random][j_random]=temp;
		}
	}
	// ---------------------------------------------------------------
	
	for (var i=0; i<(circlesCount); i++) {
		circles[i] = [];
		offsetX[i] = 0.0;
		offsetY[i] = 0.0;
		for(var j = 0; j < (circlesCount); j++) {
			var color = level_random[i][j];
			circles[i][j] = new Tile(blockSize,color,color);
			if(level_random[i][j] != level[i][j])
				circles[i][j].OpenEyes();
			else
				circles[i][j].CloseEyes();
		}
	}

	// привязываем событие нажатия мыши (для перетаскивания)
	$('#scene').mousedown(function(e) {
		var canvasPosition = $(this).offset();
		clickX = e.offsetX || 0;
		clickY = e.offsetY || 0;
		if(!blocked)
		{
			var cX = Math.floor((clickX-TranslateX)/blockSize);
			var cY = Math.floor((clickY-TranslateY)/blockSize);
			if((cX >=0 && cX < circlesCount) && (cY >=0 && cY < circlesCount))
			{
				selectedCircleX = cX;
				selectedCircleY = cY;
				//console.log(selectedCircleX,selectedCircleY);
			}
		}
		
    });

    $('#scene').mousemove(function(e) { // привязываем событие движения мыши для перетаскивания выбранной окружности
            var mouseX = e.offsetX || 0;
            var mouseY = e.offsetY || 0;
	
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
				//Пересчитать оффсет и понять куда именно его надо подвинуть
				var mX = offsetX[selectedCircleY]%blockSize;
				if(mX != 0)
				{
					if(Math.abs(mX) > blockSize/2)
					{
						//offsetX[selectedCircleY] = offsetX[selectedCircleY] - mX + (mX > 0 ? blockSize : 0-blockSize);
						animateTo = offsetX[selectedCircleY] - mX + (mX > 0 ? blockSize : 0-blockSize);
						//blocked = true;
					}
					else
					{
						//offsetX[selectedCircleY] = offsetX[selectedCircleY] - mX;
						animateTo = offsetX[selectedCircleY] -mX;
						//blocked = true;
					}
					blocked = true;
					animationRow = selectedCircleY;
					console.log(offsetX[selectedCircleY], animateTo);
					AnimateID = setInterval(animateMove, 30);
				
				}
				
				//сдвинуть кружочки в массиве
				/*var b = [];
				var n = Math.floor(animateTo / blockSize)%circlesCount;
				if(n != 0)
				{
					if(n>0)
					{
						for (var i = circlesCount-1; i >= 0; i--) {
							if(i+n >= circlesCount){
								b[i+n-circlesCount] = circles[selectedCircleY][i];
							}
							else{
								b[i+n] = circles[selectedCircleY][i];
							}
						}
					}
					if(n<0)
					{
						n = Math.abs(n);
						for (var i = circlesCount-1; i >= 0; i--) {
							if(i-n < 0){
								b[i-n+circlesCount] = circles[selectedCircleY][i];
							}
							else{
								b[i-n] = circles[selectedCircleY][i];
							}
						}				
					}
					circles[selectedCircleY] = b;
				}
				//offsetX[selectedCircleY] = 0.0;
				for (var i = 0; i < circlesCount; i++)
				{
					if(circles[selectedCircleY][i].color != level[selectedCircleY][i])
						circles[selectedCircleY][i].OpenEyes();
					else
						circles[selectedCircleY][i].CloseEyes();
				}*/
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
						offsetY[selectedCircleX] = offsetY[selectedCircleX] - mY + (mY > 0 ? blockSize : 0-blockSize);
					}
					else
						offsetY[selectedCircleX] = offsetY[selectedCircleX] - mY;
				
				}				
				var b = [];
				var n = Math.floor(offsetY[selectedCircleX] / blockSize)%circlesCount;
				if(n != 0)
				{
					if(n>0)
					{
						for (var i = circlesCount-1; i >= 0; i--) {
							if(i+n >= circlesCount){
								b[i+n-circlesCount] = circles[i][selectedCircleX];
							}
							else{
								b[i+n] = circles[i][selectedCircleX];
							}
						}
					} 
					if(n<0)
					{
						n = Math.abs(n);
						for (var i = circlesCount-1; i >= 0; i--) {
							if(i-n < 0){
								b[i-n+circlesCount] = circles[i][selectedCircleX];
							}
							else{
								b[i-n] = circles[i][selectedCircleX];
							}
						}					
					}
					for(var i = 0; i < circlesCount; i++)
					{
						circles[i][selectedCircleX] = b[i];
						if(circles[i][selectedCircleX].color != level[i][selectedCircleX])
							circles[i][selectedCircleX].OpenEyes();
						else
							circles[i][selectedCircleX].CloseEyes();
					}
				}
				//circles[selectedCircleY] = b;
				offsetY[selectedCircleX] = 0.0;
			}		
		}
		moving = 0;
        selectedCircleX = undefined;
		selectedCircleY = undefined;
    });

    setInterval(drawScene, 30); // скорость отрисовки
});