define(['../utils/noise', '../../Block', '../settings/odds'], 
	function(Noise, Block, Odds){


	var theme,
		height = 12,
		tiles;
		var rand = new Noise(3412);

	function smoothArray (val, index, array) {
		var smoothValue = (array[index] + array[(index+1) % array.length]) * 0.5;
		return smoothValue;
	}

	function noiseArray2d(size, smooth){
		var array = [];
		for(var i = 0; i < size; i++){
			if(smooth){
				array.push(rand.noiseArray(size).map(smoothArray));
			} else{
				array.push(rand.noiseArray(size));
			}
		}
		return array;
	}

	function calculateOdds(config){
		var total = 0;
		var calculatedOdds = {};
		var key;
		for (key in config){
			total += config[key];
		}
		var lastValue = 0;
		for(key in config){
			var value = config[key] / total;
			value += lastValue;
			calculatedOdds[key] = [lastValue, value];
			lastValue = value;
		}
		return calculatedOdds;
	}

	function getValueFromOdds(value, odds){
		for(var key in odds){
			var min = odds[key][0],
				max = odds[key][1];
			if(value >= min	&& value < max){
				return key;
			}
		}
		return null;
	}


	return {
		reset : function(){
			console.log("resetting");
			this.rand = new Noise(123);
		},
		createGap : function(startX, y, length){

			for(y = height -2; y < height; y++){
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
			var randomY = this.rand.nextInt(3, y);
			for(var x = startX; x < startX + length; x++){
				randomY = this.rand.nextInt(3, y);
				if(Math.random()> 0.5){
					tiles.setTile(theme.unbreakable, x, randomY);
				} else {
					tiles.setTile(theme.breakable, x, randomY);
				}
				
			}
		},

		funkyShape : function(startX, y, length){
			var rand = this.rand;
			var width = this.rand.nextInt(2, 5);
			var solid = this.rand.nextBool();

			var arra2d = noiseArray2d(10);

			var noiseArray1 = rand.noiseArray(length);
			var smoothedArray2 = rand.noiseArray(length);//.map(smoothArray);
			var smoothedArray1 = noiseArray1.map(smoothArray);

			var w1 = rand.nextInt(0, 6);
			var w2 = rand.nextInt(0, 5);

			for(var x = startX; x < startX + length; x++){
				// if(x % 3 !==0 ){
					var y1 = Math.round(rand.nextInt(3, 9));
					y1 = 9 - Math.floor(smoothedArray1[x-startX ] * w1);
					var y2 =  y1 - 1;//10 - Math.floor(smoothedArray2[x-startX ] * 6);
					var themetile = rand.nextInt(0, 1) === 0 ? Block.star : theme.unbreakable;
					tiles.setTile(themetile, x, y1);
					tiles.setTile(theme.breakable,  x, y2);
				// }
			}
		},

		noiseArray2d : function (size, smooth){
			var array = [];
			for(var i = 0; i < size; i++){
				if(smooth){
					array.push(this.rand.noiseArray(size).map(smoothArray));
				} else{
					array.push(this.rand.noiseArray(size));
				}
			}
			return array;
		},


		heightMap : function(startX, y, length){
			var noiseArray1 = this.rand.noiseArray(length);

			var array2d = this.noiseArray2d(10, true);

			var odds = this.createOdds();


			for (var x = startX; x < startX + length; x++){
				var y1 =  9 - Math.floor(noiseArray1[x-startX] * 5);
				var val = array2d[y1][x-startX];
				var tile = parseInt(getValueFromOdds(val, odds));
				tiles.setTile(tile, x, y1);
			}
		},


		createOdds : function(){
			var config = {};

			config[Block.star] = 5;
			config[theme.breakable] = 20;
			config[theme.unbreakable] = 10;
			config[Block.question] = 1;
		
			var odds = calculateOdds(config);

			return odds;
		},

		decorate : function(startX, gy, length) {
			var decorDeets = theme.decorationRules();
			
			var drawDecoration = function(startX){
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
			};

			var number = Math.floor(length / decorDeets.width);

			if(length > 4){
				var startHeight = height + decorDeets.heightOffset,
					groundLevel = height - 2,
					width = decorDeets.width; // 4 tiles

				for(var i = 0; i < number; i++){
					var x = i * width + startX;
					drawDecoration(x);
				}

				
			}
		},

		setDefaults : function(newtheme, tileCreater, seed){
			theme = newtheme;
			tiles = tileCreater;
			this.rand = new Noise(seed);
		}
	};
});