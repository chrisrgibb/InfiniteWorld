define(function(){

	var Enemy = function(x, y){
		this.x = x * 16;
		this.y = y * 16;
		this.image = new Image();
		this.width = 24;
		this.height = 16;
		this.dir = -1;
		this.speed = 0.3;
		this.block = false;
		this.color = "#adad03";
		this.imageWidth = 24;
		this.imageHeight = 16;
	};

	Enemy.prototype = {
		move : function() {
			var dX = this.dir * this.speed;
			// TODO fix
			var map = Game.levelState.map;
			if(dX < 0){
				if(map.isBlocking((this.x + dX ) /16 | 0, this.y  /16 | 0 )){
					this.dir *= -1;
					this.block = true; // ???
				}
			} else if(dX > 0){
				if(map.isBlocking( (this.x + this.width + dX ) / 16 | 0, this.y  / 16 | 0)){
					this.dir *= -1;
				}
			}
			this.x += dX;
			if(this.x < 0 ){
				this.dir *= -1;
				this.x = 2;
			}
		},
		
		draw : function(camera, ctx){

			var drawX = (this.x) - camera.x;
			var drawY = (this.y) - camera.y; 

			ctx.fillStyle = this.color;
			ctx.fillRect(drawX, drawY, this.width, this.height);		
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

