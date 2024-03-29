define(['./Enemy'],function(Enemy){


	function Frog(x, y){

		this.width = 16;
		this.height = 24;

		this.x = (this.width / 2 )  + x * 16;
		this.y = (this.height / 2 ) + y * 16 - 7;

		this.yvel = 0;
		this.jumping = false;
		this.jumpStart = this.y;
		this.pauseTimer = 0;

		this.imagesrc = {
			x : 0,
			y : 64
		};
	}

	Frog.prototype = new Enemy();


	Frog.prototype.move = function(levelState){
		var maxHeight = 4;
		var map = levelState.map;
		
		if(!this.jumping){
			if(this.pauseTimer > 0) {
				this.pauseTimer--;
			} else {
				this.jumping = true;
				this.yvel = -3;
				this.jumpStart = this.y;	
			}
		}  else {
			this.yvel += 0.1;
			this.y += this.yvel;
		
			if(this.y > this.jumpStart){
				this.jumping = false;
				this.pauseTimer = 30;
			}
		}
	};

	Frog.prototype.getSpriteOffset = function(){
		return this.jumping ? 1 * this.width : 0;
	};

	Frog.prototype.isOnGround = function(levelState){



	};

	return Frog;
});