define(['./animation'],function(Animation){



	function Cloud(x, y){
		this.image = new Image();
		this.image.src = 'images/particles.png';
		this.x = x;
		this.y = y;
		this.timer = 0;
		this.imageWidth = 16;
		this.remove = false;
		this.duration = 20;
	}

	Cloud.prototype = {

		move : function(){
			this.timer++;
			if(this.timer > this.duration){
				this.remove = true;
			}
		},

		draw : function(camera, ctx, tick){
			var x = (this.timer < this.duration / 2 ?  2  : 3 ) * 16;
			var y = 0;
			var size = 16;

			var drawX = (this.x) - camera.x - this.imageWidth / 2;
			var drawY = (this.y) - camera.y - this.imageWidth / 2;

			ctx.drawImage(this.image, x, y, size, size, drawX, drawY, size, size);
		}
	};

	return Cloud;
});