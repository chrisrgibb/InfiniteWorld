// "DESIGN GRAMMER"
/*








*/





var LevelGenerator = function(){
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
		"hazard1" : 29,
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

LevelGenerator.prototype.createLevel = function(first_argument) {
	// Choose theme
	var possibleOptions = ["one", "two", "three"];
	var poss = Math.random() * 3 | 0;
	this.currentOption = possibleOptions[poss];

	var length = 32 + (Math.random() * 128) | 0;
	var EndingX = length - randomInt(3); // area to put the rice ball / hamburger
	console.log(length);


	console.log(chunks);
	
	this.tiles = new Array(this.height);
	this.createPlainLevel(this.tiles, length);


	var chunks = [];
	var start = 12;
	var index = 12;
	while(index < length){

		var newChunk = 3 + Math.random() * 12 | 0;
		chunks.push(newChunk);
		
		this.createOneGap(index, newChunk-2);
		this.addClouds(index, 6);

		index+=newChunk; 
		newChunk = 3 + Math.random() * 12 | 0;
		chunks.push(newChunk);
		
		this.generateBlocks(index, newChunk);
	}


	for( var i =0; i < length; i++) {
		var ran = Math.random();
		// var ran2 = 

		if(ran > .4 && ran < .45 ){
			this.tiles[5][i] = 8;// creates some random blocks in the air
		}

	}

	// this.createGap(this.tiles, 24);
	this.makePlatform(this.tiles);

	return this.tiles;
};


LevelGenerator.prototype.generateBlocks = function(startX, length){



	// this.tiles[7][startX] = 7;
	// this.tiles[8][startX+1]  =8 ;

}


LevelGenerator.prototype.applyMask = function(tiles, prob, tilenumber){
	// var noise = 



}




LevelGenerator.prototype.castleLevel = function(rooms){
	var mapsize = rooms *32;
	var tiles = new Array(mapsize);
	for(var i = 0; i< mapsize ;i++){
		tiles[i] = [];
		for(var j = 0; j < mapsize; j++){
			tiles[i].push(0);
		}
	}
	// console.log(tiles);

	return tiles;
}


LevelGenerator.prototype.createPlainLevel = function(tiles, length){

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

LevelGenerator.prototype.plainNoise = function(number){
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

// LevelGenerator.prototype.


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

LevelGenerator.prototype.createOneGap = function(startX, length){

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


LevelGenerator.prototype.createGap = function(tiles, startX, length){
	/*
		Creates a hazard for player to jump over
		options
		small hazard that player can jump over
		small hazard that player must be high up to jump over
		can have a platform over it
		can have a vine thing going up and down
		can have a large platform over
		can have a few blocks scattered over the top
	*/
	var numberOfGaps = Math.round( (Math.random() * 4) +2 ) ;
	var gaps = [];
	var lastGapEndX = 0;
	console.log("====== numberOfGaps = " + numberOfGaps + " ========");

	for(var i = 0; i< numberOfGaps; i++){
		var gapSize = Math.round( (Math.random() * 5 )+ 1 );
		var gapX =  Math.round(( Math.random() * (tiles[0].length - lastGapEndX) ));// +  lastGapEndX;
		
		lastGapEndX = 0 + gapX + gapSize;

		console.log("gap 1 =  " + gapX  + "  - " + lastGapEndX);

		for(var j = gapX; j< gapX + gapSize; j++){
			tiles[this.height-2][j] = themeOptions[this.currentOption].hazard1;
			tiles[this.height-1][j] = themeOptions[this.currentOption].hazard2;
		}

	}

};



LevelGenerator.prototype.addClouds = function(startX, size){
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


LevelGenerator.prototype.triangleThing = function(tiles){
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
	console.log("hig " + height);

	var ranNoise = randomValues(1, height+1);
	// var ranNoise = getRandomNoise(height+1);	
	for(var i = 0; i< height; i++){
		// start at top
		for(var j = startX + (height - i - 1); j < startX + (height + i ); j++ ){ // x 
			tiles[this.groundIndex - height  + i][j] = themeOptions[this.currentOption].breakable; 
			if(Math.random() > .95 && j==middle){
				tiles[this.groundIndex - height  + i][j] = themeOptions[this.currentOption].unbreakable; 
			}
			var x = j - startX - height;
			var noise = ranNoise[i][j-startX];
			if( noise > .95 ){
				tiles[this.groundIndex - height  + i][j] = 9;
				//themeOptions[this.currentOption].unbreakable; 
			}
			// tiles[this.groundIndex -height + i][start + height - 2 ];
		}
	}

}


var randomInt = function(size){
	return Math.round(Math.random() * size);
}


// makes a floating platform in the air
LevelGenerator.prototype.makePlatform = function(tiles){
	var maxPlatformHeight = 4;

	var platformSize = Math.round(Math.random() * 8)  + 2;
	var platformHeight = Math.round(Math.random() * 4) + 2;

	// console.log(platformHeight);
	var platforms = [];
	var start =  Math.round(Math.random() * tiles[0].length- (platformSize * 2)) ;
	if( platformHeight > maxPlatformHeight){
		tiles[this.groundIndex - 2][start++] = this.breakableBlock;
	}

	for(var j = start; j< start+ platformSize; j++){
		var offGround = tiles.length - platformHeight -1;
		// tiles[offGround][j] = this.breakableBlock;
		tiles[offGround][j] = themeOptions[this.currentOption].breakable;
	}
};

var Noise = function(){
	//http://mrl.nyu.edu/~perlin/noise/



}

function randomValues(interval, size){
	var stepsize = 1;
	if(interval > 2){
		stepsize = size / interval;
	}
	var noise = get2dArray(size); // 2d array filled with 0s;
	for(var i = 0; i < size; i++ ){
		for(var j = 0; j < size; j++){
			var sample = Math.random();

			noise[i][j] = sample;
		}
	}
	return noise;
}

function getRandomNoise(size){
	var tiles = randomValues(1, size);
	return smoothSample(tiles);
}

// assumes  n * n 2d array
function smoothSample(noise){
	var size = noise.length;
	var samples = get2dArray(size);

	for(var y = 1; y< size-1; y++){
		for(var x = 1; x < size-1; x++){
			var corners = (noise[y-1][x-1] + noise[y-1][x+1] +
						   noise[y+1][x-1] + noise[y+1][x+1]) / 16;
			var sides =  (noise[y][x-1]   + noise[y][x+1] + noise[y+1][x] + noise[y-1][x] ) /8; 
			var center = noise[y][x] /4;

			samples[y][x] =corners + sides + center;
		}
	}
	return samples;
}


function lerp(a, b, c){
	return (1-t) * a + t*b;

}