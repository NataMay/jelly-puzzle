function Hint(ctx, width, height, scaleRect){// Раздел меню с подсказками
	this.height= height;
	var self = this;
	//clearInterval(id);
	blockSize=(this.height-this.height/3.5)/4;
	drawLevel(ctx, this.width/10, this.height/20, scaleRect);
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
			var color = levelHint[i][j];
			circles[i][j] = new Tile(blockSize, color, color, sprite_size);
		}
	}
	TranslateX = (width - blockSize*circlesCount)/2;
	TranslateY = this.height/40;
	ctx.translate(TranslateX,TranslateY);
	//drawField(ctx);
	drawBorder(ctx);
	
	UpdateEyes();
	
	var stop = false;
	var masShift=[{napravl:1, kol:1, nomer:3},//направлен, кол, номер
		{napravl:2, kol:1, nomer:1},
		{napravl:1, kol:1, nomer:2},
		{napravl:1, kol:2, nomer:3},
		{napravl:2, kol:2, nomer:3},
			{napravl:2, kol:-2, nomer:3},
			{napravl:1, kol:-2, nomer:3},
			{napravl:1, kol:-1, nomer:2},
			{napravl:2, kol:-1, nomer:1},
			{napravl:1, kol:-1, nomer:3}
	];
	
this.stop = function() {
	stop = true;
}

this.shiftRect = function(elemShift, CountShift){
	blocked=true;	
	var napravl=masShift[elemShift].napravl;
	var kol=masShift[elemShift].kol;
	var nomer=masShift[elemShift].nomer;
	console.log(CountShift);
	var tween = new Kinetic.Tween({
		node: 0,
		x: kol*blockSize,
		duration: 1.1,
		//easing: Kinetic.Easings.ElasticEaseOut,
		onStep: function(i) {
			if(napravl == 1)
				offsetX[nomer] = i;
			else
				offsetY[nomer] = i;
		},
		onFinish: function() {
			var n = kol%circlesCount
			if(napravl == 1)
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
						else circles[i][j].CloseEyes();
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
			//UpdateEyes();
			else
			{
				CountShift--;
				self.shiftRect(elemShift+1, CountShift);
				
				//elemShift=elemShift-CountShift;
			}
		}
	});
	tween.play();	
	
}

var drawRect = function(){
		var transformBlock = {m11:1,
			m12:0,
			m21:(animate ? cur_blockSizeX : 0),
			m22:1,
			dx:0,
			dy:0};
		var loopX = 0;
		var loopY = 0;
		var light = 0;
		drawField(ctx);
		processEyes();

		ctx.save();
		ctx.beginPath();
		ctx.rect(0, 0, blockSize*circlesCount, blockSize*circlesCount);
		ctx.clip();
		
		for (var i = 0; i < 4; i++) { // отобразить все окружности
			for(var j = 0; j < 4; j++) {
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
		
		if(!stop) {	
			setTimeout(drawRect, 30);
		} else {
			clear();
			menu.draw();
		}
	}
	drawRect();
	setTimeout(drawRect, 30);

}