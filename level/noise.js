function getRandomNoise(size){
	var tiles = randomValues(1, size);
	return smoothSample(tiles);
}

var Noise = function(seed){
	//http://mrl.nyu.edu/~perlin/noise/
	//http://mrl.nyu.edu/~perlin/noise/
	var _randomSeed = seed;
	// _randomSeed = (_randomSeed * 9301 + 49297) % 233280;
	// var rnd = _randomSeed / 233280;
	return {
		nextNumber : function(num){
			var max = num | 1;
			_randomSeed = (_randomSeed * 9301 + 49297) % 233280;
			var rnd = _randomSeed / 233280;
			return rnd * max;
		}
	};
};

function randomValues(interval, size){
	var stepsize = 1;
	if(interval > 2){
		stepsize = size / interval;
	}
	var noise = get2dArray(size); // 2d array filled with 0s;
	for(var i = 0; i < size; i++ ){
		for(var j = 0; j < size; j++){
			var sample = Math.random();

			noise[i][j] = sample;
		}
	}
	return noise;
}



// assumes  n * n 2d array
function smoothSample(noise){
	var size = noise.length;
	var samples = get2dArray(size);

	for(var y = 1; y< size-1; y++){
		for(var x = 1; x < size-1; x++){
			var corners = (noise[y-1][x-1] + noise[y-1][x+1] +
						   noise[y+1][x-1] + noise[y+1][x+1]) / 16;
			var sides =  (noise[y][x-1]   + noise[y][x+1] + noise[y+1][x] + noise[y-1][x] ) /8; 
			var center = noise[y][x] /4;

			samples[y][x] =corners + sides + center;
		}
	}
	return samples;
}

Noise.seed = 6;

function RandomNess(max, min){
	max = max || 1;
	min = min || 0;

	Noise.seed = (Noise.seed * 9301 + 49297) % 233280;
	var rnd = Noise.seed / 233280;
	return min + rnd * (max - min);
}


function lerp(a, b, c){
	return (1-t) * a + t*b;

}