define(['../objects/gameobject'] ,function(GameObject){

	function Ghost(x, y){
		this.color = "#adadff";
		this.x =  8 + x * 16;
		this.y =  8 + y *16;
		this.width = 16;
		this.height = 16;
		this.timer = 0;
		this.speed = 0.5;
		this.playerDead = false;

	}

	Ghost.prototype = new GameObject(); // could probably change to enemy if
										// i renamed the enemy move function to update

	Ghost.prototype.update = function(){
		this.timer++;
		this.move();
		if(!isOnScreen(Game.camera, this)){
			this.remove = true;
		}
	};

	Ghost.prototype.draw = function(camera, ctx){
		var drawX = this.x - camera.x;
		var drawY = this.y - camera.y;
		ctx.fillStyle = this.color;
		enemySheet.draw(0, drawX - this.width/2, drawY - this.width/2, this.width, this.height);
	};

	Ghost.prototype.process = function(){
		if(this.timer > 50){
			this.playerDead = true;
		}
	};

	Ghost.prototype.move = function(){
		// pause for a few seconds before it starts moving
		if(this.timer < 50){
			return;
		}
		var destX = Game.player.x;
		var destY = Game.player.y;

		if(this.playerDead){
			this.y += this.speed;
		} else {
			if(destX > this.x){
				this.x += this.speed;
			}else if(destX < this.x){
				this.x -= this.speed;
			}
			if(destY < this.y){
				this.y -= this.speed;
			}else if(destY > this.y){
				this.y += this.speed;
			}

		}
		// do nothing

	};

	return Ghost;
});

	
