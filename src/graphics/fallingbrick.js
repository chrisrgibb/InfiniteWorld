define(['./animation'],function(Animation){

	function createChunk(x, y){
		return {
			x : x,
			y : y,
			dx : 1,
			dy : 1
		};
	}

	function FallingBrick(x, y){
		this.anim1 = new Animation(x + 8, y);
		this.anim2 = new Animation(x - 8, y);
		this.anim3 = new Animation(x + 8, y + 8);
		this.anim4 = new Animation(x - 8, y + 8);
		this.x = x;
		this.y = y;
	}

	FallingBrick.prototype = new Animation();

	FallingBrick.prototype.move = function(){
		this.anim1.move();
		this.anim2.move();
		this.anim3.move();
		this.anim4.move();

		// var speed = 2;
		// this.x += 0.01;
		// this.y += speed;
		// if(this.y > 320){
		// 	this.remove = true;
		// }
	};

	FallingBrick.prototype.draw = function(camera, ctx){
		this.anim1.draw(camera, ctx);
		this.anim2.draw(camera, ctx);
		this.anim3.draw(camera, ctx);
		this.anim4.draw(camera, ctx);
	};

	return FallingBrick;

});