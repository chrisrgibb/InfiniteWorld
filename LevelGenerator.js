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

	return tiles;

};