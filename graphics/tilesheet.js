var TileSheet = function(){
	this.image = new Image();
	this.image.src ="images/tiles2.png";
}

TileSheet.prototype.getImage = function(){

}

TileSheet.prototype.drawTile = function(tilenumber, x, y, ctx){
	var xtoDraw = tilenumber % 16	;
	var ytoDraw = tilenumber / 16 | 0;

	ctx.drawImage(this.image, xtoDraw*16 , ytoDraw*16, 16, 16, x, y, 16, 16);

};


var EnemySheet = function(){
	this.image = new Image();
	this.image.src = "images/enemies.png";
}

var enemySheet = new EnemySheet();

EnemySheet.prototype.draw = function(tilenumber, x, y, width, height){
	var xtoDraw = tilenumber % width;
	var ytoDraw = tilenumber / height | 0;

	ctx.drawImage(this.image, xtoDraw* width, ytoDraw * height, width, height, x, y, width, height);
}