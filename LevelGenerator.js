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
	this.currentOption = "one";
	this.groundIndex = 10; 
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
	// body...
	var length = 32 + (Math.random() * 128) | 0;
	var EndingX = length - randomInt(3); // area to put the rice ball / hamburger
	console.log(length);

	// var chunks = length / randomInt(32) | 0;

	var chunks = [];
	
	var tiles = new Array(this.height);
	this.createPlainLevel(tiles, length);


	for( var i =0; i < length; i++) {
		var ran = Math.random();
		// var ran2 = 

		if(ran > .4 && ran < .6 ){
			tiles[5][i] = 8;// creates some random blocks in the air
		}
	}

	this.createGap(tiles, 24);
	this.makePlatform(tiles);

	return tiles;
};

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
	// var tiles = new Array(this.height);
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



LevelGenerator.prototype.addClouds = function(tiles){
	var numberOfClouds = randomInt(10)+1;

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
			if(j==middle){
				tiles[this.groundIndex - height  + i][j] = themeOptions[this.currentOption].unbreakable; 
			}
			var x = j - startX - height;
			var noise = ranNoise[i][j-startX];
			if( noise > .9 ){
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