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
		currentHeight = 7,
		noise = this.noise,
		gapBetween = 3;//noise.nextInt(0,3);

	// create first gap


	while(i < end){
		var width = noise.nextInt(1, 4);
		var gap = noise.nextInt(1, gapBetween);
		// this.platform(i, width, currentHeight);
		if(i + width < end){
			new Platform(i, currentHeight, width).create(this.tilecreater);
		}
		
		i = i + width + gap;
		currentHeight -= noise.nextInt(1, 2);
	}
}


Section.prototype.firstSection = function(){


}

Section.prototype.randomShape = function(){
	var shape = new RandomShape(this.x, 6, 4, this.noise);
	shape.create(this.tilecreater);

}

Section.prototype.createBox = function(){
	var height = 4, width = 2;
	var startY = this.groundLevel - height;

	var box = new Box(this.x, startY, width, height);
	box.create(this.tilecreater);
}

Section.prototype.gap = function() {
	var y = 10, // ground level
		height = 2,
		width,
		gap;

	if(this.difficulty == 1){
		width = 1;
		gap = new Gap(this.x + 1, y, width, height);
		gap.create(this.tilecreater);
		gap = new Gap(this.x + 3, y, width, height);

	} else {
		width = this.noise.nextInt(1, this.width -1);
		gap = new Gap(this.x + 1, y, width, height);
	}

	this.blocks.push(gap);
	
	gap.create(this.tilecreater);
	
};

