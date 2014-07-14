var LevelGenerator = function(){
	this.height = 12;
	this.groundTile = 18;
	this.obsticleTile1 = 24;
	this.obsticleTile2 = 23;
	this.breakableBlock = 11;
	this.unBreakableBlcok = 12;
	this.currentOption = "two";
}


// var options = {
// 	"one" : [18, 24, 23, 11, 12],
// 	"two" : [13, 24, 23, 21, 20]

// }
var options = {
	"one" : {
		"groundTile" : 18,
		"pitTile1" : 23,
		"pitTile2" : 22,
		"breakable" : 11,
		"unbreakable" : 12
	},
	"two" : {
		"groundTile" : 13,
		"pitTile1" : 29,
		"pitTile2" : 27,
		"breakable" : 21,
		"unbreakable" : 20

	}

}

LevelGenerator.prototype.createLevel = function(first_argument) {
	// body...
	var length = 32 + (Math.random() * 128) | 0;
	console.log(length);
	
	var tiles = new Array(this.height);
	for(var i =0; i< tiles.length; i++){
		tiles[i] = [];
		for(var j = 0; j< length; j++){
			tiles[i].push(0);
		}
	}
	for(var i = this.height -2; i < this.height; i++ ){
		for(var j =0; j< length; j++){
			tiles[i][j] = options[this.currentOption].groundTile;
		}	
	}

	for( var i =0; i < length; i++) {
		var ran = Math.random();
		// var ran2 = 

		if(ran > .4 && ran < .6 ){
			tiles[5][i] = 8;
		}
	}

	this.createGap(tiles);
	this.makePlatform(tiles);

	return tiles;
};


LevelGenerator.prototype.createGap = function(tiles){
	var numberOfGaps = Math.round( (Math.random() * 4) +2 ) ;
	var gaps = [];
	var lastGapEndX = 0;
	console.log("====== numberOfGaps = " + numberOfGaps + " ========");

	for(var i = 0; i< numberOfGaps; i++){
		var gapSize = Math.round( (Math.random() * 5 )+ 1 );
		var gapX =  Math.round(( Math.random() * (tiles[0].length - lastGapEndX) ));// +  lastGapEndX;
		
		lastGapEndX = gapX + gapSize;

		console.log("gap 1 =  " + gapX  + "  - " + lastGapEndX);

		for(var j = gapX; j< gapX + gapSize; j++){
			tiles[this.height-2][j] = options[this.currentOption].pitTile1;
			tiles[this.height-1][j] = options[this.currentOption].pitTile2;
		}

	}

};

LevelGenerator.prototype.addClouds = function(tiles){
	var numberOfClouds = randomInt(10)+1;

}

LevelGenerator.prototype.randomInt = function(size){
	return Math.round(Math.random() * size);
}


// makes a floating platform in the air
LevelGenerator.prototype.makePlatform = function(tiles){
	var platformSize = Math.round(Math.random() * 8)  + 2;
	var platformHeight = Math.round(Math.random() * 4) + 2;
	var platforms = [];
	var start =  Math.round(Math.random() * tiles[0].length- (platformSize * 2)) ;

	for(var j = start; j< start+ platformSize; j++){
		var offGround = tiles.length - platformHeight -1;
		// tiles[offGround][j] = this.breakableBlock;
		tiles[offGround][j] = options[this.currentOption].breakable;
	}


};

var Noise = function(){



}