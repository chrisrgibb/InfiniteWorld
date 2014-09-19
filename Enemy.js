var Enemy = function(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.image = new Image();
	this.width = 24;
	this.height = 16;
	this.dir = -1;
	this.speed = .3;
	this.block = false;
	this.color = "#adad03";
	this.imageWidth = 24;
	this.imageHeight = 16;
}


Enemy.prototype.move = function(first_argument) {
	var dX = this.dir * this.speed;
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
};

Enemy.prototype.draw = function(camera){
	var drawX = (this.x) - camera.x;
	var drawY = (this.y) - camera.y; 

	ctx.fillStyle = this.color;
	ctx.fillRect(drawX, drawY, this.width, this.height);		
};

function isOnScreen(camera, enemy){
	var xWidth = (camera.x + level.screenWidth);
	var cameraHeight = (camera.y + level.screenHeight);
	var eX = enemy.x ;
	var eY = enemy.y ;

	if(eX > camera.x && eX <  xWidth){
		if(eY > camera.y && eY < cameraHeight ){
			return true;
		}
	}

	return false;
};




function Scorpion(x, y){
	// Enemy.call(this);
	this.color = '#ff0303';
	this.x = x * 16;
	this.y = y * 16 + 2;
	this.width = 13;
	this.height = 14;
	var g = true;

	// gets moved down vertically until it reaches ground
	// while(g){

	// 	if(!levelState.map.isBlocking( (this.x) / 16 | 0,  (this.y / 16 | 0 )   +1  )){
	// 		this.y += 16;
	// 	}else{
	// 		g = false;
	// 	}
	// }
}

Scorpion.prototype = new Enemy();

Scorpion.prototype.move = function(){
	
	var dX = this.dir * this.speed;
	if(dX < 0){
		if(map.isBlocking((this.x + dX ) /16 | 0, this.y  /16 | 0 )/* or if scorpion is about to fall off block */ ){
			this.dir *= -1;
			this.block = true;

		}
		// stop the scorpion from going off edge of block		
		if(!map.isBlocking((this.x + dX) / 16 | 0, (this.y / 16 | 0 )+1)){
			this.dir = 1
		}

	} else if(dX > 0){
		if(map.isBlocking( (this.x + this.width + dX ) / 16 | 0, this.y  / 16 | 0)){
			this.dir *= -1;
		}
			// stop the scorpion from going off edge of block
		if(!map.isBlocking((this.x + dX + this.width) / 16 | 0,   (this.y / 16 | 0 )+1       )	){
			this.dir = -1
		}
	}
	this.x += dX;
	// stop going off edge of screen
	if(this.x < 0 ){
		this.dir *= -1;
		this.x = 2;
	}
};

