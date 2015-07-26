define(['../game/objects/gameobject'],function(GameObject){

	function Animation(x, y){
		// TODO does nothing right now
		this.image = new Image();
		this.image.src = 'images/particles.png';
		this.x = x * 16;
		this.y = y * 16;
		this.imageWidth = 16;

		this.remove = false;

	}

	Animation.prototype = new GameObject();

	Animation.prototype.draw = function(camera, ctx){
		var x = 0; var y = 0;
		var size = this.imageWidth;

		var drawX = ( this.x - camera.x );
		var drawY = ( this.y - camera.y );

		ctx.drawImage(this.image, x, y, size, size, drawX, drawY, size, size);
	};

	Animation.prototype.move = function(){
		var speed = 1;
		this.x += 0.01;
		this.y += speed;
		if(this.y > 320){
			this.remove = true;
		}

	};
	
	return Animation;
});