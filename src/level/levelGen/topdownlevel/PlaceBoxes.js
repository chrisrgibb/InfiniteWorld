define(function (require) {
	

	return {
		placeBoxes : function(ledges, tiles, rand) {
			ledges.forEach(function(ledge){
				// find area around ledge
				var startY = ledge.y - rand.nextInt(3, 4);

				// for (var i = 0; i < ledge.width; i++) {
				// 	for (var y = )
				// 	var x = ledge.x + i;

				// }
				var w = rand.nextInt(0, ledge.width-1);
				var h = rand.nextInt(0, 4);
				var x = ledge.x + w;
				var y = ledge.y - h;
				if(y < tiles.length) {
					tiles[y][x] = 9;
				}
				
				// place box on it

			});

		}
	}


});