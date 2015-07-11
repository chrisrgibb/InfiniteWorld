// tile numbers
// 12 = big money
// 13 = small money

var GameObject = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this.timer = -1;
	this.tilenumber = 0;
	this.remove = false;
	this.objectSheet = new ObjectSheet();
};

GameObject.prototype.draw = function(camera, ctx){
	var drawX = ( this.x - camera.x ) ;
	var drawY = ( this.y - camera.y ) ;
	this.objectSheet.drawTile(this.tilenumber, drawX , drawY, ctx);
};

GameObject.prototype.process = function(player){
	// player.inventory.money += 10;
};

GameObject.prototype.update = function(){
	this.timer++;
	if(this.timer > 150){
		this.remove = true;
	}
};