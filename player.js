function Player(){

	this.x = 5;
	this.y = 6;
	this.width = 10;
	this.height= 19;
	this.yVel = 0;
	this.xVel = 0;
	this.speed = 4;
	this.xSpeed = 3;
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
	this.image.src = "images/spritex2.png";

	this.jumpTime = 0;
	this.xjumpSpeed = 0;
	this.yjumpSpeed= 0;
}


Player.prototype.move = function(first_argument) {
	var dX = 0, dY = 0;

	if(this.left){
		if(this.xVel > 0){
			this.xVel = 0;
			this.dir = -1;
		}

		if(this.xVel > -this.xSpeed){
			this.xVel --;
		}
		dX = this.xVel;
	}else if( keys["right"]){

		if(this.xVel< 0){
			this.xVel = 0;
			this.dir = 1;
		}
		if(this.xVel < this.xSpeed){
			this.xVel ++;
		}
		dX = this.xVel;		
	}
	if ( keys["jump"] ){
		if(!this.jumping && this.canJump){		
			if(this.onGround){
				this.canJump = false;
				this.yVel = -6;
				this.jumping = true;
				this.onGround = false;	
	
			}
		} else if(this.jumping && this.yVel < 0 ){ // going up
			this.yVel -= .35;

		}
	}else{
		this.jumpTime = 0;
	}

	var tempX = this.x;
	var tempY = this.y;


	this.yVel += this.gravity;	
	dY = this.yVel;


	// check up collisions 

	// if(this.jumping ){

	// 	var ay = (this.y -(this.height/2) + dY ) /16 | 0;

	// 	var left  = (  1 + this.x - (this.width/2)  )/16   | 0;
	// 	var right = ( -1 + this.x + (this.width/2)  )/16   | 0;

	// 	var leftTile  = map.isBlocking(left, ay);
	// 	var rightTile = map.isBlocking(right, ay );

	// 	if(leftTile) {
	// 		level.addToHighLights(left, ay, "#9BF0E9");
	// 	}
	// 	if( rightTile) {
	// 		level.addToHighLights(right, ay, "#9BF0E9");
	// 	}

	// 	if(leftTile || rightTile){
	// 		tempY = ( (ay+1) * 16) + (this.height/2) + 2;
	// 		this.yVel = 0;
	// 		dY = 1; // so we don't get stuck under block
	// 	}
	// }

	// // check down collisions

	// 	var nextY = this.y + dY - (this.height/2);
	// 	var ay = (this.y +(this.height/2) + dY) / 16 | 0;

		
	// 	var left = (this.x - (this.width/2)  +1 )     /16  | 0;
	// 	var right = (this.x + (this.width/2) - 1 ) /16   | 0;


	// 	var leftTile  = map.isBlocking(left, ay);
	// 	var rightTile = map.isBlocking(right, ay ); // the minus for is 


	// 	if(leftTile) {
	// 		level.addToHighLights(left, ay, "#EDE5E2");
	// 	}
	// 	if( rightTile) {
	// 		level.addToHighLights(right, ay, "#EDE5E2");
	// 	}


	// 	if((leftTile || rightTile )   ) {
	// 		// hit the ground
	// 		tempY = (ay * 16) - (this.height/2);

	// 		this.onGround = true;
	// 		this.jumping = false;
	// 		if(!keys["jump"]){
	// 			this.canJump = true;
	// 		}
	// 		this.yVel = 0;
	// 	}else  {
	// 		// must be falling
	// 		this.onGround = false;
	// 		tempY = this.y + dY;
	// 	}

		// if( dX> 0){
		// 	//moving right
		// 	var nextX = this.x + dX + (this.width/2); // the nextX 
		// 	var ax =  nextX / 16 | 0; // the index of the next tile 
		// 	var yTop = (3 + this.y - this.height/2) / 16 | 0;
		// 	var yBotttom = (-3 + this.y + this.height/2) / 16 | 0;
			

		// 	var tileX2 = map.isBlocking(ax, yBotttom);
		// 	var tileX1 = map.isBlocking(ax, yTop);

		// 	// For DEBUGGINS
		// 	if(tileX1 ) {
		// 		level.addToHighLights(ax, yTop, "#FDB1B1");
		// 	}
		// 	if( tileX2 ) {
		// 		level.addToHighLights(ax, yBotttom, "#FDB1B1");
		// 	}

		// 	if(tileX1 || tileX2){ // collision
		// 		tempX = (ax * 16) - (this.width/2) ;
		// 		// this.xVel = 0;
				
		// 	}else{
		// 		tempX =this.x +dX;
		// 	}
		// }else if( dX <0){
		// 	//moving left
		// 	var nextX = this.x + dX - (this.width/2) ;
		// 	var ax = nextX / 16 | 0; // index of the tile to the left

		// 	var yTop = (3 + this.y - this.height/2) / 16 | 0; 
		// 	var yBotttom = (-3 + this.y + this.height/2) / 16 | 0;


		// 	var tileX2 = map.isBlocking(ax, yBotttom);
		// 	var tileX1 = map.isBlocking(ax, yTop);

		// 	if(tileX1) {
		// 		level.addToHighLights(ax, yTop, "#9BF0E9");
		// 	}
		// 	if( tileX2) {
		// 		level.addToHighLights(ax, yBotttom, "#9BF0E9");
		// 	}

		// 	if(tileX1 || tileX2 ){ 
		// 		tempX = ( (ax+1) * 16) + (this.width/2) ; // 
		// 	}else { 
		// 		tempX = this.x + dX;
		// 	}
		// }	

	// this.y = tempY;
	// this.x = tempX;
	this.y = this.moveY(dX, dY);
	this.x = this.moveX(dX, dY);


	if(!keys["down"] && keys["punch"]){


	}else{
		

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


Player.prototype.moveX = function(dX, dY){
	var tempX = this.x; 
	if( dX> 0){
		//moving right
		var nextX = this.x + dX + (this.width/2); // the nextX 
		var ax =  nextX / 16 | 0; // the index of the next tile 
		var yTop = (3 + this.y - this.height/2) / 16 | 0;
		var yBotttom = (-3 + this.y + this.height/2) / 16 | 0;
		

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
			tempX = (ax * 16) - (this.width/2) ;
			// this.xVel = 0;
			
		}else{
			tempX =this.x +dX;
		}
	}else if( dX <0){
		//moving left
		var nextX = this.x + dX - (this.width/2) ;
		var ax = nextX / 16 | 0; // index of the tile to the left

		var yTop = (3 + this.y - this.height/2) / 16 | 0; 
		var yBotttom = (-3 + this.y + this.height/2) / 16 | 0;


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
		}else { 
			tempX = this.x + dX;
		}
	}	

	return tempX;
}


Player.prototype.moveY = function(dX, dY){
	var tempY = this.y;

	if(this.jumping ){

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
			tempY = ( (ay+1) * 16) + (this.height/2) + 2;
			this.yVel = 0;
			dY = 1; // so we don't get stuck under block
		}
	}

	// check down collisions

		var nextY = this.y + dY - (this.height/2);
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
		}else  {
			// must be falling
			this.onGround = false;
			tempY = this.y + dY;
		}
	return tempY;
}


// function not actually used
Player.prototype.collisions = function(x, y, dx, dy){
	var collide = false;
	var w = (this.width/2) | 0;
	var h = (this.height/2 ) | 0;
	var tempX = this.x + dx;
	var tempY = this.y + dy;
	if(dx > 0){
		// going right
		if(this.isBlocking(this.x + dx + w, this.y + h)){
			// top
			collide = true;
		}else if (this.isBlocking(this.x + dx + w, this.y - h)) {
			// bottom 
			collide = true
		}
		if(collide){
			tempX = (((this.x + w) / 32 + 1) | 0 ) * 16  -1;
		} 
	}else if(dx < 0){
		if(this.isBlocking(this.x + dx - w, this.y + h)){
			collide =true;
		}else if(this.isBlocking(this.x + dx - w, this.y - h)) {
			collide =true;
		}
		if(collide){
			tempX = (((this.x - w) / 32) | 0 ) * 32 + w;
		} 
	}
	if(dy > 0){
		// going down
		if(this.isBlocking(this.x + w, this.y + dy + h)){
			collide = true;
		} else if( this.isBlocking(this.x - w, this.y + dy + h)){
			collide = true;
		}
		if ( collide ) {
			// tempY = ((this.y - h) / 32) | 0 ) * 32 
		}
	}
}

Player.prototype.isBlocking = function(xx, yy){
	var x = xx / 32 | 0;
	var y = yy / 32 | 0;
	var block = map.isBlocking(x, y);
	return block==1;
}


Player.prototype.collisionRight = function(){
	var ax = this.x / 32 | 0;
	var ay = this.y /32 | 0;
	return map.isBlocking(ax, ay)==1;

};

Player.prototype.draw = function(ctx) {
	// var frame = this.counter  % 4;
	// var frame = this.frameIndex % 4 ;


	ctx.fillStyle = "red";
	if(keys["down"]){
		ctx.fillRect(this.x - this.width/2, this.y, this.width, this.height/2);
	}else{
		ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
	}
	if(keys["punch"]){
		ctx.fillRect(this.x + ( this.width/2 * this.dir  ), this.y - this.height/2 +4, 8 * this.dir, 10 );
	}

	var frame = 4;
	// ctx.drawImage(this.image, frame*32, 0, 32, 48, this.x - this.width, this.y - this.height/2, this.height, this.height);
	
};