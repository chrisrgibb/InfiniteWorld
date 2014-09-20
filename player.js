function Player(){

	/*
		Need to fix players movement in the air
	*/

	this.x = 40;
	this.y = 100;

	this.width = 10;
	this.height= 19;
	this.duckingheight = 10;
	this.yVel = 0;
	this.xVel = 0;
	this.xSpeed = 2;
	this.xspeedIncrease = 0.15625;
	this.gravity = .25;
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
	this.startYvel = 0;
	this.startXvel = 0;

	this.jumpingXSpeed = 0;

	this.jumpStart = -1;

	this.punchTime = 0;
	this.canPunch = true;

	this.yy = 0;
	// for animation
	this.frameIndex = 0;
	this.counter =0;

	this.money = 0;
	this.inventory = new Inventory();
	this.shockwaveOnscreen = false;
	this.braceletActivated = false;
	this.oldYvel =0;

	this.maxJumpReached = false;
}

Player.prototype.moveDir = function(dir){
	var absX = Math.abs(this.xVel);
	if(this.onGround){
		if(absX > this.xSpeed){
			absX += this.xspeedIncrease;
		}
	} else {
		if(Math.abs(this.startXvel)>0){
			if(absX > this.xSpeed){
				absX += this.xspeedIncrease;
			}
		} else {
			if(absX < this.xSpeed){
				absX+=.0825;
			}
		}
	}
	return dir * absX;
}

Player.prototype.move = function(first_argument) {

	var dX = 0, dY = 0;


	if ( keys["jump"] ){
			
		if(!this.jumping && this.canJump){		
			if(this.onGround){
				this.startXvel = this.xVel;
				this.maxJumpReached  = false;
				this.jumpStart = this.y;
				
				this.canJump = false;

				if(keys["left"] || keys["right"] ){
					// if moving give an extra little boost
					this.yVel = -2.25;
					this.startYvel = -2.750; //
					this.jumpTime =  21 + Math.abs(this.xVel)/2;// magic numbers
					this.jumpingXSpeed = this.xVel;
				}else{	
					this.jumpTime = 22;
					this.yVel = -2.25;
					this.startYvel = -2.25;
				}
				this.jumping = true;
				this.onGround = false;	
				
			}
		} else {
			// now player is in mid air
			if(this.jumpTime > 0){
				this.yVel = this.startYvel;
			} else{
				this.yVel += 0.105;
			}
			this.jumpTime--;

		}
	}else{
		this.yVel += .105;
		this.jumpTime = 0;
	}

	debug.setText(this.xVel);
	if(this.left){
		//if player is on ground 
		if(this.onGround){
			// stop moving
			if(this.xVel > 0){
				this.xVel = 0;
			}
			// move left
			if(this.xVel > -this.xSpeed){
				this.xVel-=this.xspeedIncrease;
			}
		} else {
			// in air
			if(this.startXvel<0){
				if(this.xVel > -this.xSpeed){
					this.xVel-=this.xspeedIncrease;
				}
			}
			// changin direction
			if(this.startXvel >= 0){
				if(this.xVel > -this.xSpeed){
					this.xVel -= .0825;
				}
				// was going right
			}
		}
	
		this.dir = -1;

		console.log(this.moveDir(this.dir) + "  " + this.xVel);
		// this.xVel =this.moveDir(this.dir);

	} 
	else if( this.right) {

		if(this.onGround){
			if(this.xVel< 0){
				this.xVel = 0;
			}
			// move left
			if(this.xVel < this.xSpeed){
				this.xVel+=this.xspeedIncrease;
			}
		} else {
			// in air
			if(this.startXvel>0){
				if(this.xVel < this.xSpeed){
					this.xVel+=this.xspeedIncrease;
				}
			}
			// changin direction
			if(this.startXvel <= 0){
				if(this.xVel < this.xSpeed){
					this.xVel += .0825;
					// was going right
				}
			}
		}
		this.dir = 1;
	} else {
		// nothing is pressed so slow down

		if(this.xVel > 0){
			if(this.onGround){
				this.xVel -= this.xspeedIncrease;
			}
		
		} 
		if(this.xVel < 0){
			if (this.onGround)
				this.xVel += this.xspeedIncrease;
			if(this.xVel > 0){
				this.xVel = 0;
			}

		}
	}

	// round down to zero
	if( Math.abs(this.xVel) < 0.01){
		this.xVel = 0;
	}


	if(COUNTER % 6 ==0){
		this.counter++;
		if(this.counter > 3){
			this.counter =0 ;
		}
	} 	

	this.calcGravity();	
	this.calcFriction();
	dX = this.xVel;	
	dY = this.yVel;

	if(!keys["down"] && keys["punch"] && this.punchTime==0 && this.canPunch){
		// start of punch

		this.punchDetection();
		this.punchTime = 8;
		this.canPunch = false;
		if(this.onGround){
			dX = 0;
			this.xVel = 0;
		}
	}else{
		if(this.punchTime > 0){

			this.punchTime--;
			if(this.onGround){
				dX = 0;
				this.xVel = 0;
			}
			if (this.braceletActivated ) {
				if (!this.shockwaveOnscreen){
					levelState.fireShockwave(this); // creates a new shockwave thing onscreen
	 				this.shockwaveOnscreen = true; // true while on screen
	 				
 				}
 				// if (this.onGround && this.xVel==0){
	 			// 		this.punchTime+= 1;
	 			// }
			}
		}else if(!keys["punch"]){
			this.canPunch = true;
		}
	}

	this.x = this.moveX(dX, dY);
	this.y = this.moveY(dX, dY);

	// check walk into object
	// check hazard below eg spikes / lava or pink skull 

	levelState.gameObject(this.x/16 |0, this.y / 16 | 0 ) ; // middle of body

	levelState.gameObject( this.x /16 | 0 , (this.y - this.height/2) / 16 | 0 );  // head
	levelState.walkedOverBadStuff(this.x /16 | 0 , (this.y + this.height/2) / 16 | 0 );  //lava, spikes etc.

	// check left of screen
	
	if(this.x-(this.width/2) < levelRenderer.camera.x){
		this.x = levelRenderer.camera.x + (this.width/2);
	}
	// check right of screen
	if(this.x+(this.width/2) > levelRenderer.mapWidth()*16){
		this.x = (levelRenderer.mapWidth()*16)- (this.width/2);
	}
	// check bottom of screen
	if(this.y + (this.height/2) > levelRenderer.mapHeight()*16){
		this.y = (levelRenderer.mapHeight()*16)-(this.height/2);
	}
}


Player.prototype.punchDetection = function(){	
	var punchX = (this.x + (this.width/2 * this.dir) + (8 * this.dir) ) / 16 | 0;

	levelState.punchTile(punchX, this.y/ 16 | 0);
}

Player.prototype.calcFriction = function(){
	if(!this.onGround) {
		if (!this.left && !this.right){
			if(this.xVel > 0 ){
				this.xVel -= .0425;
			}
			if(this.xVel < 0){
				 this.xVel += .0425;
			}
		}
	}
}

Player.prototype.calcGravity = function(){
	if(!this.onGround){
		this.yVel+=.25;
	}
	if(this.yVel > 3.5){
		this.yVel = 3.5;
	}
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
		if( tileX1 ) {
			levelRenderer.addToHighLights(ax, yTop, "#FDB1B1");
		}
		if( tileX2 ) {
			levelRenderer.addToHighLights(ax, yBotttom, "#FDB1B1");
		}

		if(tileX1 || tileX2){ // collision
			tempX = (ax * 16) - (this.width/2);

			if(!this.onGround){
				this.xVel = 0;
			}
			
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
			levelRenderer.addToHighLights(ax, yTop, "#9BF0E9");
		}
		if( tileX2) {
			levelRenderer.addToHighLights(ax, yBotttom, "#9BF0E9");
		}

		if(tileX1 || tileX2 ){ 
			tempX = ( (ax+1) * 16) + (this.width/2) ; // 

			if(!this.onGround){
				this.xVel = 0;
			}
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
			levelRenderer.addToHighLights(left, ay, "#9BF0E9");
		}
		if( rightTile) {
			levelRenderer.addToHighLights(right, ay, "#9BF0E9");
		}

		if(leftTile || rightTile){
			tempY = ( (ay+1) * 16) + (this.height/2) + 1;
			this.maxJumpReached = true;
			this.yVel = .125;
			this.jumpTime = 0;
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
			levelRenderer.addToHighLights(left, ay, "#EDE5E2");
		}
		if( rightTile) {
			levelRenderer.addToHighLights(right, ay, "#EDE5E2");
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

Player.prototype.coords = function(){
	var str = "x :" + (this.x /16 | 0);
	str += " y : " + (this.y / 16 | 0);
	return str;
}

Player.prototype.draw = function(ctx, camera) {

	ctx.fillStyle = "red";
	if(keys["down"]){
		ctx.fillRect(this.x - this.width/2 - camera.x, this.y - camera.y, this.width, this.height/2);
	}else{
	// 	ctx.fillRect(this.x - this.width/2- levelRenderer.camera.x, this.y - this.height/2 - (levelRenderer.camera.y  ) , this.width, this.height);
	}
	// draw rectangle shape of fist of doom


	/**
	 * Punchgin
	 */ 
	if(this.punchTime>0){
		// ctx.fillRect(this.x + ( this.width/2 * this.dir  ) - levelRenderer.camera.x, this.y - this.height/2 +4 - levelRenderer.camera.y, 8 * this.dir, 10 );
		var punchFrame = 112;
		if(this.dir==-1){
			punchFrame = 136;
			ctx.drawImage(this.image, punchFrame, 0, 24, 24, this.x - this.width - camera.x -4, this.y - this.height/2  - camera.y - 4, 24, 24);
		}else{
			ctx.drawImage(this.image, punchFrame, 0, 24, 24, this.x - this.width - camera.x +2, this.y - this.height/2  - camera.y - 4, 24, 24);
		}
	} 
	/**
	 * Jumping
	 */
	else if(this.jumping || this.yVel > 0){
		var frame = 16 * (this.dir== 1 ? 6 : 14 );
		ctx.drawImage(this.image, frame, 0, 16, 24, this.x - this.width - camera.x + 2, this.y - this.height/2  - camera.y - 4, 16, 24);
	} 
	/**
	 * walking
	 */
	else if( Math.abs(this.xVel) >0) {
		this.drawWalking(ctx, camera);
	} else {
	/**
   	 *	standing still
 	 */	
 	 	var frame = (this.dir==1 ? 1 : 0)
		ctx.drawImage(this.image, frame*16, 0, 16, 24, this.x - this.width - camera.x + 2, this.y - this.height/2  - camera.y - 4, 16, 24);
	}
};

Player.prototype.drawWalking = function(ctx, camera){
	var drawFrame = this.counter + (this.dir==1 ? 2 : 10);
	ctx.drawImage(this.image, drawFrame*16, 0, 16, 24, this.x - this.width - camera.x + 2, this.y - this.height/2  - camera.y - 4, 16, 24);	
}
