var GameObject = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
};


function MoneyBag(x, y, type){
	this.x = x*16;
	this.y = y*16;
	this.type = type;
}

MoneyBag.prototype = new GameObject();

MoneyBag.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) ;
	var drawY = ( (this.y) - camera.y ) ; 
	level.tileSheet.drawTile(12, drawX , drawY);
}


