function Platform(x, y, width){
	this.x = x;
	this.y = y;
	this.width = width;
	// this.length = length;
}

Platform.prototype.create = function(tiles) {
	for(var x = this.x; x < this.width + this.x; x++){
		tiles.setTile(11, x, this.y);
	}
};