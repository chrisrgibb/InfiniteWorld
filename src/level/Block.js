
define(function(){

	var Block = function(x, y, breakable, image, solid){
		this.x = x;
		this.y = y;
		this.breakable = breakable;
		this.image = image;
		this.isSolid = solid;
		this.animated = false;
	};
	
	Block.pinkSkull = 7;
	Block.star = 9;
	Block.question = 8;
	Block.yellowskull = 10;

	return Block;
});