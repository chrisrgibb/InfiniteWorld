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

Enemy.prototype.draw = function(){
	ctx.fillStyle = "green";
	ctx.fillRect(this.x, this.y, this.width, this.height);		


}

function isEnemyOnScreen(camera, enemy){
	// console.log(level);
	var xWidth = camera.x + level.mapWidth() * 16;
	var cameraHeight = (camera.y + level.mapHeight() * 16);

	if(enemy.x > camera.x && enemy.x <  xWidth){
		if(enemy.y > camera.y && enemy.y < cameraHeight ){
			// console.log("isEnemyOnScreen");
		}
		
	}

	return false;
}