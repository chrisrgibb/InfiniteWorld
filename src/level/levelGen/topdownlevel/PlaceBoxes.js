define(function (require) {
	

	return {
		placeBoxes : function(ledges, tiles, rand) {
			ledges.forEach(function(ledge){
				// find area around ledge

				var w = rand.nextInt(0, ledge.width-1);
				var x = ledge.x + w;
				var y = ledge.y - 1;
				if(y < tiles.length) {
					tiles[y][x] = 9;
				}
				// place box on it
			});
		}
	};
});