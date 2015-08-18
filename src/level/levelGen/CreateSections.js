define(['./createtiles', './noise', '../Block'], 
	function(createtiles, Noise, Block){


	var theme,
		height = 12,
		tiles;
		var rand = new Noise(3412);

	function smoothArray (val, index, array) {
		var smoothValue = (array[index] + array[(index+1) % array.length]) * 0.5;
		return smoothValue;
	}


	return {
		reset : function(){
			console.log("resetting");
			rand = new Noise(123);
		},
		createGap : function(startX, y, length){

			for(var y = height -2; y < height; y++){
				var tile = y === height -2 ? theme.hazard1 : theme.hazard2;
				for(var x = startX; x < startX + length; x++){
					tiles.setTile(tile, x, y);
				}
			}
		},

		createPlatform : function(startX, y, length){
			for(var x = startX; x < startX + length; x++){
				tiles.setTile(theme.breakable, x, y);
			}
		},

		createSquare : function(startX, y, length ){
			for(var x = startX; x < startX + length; x++){
				tiles.setTile(theme.unbreakable, x, y);
			}
		},

		createRandomIsh : function(startX, y, length){
			var randomY = rand.nextInt(3, y);
			for(var x = startX; x < startX + length; x++){
				var randomY = rand.nextInt(3, y);
				if(Math.random()> 0.5){
					tiles.setTile(theme.unbreakable, x, randomY);
				} else {
					tiles.setTile(theme.breakable, x, randomY);
				}
				
			}
		},

		createSimple : function(startX, y, length){

			tiles.setTile(Block.question, startX + 4, 8);
			tiles.setTile(theme.breakable, startX + 5, 8);

		},

		funkyShape : function(startX, y, length){

			var width = rand.nextInt(2, 5);
			var solid = rand.nextBool();
			var x1 = rand.nextInt(0, 2)
			var y1 = rand.nextInt(3, 5);
			var x2 = rand.nextInt(0, 4);
			var y2 = rand.nextInt(5, 8);


			var noiseArray1 = rand.noiseArray(length);
			var smoothedArray2 = rand.noiseArray(length)//.map(smoothArray);
			var smoothedArray1 = noiseArray1.map(smoothArray);

			var w1 = rand.nextInt(0, 6);
			var w2 = rand.nextInt(0, 5);

			for(var x = startX; x < startX + length; x++){
				// if(x % 3 !==0 ){
					var y1 = Math.round(rand.nextInt(3, 9));
					var y1 = 9 - Math.floor(smoothedArray1[x-startX ] * w1);
					var y2 =  y1 - 1;//10 - Math.floor(smoothedArray2[x-startX ] * 6);
					var themetile = rand.nextInt(0, 1) === 0 ? Block.star : theme.unbreakable;
					tiles.setTile(themetile, x, y1);
					tiles.setTile(theme.breakable,  x, y2);
				// }
			}
			// tiles.setTile(theme.breakable, startX+x1, y1);
			// tiles.setTile(theme.breakable, startX+x2, y2);
		},

		decorate :function(startX, gy, length) {
			var decorDeets = theme.decorationRules();
			console.log("section length : ", length);

			var number = Math.floor(length / decorDeets.width);

			if(length > 4){
				var startHeight = height + decorDeets.heightOffset,
					groundLevel = height - 2,
					width = decorDeets.width; // 4 tiles

				for(var i = 0; i < number; i++){
					var x = i * width + startX;
					drawDecoration(x);
				}

				 function drawDecoration(startX){
					for(var y = 0; y < decorDeets.height; y++){
						for(var x = 0; x < decorDeets.width; x++){

							var yy = y + startHeight, 
								xx = x + startX;

							// var tile = (decorDeets.tileNumber + y) * 16 + x;
							var tile = decorDeets.tileIndex + (y * 16) + x;
							// console.log(tile)
							tiles.setTile(tile, xx, yy);
						}
					}
				}
			}
		},
		setTheme : function(newtheme){
			theme = newtheme;
		},
		setTileCreater : function(tileCreater){
			tiles = tileCreater
		}
	};


});