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
			for(var i = 0; i < array.length; i++){
				var a = array[i];
				this.tiles[destY][destX + i] = a;
			}	
		},
		apply : function(piece){
			var destX = piece.x;
			var destY = piece.y;
			var arrays = piece.array;
			arrays.forEach(function(array){
				this.applyArray(array, destX, destY);

			}, this);

		}

	};
	return SectionCreator;
});