var Block = function(x, y, breakable, imagePath){
	this.x = x;
	this.y = y;
	this.breakable = breakable;
	if(!imagePath){

	}else {
		this.image = new Image();
		this.image.src = imagePath;
	}
};


function softBlock(x, y, breakable){
	this.x = x;
	this.y = y;
	this.breakable = breakable;
}