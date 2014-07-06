var LevelGenerator = function(){


}

LevelGenerator.prototype.createLevel = function(first_argument) {
	// body...
	var length = 32 + (Math.random() * 128) | 0;
	console.log(length);
	var height = 16;
	var tiles = new Array(16);
	for(var i =0; i< tiles.length; i++){
		tiles[i] = [];
		for(var j = 0; j< length; j++){
			tiles[i].push(0);
		}
	}
	for(var i = 14; i < 16; i++ ){
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
			tiles[14][j] = 0;
			tiles[15][j] = 0;
		}

	}



};

// makes a floating platform in the air
LevelGenerator.prototype.makePlatform = function(tiles){



};