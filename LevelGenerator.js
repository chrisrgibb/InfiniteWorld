var LevelGenerator = function(){
	this.height = 12;

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
			tiles[i][j] = 5;
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
		var gapSize = Math.round( (Math.random() * 6 )+ 1 );
		var gapX =  Math.round(( Math.random() * (tiles[0].length - lastGapEndX) ));// +  lastGapEndX;
		
		lastGapEndX = gapX + gapSize;

		console.log("gap 1 =  " + gapX  + "  - " + lastGapEndX);

		for(var j = gapX; j< gapX + gapSize; j++){
			tiles[this.height-2][j] = 0;
			tiles[this.height-1][j] = 0;
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
		tiles[offGround][j] = 1;
	}


};