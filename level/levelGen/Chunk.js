function Chunk(x, y, width, height) {
	var chunk = {
		x : x,
		y : y,
		width : width,
		height : height,
		children : [],
		parent : null,
		getChild: function(){
			if(this.children[0]!= null){
				return this.children[0];
			}
		}
	};

	// body...
	return chunk;
}
