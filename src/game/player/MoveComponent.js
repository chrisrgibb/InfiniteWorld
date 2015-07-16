define(['./player'],function(player){

	var MoveComponent = function(){


		debugger;

	}

	function calculateJump(player){

		
	}

	// return 5;

	return {
		update : function(){
			MoveComponent.something = 4;
			return MoveComponent;
		},

		calculateMovement : function(player){
				if ( keys.jump ){

			if(!this.jumping && this.canJump){
				if(this.onGround){
					this.startXvel = this.xVel;
					this.maxJumpReached  = false;
					this.jumpStart = this.y;

					this.canJump = false;

					if(keys.left || keys.right ){
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
			this.yVel += 0.105;
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
						this.xVel -= 0.0825;
					}
					// was going right
				}
			}

			this.dir = -1;

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
						this.xVel += 0.0825;
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

		}
	};
});