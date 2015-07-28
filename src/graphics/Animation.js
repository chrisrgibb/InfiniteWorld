define(['../game/objects/gameobject'],function(GameObject){

	function Animation(x, y){
		// TODO does nothing right now
		this.image = new Image();
		this.image.src = 'images/particles.png';
		this.x = x;
		this.y = y;
		this.imageWidth = 16;

		this.remove = false;

		this.speed = 1.5;
	}

	Animation.prototype = {
		draw : function(camera, ctx, tick){
			var x = 0; var y = 0;
			var size = this.imageWidth;

			var drawX = ( this.x - camera.x );
			var drawY = ( this.y - camera.y );

			ctx.drawImage(this.image, x, y, size, size, drawX, drawY, size, size);
		},

		move : function() {
			this.x += 0.02;
			this.y += this.speed;
			this.speed += 0.1;
			if(this.y > 320){
				this.remove = true;
			}
		}
	};
	
	return Animation;
});