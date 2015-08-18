define(function(){

	var themes = 
	[{
		// second level
		groundTile : 18,
		hazard1 : 28,
		hazard2 : 27,
		breakable : 11,
		unbreakable : 20,
		background: "#0000ff",
		decorationRules: function(){
			return {
				tileIndex : 48,
				heightOffset : -5,
				width : 4,
				height : 3,
				tileNumber : 3
			}
		}
	},
	{
		// 4th level
		groundTile : 13,
		hazard1 : 23,
		hazard2 : 22,
		breakable : 21,
		unbreakable : 20,
		background: "#0000ff",
		decorationRules: function(){
			return {
				// different sizes of trees
				tileIndex : 52,
				heightOffset : -5,
				width : 1,
				height : 3,
				tileNumber : 3
			}
				
		}
	},
	{
		// level with bull
		groundTile : 13,
		hazard1 : 28,
		hazard2 : 27,
		breakable : 11,
		unbreakable : 12,
		background: "#0000ff",
		decorationRules: function(){
			return {
				heightOffset : -5,
				width : 4,
				height : 3,
				tileNumber : 3
			}
				
		}
	},
	{
		// forest
		groundTile : 13,
		hazard1 : 42,
		hazard2 : 41,
		breakable : 40,
		unbreakable : 39,
		background: "#005200",
		decorationRules: function(){
			return {
				heightOffset : -5,
				width : 4,
				height : 3,
				tileNumber : 3
			}
		}
	}];

	return themes;

});
