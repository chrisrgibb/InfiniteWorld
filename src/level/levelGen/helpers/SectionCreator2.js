define(function(){
	var SectionCreator = function (tiles) {
		this.tiles = tiles;


	};

	SectionCreator.prototype = {

		/**
		*  takes a 1d array and applies it to the map
		*
		*/
		applyArray : function(array, destX, destY){
			// var num = array.length;
			for(var i = 0; i < array.row.length; i++){
				if(array.y >= this.tiles.length){
					return;
				}
				var a = array.row[i];

				this.tiles[array.y][array.x + i] = a;
			}	
		},
		apply : function(piece){
			var destX = piece.x;
			var destY = piece.y;
			var arrays = piece.rows;
			arrays.forEach(function(array, i, arrays){
				this.applyArray(array, destX, destY);

			}, this);

		}

	};
	return SectionCreator;
});