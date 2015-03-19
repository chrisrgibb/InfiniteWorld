

var Noise = function(seed){
	//http://mrl.nyu.edu/~perlin/noise/
	var _randomSeed = seed || 6;
	// _randomSeed = (_randomSeed * 9301 + 49297) % 233280;
	// var rnd = _randomSeed / 233280;
	return {
		nextNumber : function(minInt, maxInt){
			var max = maxInt || minInt;
			var min = maxInt ? minInt : 0;
			_randomSeed = (_randomSeed * 9301 + 49297) % 233280;
			var rnd = _randomSeed / 233280;
			return Math.round(min + rnd * (max - min));
		},
		nextInt : function(minInt, maxInt){
			return Math.round(this.nextNumber(minInt, maxInt));
		},
		nextBool : function(){
			return Math.round(this.nextNumber(0,1))===1;
		}
	};
};


Noise.seed = 6;

function RandomNess(max, min){
	max = max || 1;
	min = min || 0;

	Noise.seed = (Noise.seed * 9301 + 49297) % 233280;
	var rnd = Noise.seed / 233280;
	return min + rnd * (max - min);
}

function PerlinNoise(){
	this.lerp = function(a, b, w){
		return (1 - w) * a + w * b;
	}

	this.perlin = function(x, y, z){
		var X = Math.floor(x) & 255;
		var Y = Math.floor(y) & 255;
		var Z = Math.floor(z) & 255;
		x -= Math.floor(x);
		y -= Math.floor(y);
		z -= Math.floor(z);
		var u = this.fade(x);
		var v = this.fade(y);
		var w = this.fade(z);



		// var A = 
	}

	this.fade = function(t){
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	this.grad = function(hash, x, y, z){
		
	}
}


function markov(sequence, order){
	var table = {};
	var len = sequence.length - order;
	for(var i = 0; i< len; i++ ){

		var word=[];
		for(var j = i; j < i +order; j++){
			word.push(sequence[j]);
		}
		debugger;
	}
}

