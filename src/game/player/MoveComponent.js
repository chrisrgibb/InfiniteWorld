define(['./player'],function(player){

	var MoveComponent = function(){


	};

	function calculateJump(player){

		
	}

	function notJumping(player){
		return !player.jumping && player.canJump && player.onGround;
	}

	function slowDown(player){
		if(player.xVel > 0){
			if(player.onGround){
				player.xVel -= player.xspeedIncrease;
			}
		}
		if(player.xVel < 0){
			if (player.onGround){
				player.xVel += player.xspeedIncrease;
			}
			if(player.xVel > 0){
				player.xVel = 0;
			}
		}
	}

	// return 5;

	return {
		update : function(){
			MoveComponent.something = 4;
			return MoveComponent;
		},

		calculateMovement : function(player){
			if ( keys.jump ){

				if(notJumping(player)){
					// if(player.onGround){
						player.startXvel = player.xVel;
						player.maxJumpReached  = false;
						player.jumpStart = player.y;

						player.canJump = false;

						if(keys.left || keys.right ){
							// if moving give an extra little boost
							player.yVel = -2.25;
							player.startYvel = -2.750; //
							player.jumpTime =  21 + Math.abs(player.xVel)/2;// magic numbers
							player.jumpingXSpeed = player.xVel;
						} else {
							player.jumpTime = 22;
							player.yVel = -2.25;
							player.startYvel = -2.25;
						}
						player.jumping = true;
						player.onGround = false;

				} else {
					// now player is in mid air
					if(player.jumpTime > 0){
						player.yVel = player.startYvel;
					} else{
						player.yVel += 0.105;
					}
					player.jumpTime--;

				}
			} else {
				player.yVel += 0.105;
				player.jumpTime = 0;
			}

			debug.setText(player.xVel);

			if(player.left){
				//if player is on ground
				if(player.onGround){
					// stop moving
					if(player.xVel > 0){
						player.xVel = 0;
					}
					// move left
					if(player.xVel > -player.xSpeed){
						player.xVel-=player.xspeedIncrease;
					}
				} else {
					// in air
					if(player.startXvel < 0){
						if(player.xVel > -player.xSpeed){
							player.xVel-=player.xspeedIncrease;
						}
					}
					// changin direction
					if(player.startXvel >= 0){
						if(player.xVel > -player.xSpeed){
							player.xVel -= 0.0825;
						}
						// was going right
					}
				}

				player.dir = -1;

			} else if( player.right) {

				if(player.onGround){
					if(player.xVel< 0){
						player.xVel = 0;
					}
					// move left
					if(player.xVel < player.xSpeed){
						player.xVel+=player.xspeedIncrease;
					}
				} else {
					// in air
					if(player.startXvel > 0){
						if(player.xVel < player.xSpeed){
							player.xVel+=player.xspeedIncrease;
						}
					}
					// changin direction
					if(player.startXvel <= 0){
						if(player.xVel < player.xSpeed){
							player.xVel += 0.0825;
							// was going right
						}
					}
				}
				player.dir = 1;
			} else {
				// nothing is pressed so slow down
				slowDown(player);
			}
			// finally 
			this.xVel = Math.abs(this.xVel) > 0.01 ? this.xVel : 0;
		}
	};
});