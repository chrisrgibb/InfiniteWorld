define(['../settings/odds'],function(OddsHelper){



	var iterate = function(array, start, end, fn){
		for(var i = start; i < end; i++){
			fn(array[i], i, array);
		}
	}


	// function createArrayRep(ledge){
	// 	var height = ledge.width;

	// 	var array = [];
	// 	for(var y = 0; y < ledge.width; y++){
	// 		var row = 
	// 		for(var x = 0; x < ledge.width-y; x++){
	// 			if(y === 0){
	// 				top.push(2);
	// 			} else {
	// 				top.push(5);
	// 			}
	// 		}
	// 	}


	// }



	function createArrayRepresentation(ledge){
		var height = ledge.width;

		var array = [],
			i, top =[];
		function startRowAt(currentY, ledge){
			if(ledge.side==="left"){
				return 0;
			}
			return currentY+ledge.x;
		}


		for(var y = 0; y < ledge.width; y++){
			top = [];
			for(var x = 0; x < ledge.width-y; x++){
				if(y === 0){
					top.push(2);
				} else {
					top.push(5);
				}
			}
			if(ledge.side === "right"){
				top[0] = y === 0 ? 1 : 4; 
			}
			if(ledge.side === "left"){
				top[top.length-1] = y === 0 ? 3 : 6;
			}

			array.push({
				row : top,
				y : ledge.y + y,
				x : startRowAt(y, ledge)
			});
		}

		if(ledge.side === "middle"){
			array[0][0] = 1;
			array[0][ledge.width-1] = 3;
		}
		if(ledge.side === "left"){
			array[0][ledge.width-1] = 3;
		}
		if(ledge.side ==="right"){
			array[0][0] = 1;
		}
		// array.push(top);
		return array;
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
		create : function(context, config){
			var odds = new OddsHelper({
				"left" : 4,
				"right" : 4,
				"middle" : 2
			}, context.rand);

			var x = context.rand.nextBool() % 2 === 0 ? 0 : 8;	
			// var y = (config && config.y != null) ? config.y : -1;
			var y = context.y;

			var ledge = {
				x : x,
				y : y,
				width : context.rand.nextInt(5, 8),
				height : 1,
				rows : [],
				side : odds.next()
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
	};

});