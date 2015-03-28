function Section(start, width, noise, tilecreater, height) {
	this.chunks = [];
	this.x = start;
	this.width = width;
	this.noise = noise;
	this.height = height;
	this.typeOfChunk = "randomChunk";
	this.tilecreater = tilecreater;
	this.blocks = [];
	this.groundLevel = 10;

};




Section.prototype.createChunks = function(type){
	if(type==null){
		this.createPlatforms();
		this.gap(this.x, 10);
	} else if( type == "gap"){
		this.gap(this.x, 5);
	} 
};

Section.prototype.createPlatforms = function(){
	// setup 
	var i = this.x,
		end = this.x + this.width,
		currentHeight = 7,
		noise = this.noise,
		gapBetween = 3;//noise.nextInt(0,3);

	this.getOdds();

	// this.platform(i, 4, currentHeight);
	while(i < end){
		var width = noise.nextInt(1, 4);
		var gap = noise.nextInt(1, gapBetween);
		// this.platform(i, width, currentHeight);
		new Platform(i, currentHeight, width).create(this.tilecreater);

		i = i + width + gap;
		currentHeight -= noise.nextInt(1, 2);
	}
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

Section.prototype.gap = function(x, maxLength) {
	var gap = new Gap(x, 10, 4, 2);
	gap.create(this.tilecreater);
};


Section.prototype.randomTile = function(){
	var odds = this.noise.nextInt(0, 7);
	if(odds < 6){
		return 11; // breakable
	}
	if(odds < 7){
		return 9; // star
	}
}
