define(function(){

	function Camera(){
		this.x = 0;
		this.y = 0;
		this.minY = 0;
	}

	Camera.prototype = {
		init: function(){
			this.x = 0;
			this.y = 0;
			this.minY = 0;
		},
		update: function(map) {
			var player = Game.player;

			var newY = player.y - CONSTANTS.screenHeight/2 | 0;
			if(newY > this.y){
				this.y = newY;
			}
			var newX = player.x - CONSTANTS.screenWidth/2 | 0;
			if(newX > this.x){
				this.x = newX;
			}
			if(this.y < 0 ){
				this.y = 0;
			}
			if(this.y + CONSTANTS.screenHeight > map.getHeight() * 16){
				this.y = map.getHeight() * 16 - CONSTANTS.screenHeight;
			}

			if(this.x < 0){
				this.x = 0;
			}
			if(this.x + CONSTANTS.screenWidth > map.getWidth() * 16){
				this.x = map.getWidth() * 16 - CONSTANTS.screenWidth;
			}
		},
		isOnScreen : function(enemy) {
			var camera = this;
			var xWidth = (camera.x + CONSTANTS.screenWidth);
			var cameraHeight = (camera.y + CONSTANTS.screenHeight);
			var eX = enemy.x ;
			var eY = enemy.y ;

			if(eX > camera.x && eX <  xWidth) {
				if(eY > camera.y && eY < cameraHeight ) {
					return true;
				}
			}
			return false;
		}
	};

	return new Camera();
});

