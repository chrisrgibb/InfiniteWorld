define(['./Enemy'],function(Enemy){


	function Scorpion(x, y){
		// Enemy.call(this);
		this.color = '#ff0303';

		this.width = 16;
		this.height = 14;

		this.x = (this.width / 2 ) + x * 16;
		this.y = (this.height / 2 ) + y * 16 + 2;

		this.imagesrc = {
			x : 0,
			y : 32
		};
	}

	Scorpion.prototype =  new Enemy();

	Scorpion.prototype.move = function(levelState){
		// TODO fix
		var map = levelState.map;
		var dX = this.dir * this.speed;
		if(dX < 0){
			if(map.isBlocking((this.x + dX - (this.width/2) ) /16 | 0, this.y  /16 | 0 )/* or if scorpion is about to fall off block */ ){
				this.dir *= -1;
				this.block = true;
			}
			// stop the scorpion from going off edge of block		
			if(!map.isBlocking((this.x + dX - (this.width/2)) / 16 | 0, (this.y / 16 | 0 )+1)){
				this.dir = 1;
			}

		} else if(dX > 0){
			if(map.isBlocking( (this.x + (this.width/2) + dX ) / 16 | 0, this.y  / 16 | 0)){
				this.dir *= -1;
			}
				// stop the scorpion from going off edge of block
			if(!map.isBlocking((this.x + dX + (this.width/2)) / 16 | 0,   (this.y / 16 | 0 ) + 1 )){
				this.dir = -1;
			}
		}
		this.x += dX;
		// stop going off edge of screen
		if(this.x < 0 ){
			this.dir *= -1;
			this.x = 2;
		}
	};

	return Scorpion;
})