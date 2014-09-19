function Camera(){

	this.x = 0;
	this.y = 0;
	this.minY = 0;

};


Camera.prototype.update = function(){
	// can't go backwards
	var newY = player.y - levelRenderer.screenHeight/2 | 0;
	if(newY > this.y){
		this.y = newY;
	}
	var newX = player.x - levelRenderer.screenWidth/2 | 0;
	if(newX > this.x){
		this.x = newX;
	}

	if(this.y < 0 ){
		this.y = 0;
	}
	if(this.y + levelRenderer.screenHeight > map.getHeight() * 16){
		this.y = map.getHeight() * 16 - levelRenderer.screenHeight;
	}

	if(this.x < 0){
		this.x = 0;
	}
	if(this.x + levelRenderer.screenWidth > map.getWidth() * 16){
		this.x = map.getWidth() * 16 - levelRenderer.screenWidth;
	}
};

