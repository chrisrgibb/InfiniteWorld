define(['../../graphics/enemySheet'],function(enemySheet){

	var Enemy = function(x, y){
		this.width = 24;
		this.height = 16;

		this.x = (this.width / 2) + x * 16;
		this.y = y * 16 + (this.height / 2);
		this.image = new Image();
		
		this.dir = -1;
		this.speed = 0.4;
		
		this.block = false;
		this.color = "#adad03";

		this.imageWidth = 24;
		this.imageHeight = 16;

		this.frameCount = 0;
		this.currentFrame = 0;

		this.imagesrc = {
			x : 0,
			y : 17
		};
	};

	Enemy.prototype = {
		move : function(levelState) {
			var dX = this.dir * this.speed;
			// TODO fix
			var map = levelState.map;
			if(dX < 0){
				// going left
				if(map.isBlocking((this.x + dX - (this.width/2)) /16 | 0, this.y  /16 | 0 )){
					this.dir *= -1;
					this.block = true; // ???
				}
			} else if(dX > 0){
				// going right
				if(map.isBlocking( (this.x + (this.width/2) + dX ) / 16 | 0, this.y  / 16 | 0)){
					this.dir *= -1;
				}
			}
			this.x += dX;
			if(this.x < 0 ){
				this.dir *= -1;
				this.x = 2;
			}
		},
		
		draw : function(camera, ctx, tick){

			var drawX = (this.x) - camera.x - this.width / 2;
			var drawY = (this.y) - camera.y - this.height / 2;

			// this.counter = 0;

			if(tick % 12 === 0){
				this.frameCount++;
				if(this.frameCount > 1){
					this.frameCount = 0;
				}
			}
		

			this.imagesrc.x = this.frameCount * this.width;

			enemySheet.draw(this.imagesrc, drawX, drawY, this.width, this.height);		
		}
	};
	return Enemy;


});

function isOnScreen(camera, enemy){
	var xWidth = (camera.x + CONSTANTS.screenWidth);
	var cameraHeight = (camera.y + CONSTANTS.screenHeight);
	var eX = enemy.x ;
	var eY = enemy.y ;

	if(eX > camera.x && eX <  xWidth){
		if(eY > camera.y && eY < cameraHeight ){
			return true;
		}
	}
	return false;
}




var hasGP = false;

