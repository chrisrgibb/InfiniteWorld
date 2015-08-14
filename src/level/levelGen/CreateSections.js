define(['./createtiles'], 
	function(createtiles){


	var theme,
		height = 12;
		// tiles = new createtiles()

	return {
		createGap : function(startX, y, length){

			for(var y = height -2; y < height; y++){
				var tile = y === height -2 ? theme.hazard1 : theme.hazard2;
				for(var x = startX; x < startX + length; x++){
					tiles.setTile(tile, x, y);
				}
			}
		},

		createPlatform : function(startX, y, length){
			for(var x = startX; x < startX + length; x++){
				tiles.setTile(theme.unbreakable, x, y);
			}
		},


		decorate :function(startX, gy, length) {
			var decorDeets = theme.decorationRules();
			console.log("section length : ", length);

			var number = Math.floor(length / decorDeets.width);

			if(length > 4){
				var startHeight = height + decorDeets.heightOffset,
					groundLevel = height - 2,
					width = 4; // 4 tiles

				for(var i = 0; i < number; i++){
					var x = i * width + startX;
					drawDecoration(x);
				}

				 function drawDecoration(startX){
					for(var y = 0; y < decorDeets.height; y++){
						for(var x = 0; x < decorDeets.width; x++){

							var yy = y + startHeight, 
								xx = x + startX;

							// var tile = (decorDeets.tileNumber + y) * 16 + x;
							var tile = decorDeets.tileIndex + (y * 16) + x;
							// console.log(tile)
							tiles.setTile(tile, xx, yy);
						}
					}
				}
			}


		},
		setTheme : function(newtheme){
			theme = newtheme;
		},
		setTileCreater : function(tileCreater){
			tiles = tileCreater
		}
	};


});