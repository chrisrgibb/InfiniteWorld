function Player(){

	this.x = 40;
	this.y = 100;
	// this.x = 130;
	// this.y = 534;
	this.width = 10;
	this.height= 19;
	this.yVel = 0;
	this.xVel = 0;
	this.speed = 2;
	this.xSpeed = 3;
	this.xspeedIncrease = 0.6;
	this.gravity = .6;
	this.friction = .8;

	this.dir = 1;

	this.jumping = false;
	this.left = false;
	this.right = false;
	this.onGround = false;
	this.canJump = true;
	this.blocked = false;

	this.image = new Image();
	this.image.src = "images/sprite3.png";

	this.jumpTime = 0;
	this.xjumpSpeed = 0;
	this.yjumpSpeed= 0;

	this.xx =0;
	this.yy = 0;

	this.frameIndex = 0;
}


Player.prototype.move = function(first_argument) {
	var dX = 0, dY = 0;

	if(this.left){
		if(this.xVel > 0){
			this.xVel = 0;
			this.dir = -1;
		}

		if(this.xVel > -this.xSpeed){
			this.xVel-=this.xspeedIncrease;;
		}
		// dX = this.xVel;
		// dX-=this.xspeedIncrease;
	}else if( keys["right"]){

		if(this.xVel< 0){
			this.xVel = 0;
			this.dir = 1;
		}
		if(this.xVel < this.xSpeed){
			// this.xVel ++;
			this.xVel+=this.xspeedIncrease;
		}
		// dX = this.xVel;	
		// dX+=this.xspeedIncrease;	
	}
	if ( keys["jump"] ){
		if(!this.jumping && this.canJump){		
			if(this.onGround){
				this.canJump = false;
				this.yVel = -5;
				this.jumping = true;
				this.onGround = false;	
				if(this.xVel > 0){
					// this.
				}
	
			}
		} else if(this.jumping && this.yVel < 0 ){ // going up
			this.yVel -= .4;

		}
	}else{
		this.jumpTime = 0;
	}
	if( Math.abs(this.xVel) < 0.5){
		// this.xVel = 0;
	}

	dX = this.xVel;	


	// var tempX = this.x;
	var tempY = this.y;
	var tempX = this.x;


	this.yVel += this.gravity;	
	dY = this.yVel;
	if(dY > 4){
		dY = 4;
	}
	if(dY < -5){
		dY = -5;
	}
	this.xVel *= this.friction;

	// if(this.onGround){
	// 	dX *= .54;
	// 	this.xVel *= this.friction;
	// }
	if(dY!=0.6){
		console.log(dY);
	}

	// this.yy = dY;
	// this.xx = dX;

	// var tempX = this.moveX(this.xx, this.yy);
	// var tempY = this.moveY(this.xx, this.yy);


	// this.x = tempX;
	// this.y = tempY;


	this.x = this.moveX(dX, dY);
	this.y = this.moveY(dX, dY);

	if(!keys["down"] && keys["punch"]){
		this.punchDetection();
		// this.height = this.height/2;
	}else{
		// this.height = this.height * 2;
		// this.height = 19;
	}


	// check left of screen
	if(this.x-(this.width/2) < 0){
		this.x = 0 + (this.width/2);
	}
	// check right of screen
	if(this.x+(this.width/2) > level.mapWidth()*16){
		this.x = (level.mapWidth()*16)- (this.width/2);
	}
	// check bottom of screen
	if(this.y + (this.height/2) > level.mapHeight()*16){
		this.y = (level.mapHeight()*16)-(this.height/2);
	}
}

Player.prototype.punchDetection = function(){
	//ctx.fillRect(this.x + ( this.width/2 * this.dir  ), this.y - this.height/2 +4, 8 * this.dir, 10 );
	
	var punchX = (this.x + (this.width/2 * this.dir) + (8 * this.dir) ) / 16 | 0;
	var tile = map.getTile(punchX, this.y/ 16 | 0);

	map.punchTile(punchX, this.y/ 16 | 0);
	// console.log(tile);



}


Player.prototype.moveX = function(dX, dY){
	var tempX = this.x; 
	if( dX> 0){
		//moving right
		var nextX = this.x + dX + (this.width/2); // the nextX 
		var ax =  nextX / 16 | 0; // the index of the next tile 
		var yTop = (1 + this.y - this.height/2) / 16 | 0;
		var yBotttom = (-1 + this.y + this.height/2) / 16 | 0;
		
		if(nextX===tempX){
			return;
		}

		var tileX2 = map.isBlocking(ax, yBotttom);
		var tileX1 = map.isBlocking(ax, yTop);

		// For DEBUGGINS
		if(tileX1 ) {
			level.addToHighLights(ax, yTop, "#FDB1B1");
		}
		if( tileX2 ) {
			level.addToHighLights(ax, yBotttom, "#FDB1B1");
		}

		if(tileX1 || tileX2){ // collision
			tempX = (ax * 16) - (this.width/2);
			// this.xVel = 0;
			this.xx = 0;
			
		}else{
			tempX =this.x +dX;
		}
	}else if( dX <0){
		//moving left
		var nextX = this.x + dX - (this.width/2) ;
		var ax = nextX / 16 | 0; // index of the tile to the left

		var yTop = 	   	(1 + this.y - this.height/2) / 16 | 0; 
		var yBotttom = 	(-1 + this.y + this.height/2) / 16 | 0;


		var tileX2 = map.isBlocking(ax, yBotttom);
		var tileX1 = map.isBlocking(ax, yTop);

		if(tileX1) {
			level.addToHighLights(ax, yTop, "#9BF0E9");
		}
		if( tileX2) {
			level.addToHighLights(ax, yBotttom, "#9BF0E9");
		}

		if(tileX1 || tileX2 ){ 
			tempX = ( (ax+1) * 16) + (this.width/2) ; // 
			this.xx = 0;
		}else { 
			tempX = this.x + dX;
		}
	}	

	return tempX;
}


Player.prototype.moveY = function(dX, dY){
	var tempY = this.y;

	if(this.jumping && dY < 0 ){

		var ay = (this.y -(this.height/2) + dY ) /16 | 0;

		var left  = (  1 + this.x - (this.width/2)  )/16   | 0;
		var right = ( -1 + this.x + (this.width/2)  )/16   | 0;

		var leftTile  = map.isBlocking(left, ay);
		var rightTile = map.isBlocking(right, ay );

		if(leftTile) {
			level.addToHighLights(left, ay, "#9BF0E9");
		}
		if( rightTile) {
			level.addToHighLights(right, ay, "#9BF0E9");
		}

		if(leftTile || rightTile){
			tempY = ( (ay+1) * 16) + (this.height/2) + 1;
			this.yVel = 0;
			dY = 1; // so we don't get stuck under block
			return tempY;
		} else {
			tempY += dY;
		}
	}

	// check down collisions

	else {
		var ay = (this.y +(this.height/2) + dY) / 16 | 0;

		
		var left = (this.x - (this.width/2)  +1 )     /16  | 0;
		var right = (this.x + (this.width/2) - 1 ) /16   | 0;


		var leftTile  = map.isBlocking(left, ay);
		var rightTile = map.isBlocking(right, ay ); // the minus for is 


		if(leftTile) {
			level.addToHighLights(left, ay, "#EDE5E2");
		}
		if( rightTile) {
			level.addToHighLights(right, ay, "#EDE5E2");
		}

		if((leftTile || rightTile )   ) {
			// hit the ground
			tempY = (ay * 16) - (this.height/2);

			this.onGround = true;
			this.jumping = false;
			if(!keys["jump"]){
				this.canJump = true;
			}
			this.yVel = 0;
		}else {
			// must be falling
			this.onGround = false;
			tempY = this.y + dY;
		}
	}

	return tempY;
}


Player.prototype.draw = function(ctx) {
	// var frame = this.counter  % 4;
	// var frame = this.frameIndex % 4 ;


	ctx.fillStyle = "red";
	if(keys["down"]){
		ctx.fillRect(this.x - this.width/2 - level.camera.x, this.y  - (level.camera.y  ) , this.width, this.height/2);
	}else{
		ctx.fillRect(this.x - this.width/2- level.camera.x, this.y - this.height/2 - (level.camera.y  ) , this.width, this.height);
	}
	// draw rectangle shape of fist of doom
	if(keys["punch"]){
		ctx.fillRect(this.x + ( this.width/2 * this.dir  ) - level.camera.x, this.y - this.height/2 +4 - level.camera.y, 8 * this.dir, 10 );
	}

	var frame = 1;
	if ( this.dir==1){
		frame = 1;
	}else {
		frame = 0;
	}


	if (this.xVel > 0 || this.xVel < 0) {
		this.frameIndex+=Math.abs(this.xVel);
		// frame = (this.frameIndex/4 | 0)  % 4;

	}
	ctx.drawImage(this.image, frame*16, 0, 16, 24, this.x - this.width - level.camera.x + 2, this.y - this.height/2  - level.camera.y - 4, 16, 24);
	
};