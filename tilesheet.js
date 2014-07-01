var TileSheet = function(){
	this.image = new Image();
	this.image.src ="images/tiles2.png";
}

TileSheet.prototype.getImage = function(){

}

TileSheet.prototype.drawTile = function(tilenumber, x, y){
	var xtoDraw = tilenumber * 16;

	ctx.drawImage(this.image, xtoDraw , 0, 16, 16, x, y, 16	, 16);
}
