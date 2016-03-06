define(['../settings/odds'],function(OddsHelper){



	var iterate = function(array, start, end, fn){
		for(var i = start; i < end; i++){
			fn(array[i], i, array);
		}
	}

	function createMiddleLedge(ledge){
		var array = [],
			row;
			// example ledges
			// w = 4
			// h = 2
			// 1 2 3 4     0
			//   2 3       1

			// w = 5
			// h = 2
			// 1 2 3 4 5 0 
 			//   2 3 4   1
			//          
		var h = ledge.width -2;
		// force the ledge to a certain height so it doesn't look weird
		if(h > 4){
			h = 3;
		} else{
			h = 2;
		}
		if(ledge.width <= 3){
			h = 1;
		}

		for(var y = 0; y < h ;y++){
			row = [];

			for(var x = y; x < ledge.width - y; x++){
				// is it the top green tile or the brown one?
				var tileToPush = y === 0 ? 2 : 5;
				row.push(tileToPush);
			}
			// fix the sides
			row[0] = y === 0 ? 1 : 4; 
			row[row.length-1] = y === 0 ? 3 : 6

			array.push({
				row : row,
				y : ledge.y + y,
				x : y + ledge.x
			});
		}
		return array;
	}




	function createArrayRepresentation(ledge){
		if(ledge.side=="middle"){
			return createMiddleLedge(ledge);
		}

		var height = ledge.width;

		var array = [],
			i, top =[];
		function startRowAt(currentY, ledge){
			if(ledge.side==="left"){
				return 0;
			}
			return currentY + ledge.x;
		}

		if(height > 5) {
			height = 4;
		}

		for(var y = 0; y < height; y++){
			row = [];
			var isTopRow = y === 0;
			for(var x = 0; x < ledge.width-y; x++){
				// is it the top green tile or the brown one?
				var tileToPush = isTopRow ? 2 : 5;
				row.push(tileToPush);
			}
			if(ledge.side === "right"){
				row[0] = isTopRow ? 1 : 4; 
			}
			if(ledge.side === "left"){
				row[row.length-1] = isTopRow? 3 : 6;
			}

			array.push({
				row : row,
				y : ledge.y + y,
				x : startRowAt(y, ledge)
			});
		}

		if(ledge.side === "left"){
			array[0][ledge.width-1] = 3;
		}
		if(ledge.side ==="right"){
			array[0][0] = 1;
		}
		return array;
	}

	function createRandomLedge(context){
		var odds = new OddsHelper({
				"left" : 12,
				"right" : 13,
				"middle" : 18
			}, context.rand);


			var x = context.rand.nextBool() % 2 === 0 ? 0 : 8;	
			var y = context.y;

			var ledge = {
				x : x,
				y : y,
				width : context.rand.nextInt(3, 8),
				height : 1,
				rows : [],
				side : context && context.side ? context.side : odds.next()
			};

			var side = ledge.side;

			var mapWidth = context.mapWidth;
			if(side === "left"){
				ledge.x = 0;
			}
			if( side === "right"){
				ledge.x = mapWidth - ledge.width;
			}
			if(side === "middle"){
				ledge.x = Math.floor(mapWidth / 2) - (Math.floor(ledge.width / 2)); 
			}

			ledge.rows = createArrayRepresentation(ledge);

			return ledge;
	}
			

	return {	
		/*
		* Creates a ledge with 
		* @param context the generated level context
		* context has these propertys : 
			randomNumber generator
			minimum height 
			minimum length?


			possible generated ledge sizes  :  4 * 2, 5 * 2, 5 * 1, 2 * 1, 3 * 1, 4 * 1
			
		*/
		create : function(context){
			if(context.isRandom){
				var l = createRandomLedge(context);
				return l;
			} 
			var ledge = {
				x : context.x,
				y : context.y,
				width : context.width,
				height : 4,
				rows : [],
				side : context.side,
				previous : context.previous
			}

			//context : side

			ledge.rows = createArrayRepresentation(ledge);

			return ledge;
		
		}
	};

});