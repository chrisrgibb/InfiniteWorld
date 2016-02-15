define(function(){
	var ObjectSheet = function(){
		this.image = new Image();
		this.image.src ="images/items.png";
	};

	ObjectSheet.prototype.getImage = function(){

	};

	ObjectSheet.prototype.drawTile = function(tilenumber, x, y, ctx){
		if(tilenumber==null){
			return;
		}
		var xtoDraw = tilenumber % 8;
		var ytoDraw = tilenumber  / 8 | 0;
		ctx.drawImage(this.image, xtoDraw * 16 , ytoDraw * 16, 16, 16, x, y, 16, 16);
	};
	
	return new ObjectSheet();
});

