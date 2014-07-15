// tile numbers
// 12 = big money
// 13 = small money

var GameObject = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this.timer = -1;
	this.tilenumber = 0;
};

GameObject.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) ;
	var drawY = ( (this.y) - camera.y ) ; 
	level.objectSheet.drawTile(this.tilenumber, drawX , drawY);
}

GameObject.prototype.process = function(player){
	// player.inventory.money += 10;
}


function MoneyBag(x, y, tilenumber){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.cost = 0;
	if(tilenumber===undefined){
		this.tilenumber = 0;
		this.cost = 10;
	}else if(Math.random()> .5){
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
}


function Ring(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.tilenumber = 2;
}

Ring.prototype = new GameObject();

Ring.prototype.process = function(player){
	player.inventory.ring = true;
}

function Life(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.timer = 0;
	this.tilenumber = 3;
}
// function Life(x, y){}

Life.prototype = new GameObject();

Life.prototype.process = function(player){
	player.inventory.lives += 1;
}

