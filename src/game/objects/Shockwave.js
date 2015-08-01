define(['../../graphics/ObjectSheet'], function(ObjectSheet){

	function ShockWave(){
		this.x = 0;
		this.y = 0;
		this.speed = 4;
		this.dir = 1;
		this.timer = 0;
		this.ShockWave = true;
		if(this.dir > 0){
			this.tilenumber = 12 ;
		} else {
			this.tilenumber = 13 ;
		}
		this.dead = true;
		this.objectSheet = ObjectSheet;
	}

	ShockWave.prototype.launch = function(x, y, dir){
		this.dead = false;
		this.x = x;
		this.y = y;
		this.dir = dir;
		this.timer = 0;
		if(this.dir > 0){
			this.tilenumber = 12 ;
		} else {
			this.tilenumber = 13 ;
		}
	};

	ShockWave.prototype.update = function(){
		if(!this.dead){
			this.x += this.dir * this.speed;
		}
		if(!isOnScreen(Game.camera, this)){
			this.dead = true;
		}
	};

	ShockWave.prototype.draw = function(camera){
		var ctx = document.getElementById('canvas').getContext('2d');
		var drawX = ( (this.x) - camera.x ) - 8 ;
		var drawY = ( (this.y) - camera.y ) -7 ;
		this.objectSheet.drawTile(this.tilenumber, drawX , drawY, ctx);
	};

	ShockWave.prototype.process = function(){
		console.log("Shockwave process");
	};

	return ShockWave;
})