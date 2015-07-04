function Triangle (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

}

Triangle.prototype.create = function(tiles) {
	var x, y, 
		width = this.x + this.width, 
		height = this.y + this.height; 
		
	for(var y = this.y; y < height; y++){
		for(var x = this.x; x < width; x++){
			
		}
	}

};