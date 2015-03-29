function Gap(x, y, width, height, difficulty){
	// difficulty - how long and blocks
	// does it have feelers coming out of gap
	// 	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.difficulty = difficulty || 1; 

	var levelHeight = 12;
	var topTile = 28;
	var bottomTile = 27;

}

Gap.prototype.create = function(tiles) {
	this.createGap(tiles);

};


Gap.prototype.createGap = function(tiles){
	var topTile = 28;
	var bottomTile = 27;

	for(var y = this.y; y < this.y + this.height; y++){
		var tile = y === this.y ? topTile : bottomTile;
		
		for(var x = this.x; x < this.x + this.width; x++){
			tiles.setTile(tile, x, y);
		}
	}

}

Gap.prototype.createPlatforms = function(tiles, noise){
	var x = this.x,
		width = this.x + this.width;
	var height = noise.nextInt(10 - this.height , 9);
	
	while(x < width){
		var placing = noise.nextInt(0, 4);
		// place blocks
		x += placing;
		tiles.setTile(11, x, 8 );
	
	}

}