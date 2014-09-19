// "DESIGN GRAMMER"
/*








*/





var levelGenerator = function(){
	this.height = 12;
	this.groundTile = 18;
	this.obsticleTile1 = 24;
	this.obsticleTile2 = 23;
	this.breakableBlock = 11;
	this.unBreakableBlcok = 12;
	this.currentOption = "two";
	this.groundIndex = 10; 
	this.tiles = [];
	this.difficulty = 1;

	this.endingX;

	this.enemies = [];
	this.objects  = [];
}

var themeOptions = {
	"one" : { 
		"groundTile" : 18,
		"hazard1" : 23,
		"hazard2" : 22,
		"breakable" : 11,
		"unbreakable" : 12
	},
	"two" : {
		"groundTile" : 13,
		"hazard1" : 28,
		"hazard2" : 27,
		"breakable" : 21,
		"unbreakable" : 20
	},
	"three" : {
		"groundTile" : 32,
		"hazard1" : 33,
		"hazard2" : 33,
		"breakable" : 35,
		"unbreakable" : 32
	}


}

levelGenerator.prototype.createNewMap = function(random, difficulty){
	var map;
	if(random){
		var tiles = this.createlevelRenderer();
		map = new Map(tiles);
	}else {
		map = new Map();
	}

	map.enemys = this.enemies;
	map.objects.push(new RiceBall(this.EndingX, 8));
	return map;
}





levelGenerator.prototype.createlevelRenderer = function() {
	// Choose theme
	var possibleOptions = ["one", "two", "three"];
	var poss = Math.random() * 3 | 0;
	// this.currentOption = possibleOptions[poss];
	this.currentOption = ["one"];


	// map length
	var length = 32 + (Math.random() * 128) | 0;
	this.EndingX = length - randomInt(3) - 1; // area to put the rice ball / hamburger

	this.tiles = new Array(this.height);
	this.createPlainlevelRenderer(this.tiles, length);


	var chunks = [];
	var start = index = 12;
	while(index < length){

		var newChunk = 3 + Math.random() * 12 | 0;

		this.enemies.push(new Enemy(index, randomInt(5)  ));
		var chance = Math.random();
		if(chance < .33) {
			this.createOneGap(index, newChunk-2);
		} else if( chance >= .33 && chance < .66 ) {
			this.makePlatform(index, newChunk-2);
		} else {
			this.tiles[0][index] = 6;
		}

		this.tiles[10][index] = 16; // start of gap
		this.addClouds(index, 6);

		index+=newChunk; 
	}

	return this.tiles;
};



// makes a floating platform in the air
levelGenerator.prototype.makePlatform = function(start, length){
	var maxPlatformHeight = 4;

	var platformHeight = Math.round(Math.random() * 4) + 3;

	// var start =  Math.round(Math.random() * this.tiles[0].length- (platformSize * 2)) ;
	if( platformHeight > maxPlatformHeight){
		this.tiles[this.groundIndex - 2][start++] = this.breakableBlock;
	}

	for(var j = start; j< start + length; j++){
		var offGround = this.tiles.length - platformHeight -1;
		this.tiles[offGround][j] = themeOptions[this.currentOption].breakable;
	}
};


levelGenerator.prototype.applyMask = function(tiles, prob, tilenumber){
	// var noise = 



}




levelGenerator.prototype.castlelevelRenderer = function(rooms){
	var mapsize = rooms *32;
	var tiles = new Array(mapsize);
	for(var i = 0; i< mapsize ;i++){
		tiles[i] = [];
		for(var j = 0; j < mapsize; j++){
			tiles[i].push(0);
		}
	}
	return tiles;
}


levelGenerator.prototype.createPlainlevelRenderer = function(tiles, length){

	for(var i =0; i< tiles.length; i++){
		tiles[i] = [];
		for(var j = 0; j< length; j++){
			tiles[i].push(0);
		}
	}
	for(var i = this.height -2; i < this.height; i++ ){
		for(var j =0; j< length; j++){
			tiles[i][j] = themeOptions[this.currentOption].groundTile;
		}	
	}
	this.triangleThing(tiles);
	return tiles;
}

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
}



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

levelGenerator.prototype.createOneGap = function(startX, length){

	if(length > 5){
		this.tiles[this.height - 4][startX + 4] = themeOptions[this.currentOption].unbreakable;
		this.tiles[this.height - randomInt(2) - 4 ][startX + randomInt(8) ] = themeOptions[this.currentOption].breakable;
	}

	for(var i = startX+1; i< startX+ length-1; i++){
		this.tiles[this.height-2][i] = themeOptions[this.currentOption].hazard1;
		this.tiles[this.height-1][i] = themeOptions[this.currentOption].hazard2;
	}
	var ranran = Math.random();
	if(ranran > .33 && ranran < .45 ){
		// create bridge over it


	}
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


// 		 0
//     0 0 0
//   0 0 0 0 0 
// 0 0 0 0 0 0 0  


levelGenerator.prototype.triangleThing = function(tiles){
	/* options 
	   plain triangle
	   triangle with random money
	   trianle with random unbreakable bits
	*/

	var odds = randomInt(10);

	var height = (Math.random() * 6 ) + 3 | 0; // either three or 4
	// width of triangle will  be 2n -1 wide
	var startX =  Math.random() * 40 | 0;
	var middle = startX + (height - 1);
	var ranNoise = randomValues(1, height+1);
	// var ranNoise = getRandomNoise(height+1);	


	for(var i = 0; i< height; i++){
		// start at top
		// for triangles with 2 blocks at top initialize j to startX + (height - i)

		for(var j = startX + (height - i -1); j < startX + (height + i ); j++ ){  
			tiles[this.groundIndex - height  + i][j] = themeOptions[this.currentOption].breakable; 
			

			if(Math.random() > .4 && j==middle){
				tiles[this.groundIndex - height  + i][j] = themeOptions[this.currentOption].unbreakable; 
			}
			var x = j - startX - height;
			var noise = ranNoise[i][j-startX];
			if( noise > .95 ){
				tiles[this.groundIndex - height  + i][j] = 9;
				//themeOptions[this.currentOption].unbreakable; 
			}

		}
	}

}


var randomInt = function(size){
	return Math.round(Math.random() * size);
}





