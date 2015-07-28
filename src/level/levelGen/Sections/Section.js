function Section(start, width, noise, tilecreater, height, difficulty) {
	this.chunks = [];
	this.x = start;
	this.width = width;
	this.noise = noise;
	this.height = height;
	this.typeOfChunk = "randomChunk";
	this.tilecreater = tilecreater;
	this.blocks = [];
	this.groundLevel = 10;
	this.difficulty = difficulty;

};


Section.prototype.createPlatforms = function(){
	// setup 
	var i = this.x,
		end = this.x + this.width,
		currentHeight = this.height,
		noise = this.noise,
		gapBetween = 3;//noise.nextInt(0,3);

	// create first gap

	while(i < end){
		var width = noise.nextInt(1, 4);
		var gap = noise.nextInt(1, gapBetween);
		// this.platform(i, width, currentHeight);
		if(i + width < end){
			this.blocks.push( new Platform(i, currentHeight, width) );
		}
		
		i = i + width + gap;
		currentHeight -= noise.nextInt(1, 2);
	}
}


Section.prototype.firstSection = function(){


}

Section.prototype.randomShape = function(){
	var shape = new RandomShape(this.x, 6, 4, this.noise);

	this.blocks.push(shape);
};


Section.prototype.createBox = function(){
	var sizes = [ { 
		h : 4,
		w  : 2
	},{
	 	h : 1,
	 	w : 4
	},{
		h : 3,
		w : 2
	}];
	var size = this.noise.nextInt(0, sizes.length - 1);

	var width = sizes[size].w,
		height = sizes[size].h;

	var startY = this.groundLevel - height;

	var box = new Box(this.x, startY, width, height);

	this.blocks.push(box);
};


Section.prototype.gap = function() {
	var y = 10, // ground level
		height = 2,
		width,
		gap;

	if(this.difficulty == 1){
		width = 1;
		gap = new Gap(this.x + 1, y, width, height);
		gap.create(this.tilecreater);
		gap = new Gap(this.x + 4, y, width, height);

	} else {
		width = this.noise.nextInt(1, this.width -1);
		gap = new Gap(this.x + 1, y, width, height);
	}

	this.blocks.push(gap);

};

Section.prototype.doBlocks = function(){
	this.blocks.forEach(function(block){
		block.create(this.tilecreater);
	}, this);
}

