var Enemy = function(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.image = new Image();
	this.width = 24;
	this.height = 16;
	this.dir = -1;
	this.speed = .3;
	this.blcok = false;
	// this.color = 
}


Enemy.prototype.move = function(first_argument) {
	var dX = this.dir * this.speed;
	if(dX < 0){
		if(map.isBlocking((this.x + dX ) /16 | 0, this.y  /16 | 0 )){
			this.dir *= -1;
			this.blcok = true;

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
	// body...

};

Enemy.prototype.draw = function(camera){
	var drawX = (this.x) - camera.x;
	var drawY = (this.y) - camera.y; 

	ctx.fillStyle = "green";
	ctx.fillRect(drawX, drawY, this.width, this.height);		
}

function isEnemyOnScreen(camera, enemy){
	// console.log(level);
	var xWidth = camera.x + level.mapWidth() * 16;
	// var cameraHeight = (camera.y + level.mapHeight() * 16);
	var cameraHeight = (camera.y + level.screenHeight);
	var eX = enemy.x ;
	var eY = enemy.y ;

	if(eX > camera.x && eX <  xWidth){
		if(eY > camera.y && eY < cameraHeight ){
			
			return true;
		}
		
	}

	return false;
}