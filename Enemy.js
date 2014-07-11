var Enemy = function(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.image = new Image();
	this.width = 24;
	this.height = 16;
	this.dir = -1;
	this.speed = .3;
	this.blcok = false;
	this.color = "green";
	// this.color = 
}


Enemy.prototype.move = function(first_argument) {
	var dX = this.dir * this.speed;
	if(dX < 0){
		if(map.isBlocking((this.x + dX ) /16 | 0, this.y  /16 | 0 )){
			this.dir *= -1;
			this.blcok = true;

		}
	} else if(dX > 0){
		if(map.isBlocking( (this.x + this.width + dX ) / 16 | 0, this.y  / 16 | 0)){
			this.dir *= -1;
		}
	}
	this.x += dX;
	if(this.x < 0 ){
		this.dir *= -1;
		this.x = 2;
	}
	// body...

};

Enemy.prototype.draw = function(camera){
	var drawX = (this.x) - camera.x;
	var drawY = (this.y) - camera.y; 

	ctx.fillStyle = this.color;
	ctx.fillRect(drawX, drawY, this.width, this.height);		
}

function isEnemyOnScreen(camera, enemy){
	// console.log(level);
	var xWidth = camera.x + level.mapWidth() * 16;
	// var cameraHeight = (camera.y + level.mapHeight() * 16);
	var cameraHeight = (camera.y + level.screenHeight);
	var eX = enemy.x ;
	var eY = enemy.y ;

	if(eX > camera.x && eX <  xWidth){
		if(eY > camera.y && eY < cameraHeight ){
			
			return true;
		}
		
	}

	return false;
}


function Scorpion(x, y){
	Enemy.call(this);
	this.color = 'red';
	this.x = x * 16;
	this.y = y * 16 + 2;
	this.width = 13;
	this.height = 14;
	var g = true;

	while(g){

		if(map.getTile(this.x /16 | 0 , (this.y / 16 | 0)+1 )==0){
			this.y += 16;
		}else{
			g = false;
		}
	}
}


Scorpion.prototype = new Enemy();



Scorpion.prototype.move = function(){
	
	var dX = this.dir * this.speed;
	if(dX < 0){
		if(map.isBlocking((this.x + dX ) /16 | 0, this.y  /16 | 0 )/* or if scorpion is about to fall off block */ ){
			this.dir *= -1;
			this.blcok = true;

		}
		var tile = map.getTile((this.x + dX) / 16 | 0,   (this.y / 16 | 0 )+1  );
		console.log(tile);
		if(tile==0){
			this.dir = 1
		}
		// if(!map.isBlocking( (this.x + dX) / 16 | 0, (this.y / 16 | 0 )+1   ) ){
		// 	alert("eeks!!");
		// }


	} else if(dX > 0){
		if(map.isBlocking( (this.x + this.width + dX ) / 16 | 0, this.y  / 16 | 0)){
			this.dir *= -1;
		}
		var tile = map.getTile((this.x + dX + this.width) / 16 | 0,   (this.y / 16 | 0 )+1  );
		if(tile==0){
			this.dir = -1
		}
		console.log(tile);
	}
	this.x += dX;





	if(this.x < 0 ){
		this.dir *= -1;
		this.x = 2;
	}


	// body...
}

