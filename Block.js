var Block = function(x, y, breakable, imagePath){
	this.x = x;
	this.y = y;
	this.breakable = breakable;
	this.image = new Image();
	this.image.src = imagePath;
};