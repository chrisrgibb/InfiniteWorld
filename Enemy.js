var Enemy = function(x, y){
	this.x = x;
	this.y = y;
	this.image = new Image();
	this.width = 24;
	this.height = 16;
}


Enemy.prototype.move = function(first_argument) {
	// body...

};

Enemy.prototype.draw = function(camera){
	var drawX = (this.x * 16) - camera.x;
	var drawY = (this.y * 16) - camera.y; 

	ctx.fillStyle = "green";
	ctx.fillRect(drawX, drawY, this.width, this.height);		
}

function isEnemyOnScreen(camera, enemy){
	// console.log(level);
	var xWidth = camera.x + level.mapWidth() * 16;
	// var cameraHeight = (camera.y + level.mapHeight() * 16);
	var cameraHeight = (camera.y + level.screenHeight);
	var eX = enemy.x * 16;
	var eY = enemy.y * 16;

	if(eX > camera.x && eX <  xWidth){
		if(eY > camera.y && eY < cameraHeight ){
			// console.log("isEnemyOnScreen");
			console.log("on scree");
			return true;
		}
		
	}

	return false;
}