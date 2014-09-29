// "DESIGN GRAMMER"
/*
	level := chunks 
	chunks := chunk | chunk chunks
	chunk := 
	
	






*/





var levelGenerator = function(){
	var height = 12;
	var levelSettings = LevelSettings();
	var groundTile,
		hazard1,
		hazard2,
		breakable,
		unbreakable,
		questionBox,
		starBox,
		yellowSkull,
		pinkSkull,
		groundIndex = 10,
		backgroundColor,
		EndingX;


	init();

	function init(){
		console.log("init");
		setUpLevel(randomTheme());
	}

	function setUpLevel(theme){
		levelSettings.setTheme(theme);
		groundTile = levelSettings.groundTile();
		hazard1 = levelSettings.hazard1();
		hazard2 = levelSettings.hazard2();
		breakable = levelSettings.breakable();
		unbreakable = levelSettings.unbreakable();
		backgroundColor = levelSettings.backgroundColor();
		starBox = 9;
		questionBox = 8;
		pinkSkull = 7;
		yellowSkull = 10;

	}


	function randomTheme(){
		return (randomInt(10) > 4) ? 'one' : 'two';
	}

	/*
	*	array of plain tiles with two tiles on the ground
	*/
	function createPlainLevel(length){
		
		var tiles = new Array(height);
		for(var i =0; i< tiles.length; i++){
			tiles[i] = [];
			for(var j = 0; j< length; j++){
				tiles[i].push(0);
			}
		}
		for(var i = height -2; i < height; i++ ){
			for(var j =0; j< length; j++){
				tiles[i][j] = groundTile;
			}	
		}
		return tiles;
	}

	function randomInt(size){
		return Math.round(Math.random() * size);
	}

	function createlevel(){
		setUpLevel('three');
		// get theme
		var length = 100;

		var tiles = createPlainLevel(length);
		var odds = [];
		odds[0] = 30; // "createGap"
		odds[1] = 30; //"makePlatform"
		odds[2] = 5;  //"triangleThing"
		odds[3] = 30; // "flatGround"
		var totalOdds = 0;

		for(var i = 0 ; i < odds.length; i++){

			if(odds[i] < 0 ){
				odds[i]= 0;
			}
			totalOdds+=odds[i];
			odds[i] = totalOdds - odds[i];
		}
		var index = 12;
		tiles[4][4] = breakable;
		tiles[4][5] = unbreakable;
		longHorizontal(3,  5);
		while (index < length) {
			var areaSize = 3 + Math.random() * 12 | 0;
			var chance = Math.random() * totalOdds;
			var type;
			for (var i = 0; i< odds.length; i++) {
				if (odds[i] <= chance) {
					type = i;
				}
			}
			switch (type) {
				case 0:
					createOneGap(tiles, index, areaSize-2);
					break;				
				case 1:
					createOneGap(tiles, index, areaSize-2);
					// this.makePlatform(index, size-2);
					break;
				case 2:
					// createOneGap(tiles, index, areaSize-2);
					triangleThing(tiles, index, areaSize-2);
					// this.triangleThing(5);
					break;
				case 3 :
					createOneGap(tiles, index, areaSize-2);
					longVert(tiles, index, 4);
					// this.plainSquare(index, size-2);
					// this.straightVertical(index, size-2);
					break;
			}
			// this.addClouds(index, 6);
			index+=areaSize;
		}
		EndingX = tiles[0].length - 5;
		return {
			tiles : tiles,
			backgroundColor : backgroundColor
		};
	}

	function applyArrays(tiles, array, x, y){
		// for(i = 0)
		// tiles[y][x] = 


	}

	function longVert(tiles, index, height){
		// debugger;
		var start = groundIndex -2;
		for (var y = start; y > start-height; y--){
			tiles[y][index] = breakable;
		}
	}

	function longHorizontal(index, size){
		var array = new Uint8Array(size);
		for(var i = 0; i < size; i++){
			var chance = randomInt(10);
			if(chance < 2){
				array[i] = breakable;
			} else if(chance < 4){
				array[i] = unbreakable;
			} else if(chance < 6 ){
				array[i] = starBox;
			}
		}
	}


	function createOneGap(tiles, index, length){
		// so we don't create a gap near the end of the level
		if(length > 5){
			var randHeight = height - randomInt(2) - 3;
			var randX = randomInt(4)+ index +2 ;

			tiles[randHeight][randX] = breakable;
		}
		for(var i = index+1; i< index + length-1; i++){
			if(i > tiles[0].length - 14){
				// debugger;
				return;
			}
			tiles[height-2][i] = hazard1;
			tiles[height-1][i] = hazard2;
		}
	}

	function triangleThing(tiles, index, length){
		/* options 
		   plain triangle
		   triangle with random money
		   triangle with random unbreakable bits
		*/
		// width of triangle will  be 2n -1 wide
		var height = Math.ceil(length / 2);
	

		var startX = index;
		var middle = startX + (height - 1);

		for(var i = 0; i< height; i++){
			// start at top
			// for triangles with 2 blocks at top initialize j to startX + (height - i)

			for(var j = startX + (height - i -1); j < startX + (height + i ); j++ ){  
				tiles[groundIndex - height  + i][j] = breakable; 
				
				if(Math.random() > .4 && j==middle){
					tiles[groundIndex - height  + i][j] = unbreakable; 
				}
			}
		}
	}

	function createPlatform(tiles, index, length){


	}

	return {
		createNewMap: function(isRandom){
			var map;
			if(isRandom){
				var level = createlevel(); // get level object
				map = new Map(level.tiles);
				map.backgroundColor = level.backgroundColor;
			}else {
				map = new Map();
			}
			// map.enemys = this.enemies;
			map.objects.push(new RiceBall(EndingX, 8));
			return map;
		}
	};
}


// makes a floating platform in the air
levelGenerator.prototype.makePlatform = function(start, length){
	var maxPlatformHeight = 4;

	var platformHeight = Math.round(Math.random() * 4) + 3;

	if( platformHeight > maxPlatformHeight){
		this.tiles[this.groundIndex - 2][start++] = this.breakableBlock;
	}

	for(var j = start; j< start + length; j++){
		var offGround = this.tiles.length - platformHeight -1;
		this.tiles[offGround][j] = CONSTANTS.themeOptions[this.currentOption].breakable;
	}
};

levelGenerator.prototype.straightVertical = function(start, length){
	var vHeight = Math.round(Math.random() * 3) + 2;

	for (var j = 0; j < vHeight; j++) {	
		this.tiles[j-2]

		for (var i = start; i< start+2; i++) {
			this.tiles[j-2][i] = CONSTANTS.themeOptions[this.currentOption].breakable;
		}
	}

};


levelGenerator.prototype.applyMask = function(tiles, prob, tilenumber){
	// var noise = 



}


levelGenerator.prototype.castlelevel = function(rooms){
	var mapsize = rooms *32;
	var tiles = new Array(mapsize);
	for(var i = 0; i< mapsize ;i++){
		tiles[i] = [];
		for(var j = 0; j < mapsize; j++){
			tiles[i].push(0);
		}
	}
	return tiles;
};


levelGenerator.prototype.createPlainlevel = function(tiles, length){

	for(var i =0; i< tiles.length; i++){
		tiles[i] = [];
		for(var j = 0; j< length; j++){
			tiles[i].push(0);
		}
	}
	for(var i = this.height -2; i < this.height; i++ ){
		for(var j =0; j< length; j++){
			tiles[i][j] = CONSTANTS.themeOptions[this.currentOption].groundTile;
		}	
	}
	return tiles;
};

levelGenerator.prototype.plainNoise = function(number){
	var tiles = randomValues(10, 32);
	var newtiles = get2dArray(32);

	for(var i = 0; i< 32; i++){
		for(var j = 0; j < 32; j++){
			if(tiles[i][j]> 0.70 && tiles[i][j] < 0.87){
				newtiles[i][j] = number;	
			}
			if(tiles[i][j] > .71 && tiles[i][j] < 0.75 ){
				newtiles[i][j] = 12;
			}
		}
	}
	return newtiles;
};





function get2dArray(size){
	var tiles = new Array(size);
	for(var i = 0; i< size ;i++){
		tiles[i] = [];
		for(var j = 0; j < size; j++){
			tiles[i].push(0);
		}
	}
	return tiles;
}


levelGenerator.prototype.addClouds = function(startX, size){
	// var numberOfClouds = randomInt(10)+1;
	var noisearray = randomValues(1, 6);
	var length = noisearray.length;
	for(var y = 1; y< length-1; y++){
		for(var x = 1; x < length-1; x++){
			if(noisearray[y][x] > 0.98){
				this.tiles[y][startX+ x] = 16;
				this.tiles[y][startX+ x+ 1] = 17;
			}
		}
	}
}






