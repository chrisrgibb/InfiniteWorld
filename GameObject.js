// tile numbers
// 12 = big money
// 13 = small money

var GameObject = function(x, y, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this.timer = -1;
	this.tilenumber = 0;
	this.remove = false;
};

GameObject.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) ;
	var drawY = ( (this.y) - camera.y ) ; 
	levelRenderer.objectSheet.drawTile(this.tilenumber, drawX , drawY);
};

GameObject.prototype.process = function(player){
	// player.inventory.money += 10;
};

GameObject.prototype.update = function(){
	this.timer++;
	if(this.timer > 150){
		this.remove = true;
	}
};

function MoneyBag(x, y, tilenumber){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.cost = 0;
	if(tilenumber===undefined){
		this.tilenumber = 0;
		this.cost = 10;
	}else if(Math.random()> 0.5){
		this.tilenumber =0;
		this.cost = 20;
	} else {
		this.tilenumber = 1;
		this.cost = 10;
	}

}

MoneyBag.prototype = new GameObject();

MoneyBag.prototype.process = function(player){
	player.inventory.money += this.cost;
	this.remove = true;
}

function RiceBall(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = -1;
	this.tilenumber = 4;

}

RiceBall.prototype = new GameObject();

RiceBall.prototype.process = function(){
	alert("End levelRenderer!!!");
	this.remove = true;
}

	/***
	 *	RING
	 * 
	 ***/

function Ring(x, y){
	this.x = x*16;
	this.y = y*16;
	this.timer = 0;
	this.tilenumber = 2;
}

Ring.prototype = new GameObject();

Ring.prototype.process = function(player){
	player.inventory.ring = true;
	this.remove = true;
}

function Life(x, y){
	this.x = x * 16;
	this.y = y * 16;
	this.timer = 0;
	this.tilenumber = 3;
}

Life.prototype = new GameObject();

Life.prototype.process = function(player){
	player.inventory.lives += 1;
	this.remove = true;
}

	/*
	 * GHOST!!
	 *
	 */

function Ghost(x, y){
	this.color = "#adadff";
	this.x =  8+ x * 16;
	this.y =  8 + y *16;
	this.width = 16;
	this.height = 16;
	this.timer = 0;
	this.speed = 0.5;
	this.playerDead = false;

}

Ghost.prototype = new GameObject(); // could probably change to enemy if 
									// i renamed the enemy move function to update

Ghost.prototype.update = function(){
	this.timer++;
	this.move();
	if(!isOnScreen(levelRenderer.camera, this)){
		this.remove = true;
	}
}	

Ghost.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) ;
	var drawY = ( (this.y) - camera.y ) ; 
	ctx.fillStyle = this.color;
	enemySheet.draw(0, drawX- this.width/2, drawY- this.width/2, this.width, this.height);	
}

Ghost.prototype.process = function(){
	if(this.timer > 50){
		this.playerDead = true;
	}
}	

Ghost.prototype.move = function(){
	if(this.timer < 50){
		return;
	}
	var destX = player.x;
	var destY = player.y;
	if(this.playerDead){ 
		this.y += this.speed;
	} else {
		if(destX > this.x){
			this.x += this.speed;
		}else if(destX < this.x){
			this.x -= this.speed;
		} 
		if(destY < this.y){
			this.y -= this.speed;
		}else if(destY > this.y){
			this.y += this.speed;
		}

	}

	
	// do nothing

}


//  Shockwave Protectile

function ShockWave(){
	this.x = 0;
	this.y = 0;
	this.speed = 4;
	this.dir = 1;
	this.timer = 0;
	this.ShockWave = true;
	if(this.dir > 0){
		this.tilenumber = 12 ;
	} else {
		this.tilenumber = 13 ;
	}
	this.dead = true;
}

ShockWave.prototype.launch = function(x, y, dir){
	this.dead = false;
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.timer = 0;
	if(this.dir > 0){
		this.tilenumber = 12 ;
	} else {
		this.tilenumber = 13 ;
	}
}

ShockWave.prototype.update = function(){
	if(!this.dead){
		this.x += this.dir * this.speed;
	}
	if(!isOnScreen(levelRenderer.camera, this)){
		this.dead = true;
	}
}

ShockWave.prototype.draw = function(camera){
	var drawX = ( (this.x) - camera.x ) - 8 ;
	var drawY = ( (this.y) - camera.y ) -7 ; 
	levelRenderer.objectSheet.drawTile(this.tilenumber, drawX , drawY);
}

ShockWave.prototype.process = function(){
	console.log("Sohockwave process");
} 


