define(function (require) {
	var Block = require('../../block');


	// ways to place boxes
	// on a left or right ledge - make a random box

	function getRandomPoints(bb, rand){
		var x1 = rand.nextInt(0, bb.width-1);
		var y1 = rand.nextInt(0, bb.height-1);
		var x2 = rand.nextInt(x1, x1 + 3);
		var y2 = rand.nextInt(0, bb.height-1);

		var minX = Math.min(x1, x2);
		var maxX = Math.max(x1, x2);

		var minY = Math.min(y1, y2);
		var maxY = Math.max(y1, y2);

		return {
			x0 : minX,
			y0 : minY,
			x1 : maxX,
			y1 : maxY
		};
	}
	function plot(x0, y0, bb, tiles) {
		var x = bb.x + x0;
		var y = bb.y + y0;
		var odds = Math.random();
		if(tiles[y]){
			tiles[y][x] = odds > 0.2 ? 11 : Block.star;
		}

	}

	/*
		a line is {
			x0 : minX,
			y0 : minY,
			x1 : maxX,
			y1 : maxY
 		}

	*/
	function placeLine(line, boundingBox, tiles) {
		// bresenhams algorithm https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
		var dx = line.x1 - line.x0;
		var dy = line.y1 - line.y0;
		var error = 0;
		var deltaerr = Math.abs(dy / dx);
		var y = 0;
			// debugger;

		for(var x = line.x0; x < line.x1; x++) {
			error += deltaerr;
			plot(x, y, boundingBox, tiles);
			while( error > 0.5) {
				plot(x, y, boundingBox, tiles);
				y += Math.sign(line.y1 - line.y0);
				error = error - 1;
			}
		}

	}

	function doSquare(bb, ledge, tiles, rand){
		if(ledge.side === "left"){
			var x = rand.nextInt(1, 4);


			placeLine({
				x0 : x,
				y0 : 0,
				x1 : x+1,
				y1 : bb.height-2
			}, bb, tiles);
		} else {
			placeLine({
				x0:  bb.x,
				y0 : bb.y,
				x1 : bb.width-1,
				y1 : bb.height-1
			});
		}
	}


	return {
		placeBoxes : function(ledges, tiles, rand) {
		
			ledges.forEach(function(ledge, index){
				if(index !== 0) {

					var boundingBox = { 
						x : ledge.x, 
						y :  ledge.y - 2,
						width : ledge.width,
						height : 4 
					};
					var randomLine = getRandomPoints(boundingBox, rand);
					// straightRandom(boundingBox, ledge, tiles, rand);
					// placeLine(randomLine, boundingBox, tiles);
					// doSquare(boundingBox, ledge, tiles, rand);
					for(var i = ledge.x; i < ledge.x + ledge.width-1; i++){
						if(rand.nextInt(0, 10) < 1 && tiles[boundingBox.y] ) {
							tiles[boundingBox.y][i] = 11;
						}
						
					}


				}	
				// place box on it
			});
		}
	};
});