function Gap(x, y, width, height){
	// difficulty - how long and blocks
	// does it have feelers coming out of gap
	// 	
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	var levelHeight = 12;
	var topTile = 28;
	var bottomTile = 27;

}

Gap.prototype.create = function(tiles) {
	// var topOfGap = 
	var topTile = 28;
	var bottomTile = 27;

	for(var y = this.y; y < this.y + this.height; y++){
		var tile = y === this.y ? topTile : bottomTile;
		
		for(var x = this.x; x < this.x + this.width; x++){
			tiles.setTile(tile, x, y);
		}
	}

};