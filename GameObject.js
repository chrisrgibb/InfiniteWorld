// tile numbers
// 12 = big money
// 13 = small money

var GameObject = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this.timer = -1;
	this.tilenumber = 13;
};

GameObject.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) ;
	var drawY = ( (this.y) - camera.y ) ; 
	level.tileSheet.drawTile(this.tilenumber, drawX , drawY);
}


function MoneyBag(x, y, tilenumber){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	if(tilenumber===undefined){
		this.tilenumber = 12;
	}else if(Math.random()> .5){
		this.tilenumber =12;
	} else {
		this.tilenumber = 13;
	}

}

MoneyBag.prototype = new GameObject();

// MoneyBag.prototype.draw = function(camera){
// 	var drawX = ( (this.x) - camera.x ) ;
// 	var drawY = ( (this.y) - camera.y ) ; 
// 	level.tileSheet.drawTile(12, drawX , drawY);
// }

// MoneyBag.prototype.update = 

function Ring(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
}

Ring.prototype = new GameObject();

