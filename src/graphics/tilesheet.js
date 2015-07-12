define(function(){
	var TileSheet = function(){
		this.image = new Image();
		this.image.src ="images/tiles2.png";
	}

	TileSheet.prototype = {
		getImage : function(){},
		
		drawTile : function(tilenumber, x, y, ctx){
			var xtoDraw = tilenumber % 16	;
			var ytoDraw = tilenumber / 16 | 0;

			ctx.drawImage(this.image, xtoDraw*16 , ytoDraw*16, 16, 16, x, y, 16, 16);
		}
	}

	return TileSheet;
});

