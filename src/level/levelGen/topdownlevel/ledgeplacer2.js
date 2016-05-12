define(function(require){ 


	/*
	* 
	*/
	function createLedge(x, y, width, direction){ 
		
		var xcalc = {
			"left" : function(x, width) {
				return x;
			},
			"right" : function(x, width) {
				return x + width - 1;
			},
			"middle" : function(x, width) {
				return Math.floor((x + width) / 2) + 1;
			}
		};

		var ycalc = {
			"left" : function(y, width) { 
				return y + 4;
			},
			"right" : function(y, width) {
				return y + 4;
			},
			"middle" : function(y, width) {
				return y + Math.ceil(width / 3);
			}
 		}
 		// creates a triangle v3 is the bottom vertex
 		// v1   v2
 		//
 		//    v3


		var v1 = {
			x : x,
			y : y
		};
		var v2 = {
			x : x + width-1,
			y : y
		};
		var v3 = {
			x : xcalc[direction](x, width),
			y : ycalc[direction](y, width) + 1
		};
		return [v1, v2, v3];
	} 


	/*
	* takes two arrays of 3 x,y coords representing a triangle
	* and returns the two closest points in those triangles and the distances between them
	*  
	*/
	function distanceBetween(ledge1, ledge2) {
		// get closest points
		var closest1, closest2;
		var closestDistance;

		for(var i = 0; i < ledge1.length; i++) {
			for(var j = 0; j < ledge2.length; j++) {
				var p1 = ledge1[i];
				var p2 = ledge2[j];
				var distance = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
				if(closestDistance == null) {
					closestDistance = distance;
				} else if(distance < closestDistance) {
					closest1 = p1;
					closest2 = p2;
					closestDistance = distance;
				}
			}
		}
		return {
			p1 : closest1,
			p2 : closest2,
			distance : closestDistance
		};
	}

	function addLeftLedges(y, mapDetails, rand, level) {
		var interval = y;
		var previousLedge = null;
		var ledges = [];
			// create left hand side ledges
		while (interval < mapDetails.height - 20) {
			var distance = interval + rand.nextInt(8, 14);  // y pos for next ledge


			var ledge = createLedge(0, distance, rand.nextInt(5, 8), "left");

			// var ledge = LedgePeice.create(0, distance, rand.nextInt(5, 8), "left");
			// ledge.aboveLedge = previousLedge;

			// level.add(ledge);
			interval = distance;
			previousLedge = ledge;
			ledges.push(ledge);
		}
		return ledges;
	}

	function addRightLedges(y, mapDetails, rand, level) {
		var interval = y;
 		var rightLedges = [];
 		while (interval < mapDetails.height) {
 			var width = rand.nextInt(5, 8);
 			var x = mapDetails.width - width;

 			var distance = interval + rand.nextInt(8, 16);  // y pos for next ledge


 			var ledge = createLedge(x, distance, width, "right");
 			if(ledge[2].y < 95){
				rightLedges.push(ledge);
 			}

 			interval = distance;

 		}
 		return rightLedges;
	}

	// need to create random ledges that aren't coupled to an x and y position, that we can specify later
	function createRandomLedges(startY, mapDetails, rand){
		var ledges = {
			'left' : [],
			'right' : [],
			'middle' :[]
		};
		var interval = startY;
		var N = 30;

		var sides = ['left', 'right', 'middle'];
		var index = 0;

		while (index < N) {
			var side = sides[rand.nextInt(3)];
			var width = rand.nextInt(3, 8);
			var ledge = createLedge(0, 0, width, side);
			ledges[side].push(ledge);
			index++;			
			// width is random, side is random
		}
		return ledges;
	}


	return {
		makeLedges : function(tiles, rand, theme, mapDetails){
			// make start ledge
			// 3 = 1
			// 4 = 1
			// 5 = 2
			// 6 = 2
			// 7 = 3
			// 8 = 3

			var ledges = [];



			var m = createLedge(6, 13, 3, "middle");
			var p = createLedge(1, 10, 5, "left"); // 5, 10 
			var q = createLedge(9, 9, 7, "right"); // 7, 9

			this.applyLedge(m, tiles);
			this.applyLedge(p, tiles);
			this.applyLedge(q, tiles);

			var distance = distanceBetween(p, q);
			var d1 = distanceBetween(m, q);
			var d2 = distanceBetween(m, p);

			// createRandomLedges(mapDetails.startY, mapDetails, rand);

			var ledges = addLeftLedges(10, mapDetails, rand);
			var rightLedges = addRightLedges(10, mapDetails, rand);



			rightLedges.forEach(function(l) {
				this.applyLedge(l, tiles);
			}, this);

			ledges.forEach(function(l) {
				this.applyLedge(l, tiles);
			}, this);


			// arra should = [0, 7, 5, 11];
		},
		/*
		*
		*
		*/
		applyLedge : function(ledge, tiles){
			//http://www.sunshine2k.de/coding/java/TriangleRasterization/TriangleRasterization.html
			var slope1 = (ledge[2].x - ledge[0].x) / (ledge[2].y - ledge[0].y);
			var slope2 = (ledge[2].x - ledge[1].x) / (ledge[2].y - ledge[1].y);
			
			var x1 = ledge[2].x;
			var x2 = ledge[2].x;
			for(var y = ledge[2].y; y > ledge[1].y; y--) {
				x1 -= slope1;
				x2 -= slope2;

				// is it the top of the ledge? then draw a green block
				var isTop = y == ledge[1].y+1;
				var start = Math.floor(x1);
				var end = Math.floor(x2);

				for (var x = start; x < end; x++) {
					tiles[y][x] = isTop ? 2 : 5;
				}
				if(slope1 !== 0) {
					// add a sloped piece on the left
					tiles[y][start] = isTop ? 1 : 4;
				}
				if(slope2 !== 0) {
					// add a sloped piece on the right;
					tiles[y][end] = isTop? 3 : 6;
				}
			}
		},

		getDirection : function(ledge) {
			if(ledge[0].x < ledge[2].x && 
			   ledge[1].x > ledge[2].x) {
				return "middle";
			}
			if(ledge[0].x === ledge[2].x) {
				return "left";
			}
			if(ledge[2].x == ledge[1].x) {
				return "right";
			}
		},
		

		getBoundingBox : function(ledge) {
			var minx, miny, maxx, maxy;

			for(var i = 0; i < ledge.length; i++) {
				var point = ledge[i];
				var x = point.x;
				var y = point.y;
				minx = (minx == null) ? x : Math.min(minx, x);
				miny = (miny == null) ? y : Math.min(miny, y);
				maxx = (maxx == null) ? x : Math.max(maxx, x);
				maxy = (maxy == null) ? y : Math.max(maxy, y);
			}	
			return {
				minx : minx,
				miny : miny,
				maxx : maxx,
				maxy : maxy
			}
		}
	}
	
});