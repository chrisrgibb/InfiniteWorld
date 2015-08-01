
define(['../../graphics/camera', './Inventory','./movecomponent', './playerphysics'], 
	function(camera, Inventory, movecomponent, playerphysics){


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
		this.gravity = 0.25;
		this.friction = 0.8;

		this.ctx = document.getElementById('canvas').getContext('2d');

		this.dir = 1;

		this.jiitersTime = 0;

		this.jumping = false;
		this.left = false;
		this.right = false;
		this.onGround = false;
		this.canJump = true;
		this.blocked = false;
		this.deadTime = 0;

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

		// for animation
		this.frameIndex = 0;
		this.counter =0;

		this.money = 0;
		this.inventory = new Inventory();
		this.shockwaveOnscreen = false;
		this.braceletActivated = false;
		this.oldYvel =0;

		this.maxJumpReached = false;

		this.movecomponent = movecomponent;
		this.punchX = 0;
	}

	Player.prototype.move = function(levelState) {
		var levelRenderer = Game.levelRenderer,
			dX = 0, 
			dY = 0;

		if(this.deadTime === 0){
			this.movecomponent.calculateMovement(this);
	
			// round down to zero
			if( Math.abs(this.xVel) < 0.01){
				this.xVel = 0;
			}

			if(COUNTER % 6 ===0){
				this.counter++;
				if(this.counter > 3){
					this.counter =0 ;
				}
			}

			playerphysics.calculate(this);

			dX = this.xVel;
			dY = this.yVel;

			this.doPunch(levelState);

			this.x = this.moveX(dX, dY, levelState);
			this.y = this.moveY(dX, dY, levelState);

			// check walk into object
			// check hazard below eg spikes / lava or pink skull

			levelState.checkForCollisions(this.x/16 |0, this.y / 16 | 0 ) ; // middle of body

			levelState.checkForCollisions( this.x /16 | 0 , (this.y - this.height/2) / 16 | 0 );  // head
			levelState.walkedOverBadStuff(this.x /16 | 0 , (this.y + this.height/2) / 16 | 0 );  //lava, spikes etc.

			// check left of screen

			if(this.x-(this.width/2) < camera.x){
				this.x = camera.x + (this.width/2);
			}
			// check right of screen
			if(this.x+(this.width/2) > levelState.map.getWidth()*16){
				this.x = (levelState.map.getWidth()*16)- (this.width/2);
			}
			// check bottom of screen
			if(this.y + (this.height/2) > levelState.map.getHeight() * 16){
				this.y = (levelState.map.getHeight() * 16) - (this.height/2);
			}

		} else {
			if(this.deadTime < 5){
				// respawn 

			} else {
				//debug.debugText2 = "Colideddd";
				this.y -= 1;
			}
			debug.debugText2 = "Dead";

			this.deadTime--;
		}
	};

	Player.prototype.setDead = function(){
		this.deadTime = 20;

	};

	Player.prototype.punchDetection = function(levelState){

		var punchX = (this.x + (this.width/2 * this.dir) + (8 * this.dir) ) / 16 | 0;

		this.punchX = punchX * 16;

		levelState.punchTile(punchX, this.y/ 16 | 0);
	};


	Player.prototype.moveX = function(dX, dY, levelState){
		var tempX = this.x,
				tileX1,
				tileX2,
				yTop,
				yBottom,
				nextX,
				ax,
				map = levelState.map;

		if( dX > 0){
			//moving right
			nextX = this.x + dX + (this.width/2); // the nextX
			ax =  nextX / 16 | 0; // the index of the next tile
			yTop = (1 + this.y - this.height/2) / 16 | 0;
			yBotttom = (-1 + this.y + this.height/2) / 16 | 0;

			if(nextX===tempX){
				return;
			}

			tileX2 = map.isBlocking(ax, yBotttom);
			tileX1 = map.isBlocking(ax, yTop);

			// For DEBUGGINS
			// if( tileX1 ) {
			// 	levelRenderer.addToHighLights(ax, yTop, "#FDB1B1");
			// }
			// if( tileX2 ) {
			// 	levelRenderer.addToHighLights(ax, yBotttom, "#FDB1B1");
			// }

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
			nextX = this.x + dX - (this.width/2) ;
			ax = nextX / 16 | 0; // index of the tile to the left

			yTop = 	   	(1 + this.y - this.height/2) / 16 | 0;
			yBotttom = 	(-1 + this.y + this.height/2) / 16 | 0;

			tileX2 = map.isBlocking(ax, yBotttom);
			tileX1 = map.isBlocking(ax, yTop);

			// if(tileX1) {
			// 	levelRenderer.addToHighLights(ax, yTop, "#9BF0E9");
			// }
			// if( tileX2) {
			// 	levelRenderer.addToHighLights(ax, yBotttom, "#9BF0E9");
			// }

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
	};


	Player.prototype.moveY = function(dX, dY, levelState){
		var tempY = this.y;
		var ay, left, right, leftTile, rightTile;
		var map = levelState.map

		if(this.jumping && dY < 0 ){

			ay = (this.y -(this.height/2) + dY ) /16 | 0;

			left  = (  1 + this.x - (this.width/2)  )/16   | 0;
			right = ( -1 + this.x + (this.width/2)  )/16   | 0;

			leftTile  = map.isBlocking(left, ay);
			rightTile = map.isBlocking(right, ay );


			// if(leftTile) {
			// 	levelRenderer.addToHighLights(left, ay, "#9BF0E9");
			// }
			// if( rightTile) {
			// 	levelRenderer.addToHighLights(right, ay, "#9BF0E9");
			// }

			if(leftTile || rightTile){
				tempY = ( (ay+1) * 16) + (this.height/2) + 1;
				this.maxJumpReached = true;
				this.yVel = 0.125;
				this.jumpTime = 0;
				dY = 1; // so we don't get stuck under block
				return tempY;
			} else {
				tempY += dY;
			}
		}

		// check down collisions

		else {
			ay = (this.y +(this.height/2) + dY) / 16 | 0;

			left = (this.x - (this.width/2)  +1 )     /16  | 0;
			right = (this.x + (this.width/2) - 1 ) /16   | 0;


			leftTile  = map.isBlocking(left, ay);
			rightTile = map.isBlocking(right, ay ); // the minus for is


			// if(leftTile) {
			// 	levelRenderer.addToHighLights(left, ay, "#EDE5E2");
			// }
			// if( rightTile) {
			// 	levelRenderer.addToHighLights(right, ay, "#EDE5E2");
			// }

			if((leftTile || rightTile )   ) {
				// hit the ground
				tempY = (ay * 16) - (this.height/2);

				this.onGround = true;
				this.jumping = false;

				if(!keys.jump){
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
	};

	Player.prototype.doPunch = function(levelState) {
		if(!keys.down && keys.punch && this.punchTime === 0 && this.canPunch){
			// start of punch

			this.punchDetection(levelState);
			this.punchTime = 8;
			this.canPunch = false;
			if(this.onGround){
				dX = 0;
				this.xVel = 0;
			}
		} else {
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
			} else if(!keys.punch) {
				this.canPunch = true;
			}
		}
	};

	Player.prototype.coords = function(){
		var str = "x :" + (this.x /16 | 0);
		str += " y : " + (this.y / 16 | 0);
		return str;
	};

	Player.prototype.getImage = function(ctx, camera) {
		if(this.punchTime > 0) {



		}
	}

	Player.prototype.draw = function(ctx, camera) {
		var frame;
		ctx.fillStyle = "red";
		if(keys.down){
			ctx.fillRect(this.x - this.width/2 - camera.x, this.y - camera.y, this.width, this.height/2);
		}else{
		// 	ctx.fillRect(this.x - this.width/2- levelRenderer.camera.x, this.y - this.height/2 - (levelRenderer.camera.y  ) , this.width, this.height);
		}
		// draw rectangle shape of fist of doom


		/**
		 * Punchgin
		 */
		if(this.punchTime>0){
			
			if(this.dir==-1){
				frame = 136;
				ctx.drawImage(this.image, frame, 0, 24, 24, this.x - this.width - camera.x -4, this.y - this.height/2  - camera.y - 4, 24, 24);
			}else{
				frame = 112;
				ctx.drawImage(this.image, frame, 0, 24, 24, this.x - this.width - camera.x +2, this.y - this.height/2  - camera.y - 4, 24, 24);
			}
		}
		/**
		 * Jumping
		 */
		else if(this.jumping || this.yVel > 0){
			frame = 16 * (this.dir== 1 ? 6 : 14 );
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
	 	 	frame = (this.dir==1 ? 1 : 0);
			ctx.drawImage(this.image, frame*16, 0, 16, 24, this.x - this.width - camera.x + 2, this.y - this.height/2  - camera.y - 4, 16, 24);
		}
	};

	Player.prototype.drawWalking = function(ctx, camera){
		var drawFrame = this.counter + (this.dir==1 ? 2 : 10);
		ctx.drawImage(this.image, drawFrame*16, 0, 16, 24, this.x - this.width - camera.x + 2, this.y - this.height/2  - camera.y - 4, 16, 24);
	};

	return new Player();

});

