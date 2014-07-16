var Block = function(x, y, breakable, image, solid){
	this.x = x;
	this.y = y;
	this.breakable = breakable;
	this.image = image;
	this.isSolid = solid;
};

function softBlock(x, y, breakable, image){
	this.x = x;
	this.y = y;
	this.breakable = breakable;
	this.image = image;
}