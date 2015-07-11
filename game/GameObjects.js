
function MoneyBag(x, y, tilenumber){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.cost = 0;
	if(tilenumber===undefined){
		this.tilenumber = 0;
		this.cost = 10;
	}else if(Math.random()> 0.5){
		this.tilenumber =0;
		this.cost = 20;
	} else {
		this.tilenumber = 1;
		this.cost = 10;
	}

}

MoneyBag.prototype = new GameObject();

MoneyBag.prototype.process = function(player){
	player.inventory.money += this.cost;
	this.remove = true;
};

function RiceBall(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = -1;
	this.tilenumber = 4;

}

RiceBall.prototype = new GameObject();

RiceBall.prototype.process = function(){
	alert("End levelRenderer!!!");
	this.remove = true;
};

	/***
	 *	RING
	 *
	 ***/

function Ring(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.tilenumber = 2;
}

Ring.prototype = new GameObject();

Ring.prototype.process = function(player){
	player.inventory.ring = true;
	this.remove = true;
};

function Life(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.timer = 0;
	this.tilenumber = 3;
}

Life.prototype = new GameObject();

Life.prototype.process = function(player){
	player.inventory.lives += 1;
	this.remove = true;
};




//  Shockwave Protectile

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
	if(!isOnScreen(levelRenderer.camera, this)){
		this.dead = true;
	}
};

ShockWave.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) - 8 ;
	var drawY = ( (this.y) - camera.y ) -7 ;
	levelRenderer.objectSheet.drawTile(this.tilenumber, drawX , drawY);
};

ShockWave.prototype.process = function(){
	console.log("Shockwave process");
};
