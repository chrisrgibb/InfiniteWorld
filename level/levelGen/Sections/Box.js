function Box(x, y, width, height){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
}


Box.prototype.create = function(tiles) {
	for(var y = this.y; y < this.y + this.height; y++){
		for(var x = this.x; x < this.x + this.width; x++){
			tiles.setTile(11, x, y);
		}
	}
};
