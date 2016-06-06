define(function(require){  


	return {
		/*
		* 
		*/
		create : function(x, y, width, direction) {
 	
 			// function to work out the x co-ordinate of the bottom vertice 
 			// of a ledge that is a symetrical or "middle" ledge
			var xcalc = {
				"left" : function(x, width) {
					return x;
				},
				"right" : function(x, width) {
					return x + width - 1;
				},
				"middle" : function(x, width) {
					return Math.floor(x + (width / 2));
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
					return y + Math.floor(width / 3);
				}
	 		};
	 		// creates a triangle v3 is the bottom vertex
	 		// v1   v2
	 		//
	 		//    v3

			var v1 = {
				x : x,
				y : y
			};
			var v2 = {
				x : x + width,
				y : y
			};
			var v3 = {
				x : xcalc[direction](x, width),
				y : ycalc[direction](y, width) + 1
			};
			return {
				x : v1.x,
				y : v1.y,
				v1 : v1,
				v2 : v2,
				v3 : v3,
				side : direction,
				width : width
			};
		}
	};

});