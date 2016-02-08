define(function(){

	var gapAtStartOfLevel = 4;
	var groundLevel = 10;

	return {
		// could delete this? not used
		calcHeights : function(rand){
			var min = 3;
			var max = 4;
			var nodes = []
			var index = gapAtStartOfLevel;
			// the height is worked out from the ground up
			var maxHeight = 10 - 6;
			var minHeight = 10;

			var stepsHeight = 3;

			var lastNode = {
				x : index,
				y : 10
			};

			while(index < length){

				var newheight = rand.nextInt(0, 2) - 1;

				var nextHeight = lastNode.y + (2 * newheight); 
				if(nextHeight > minHeight){
					nextHeight = minHeight;
				}
				

				var node = {
					x : index,
					y : nextHeight
				};
				lastNode = node;

				nodes.push(node);
				index += rand.nextInt(min, max);
			}
			return nodes;

		},

		/*
		*	
		*
		*/
		getNewHeight : function(heights, size, rand){
			// am getting heights passed in, will change this later
			var len = heights.length,
				maxHeight = groundLevel - 6,
				minHeight = groundLevel;

			var delta = rand.nextInt(0, 2) - 1;

			var lastHeight = heights[len -1] 
			var nextHeight = lastHeight.y + (2 * delta);
			if(nextHeight > minHeight){
				nextHeight = minHeight;
			}
			var node = {
				x : size + lastHeight.x,
				y : nextHeight
			};
			heights.push(node);

			return node;
		}
	} 

});