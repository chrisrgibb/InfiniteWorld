

var Noise = function(seed){
	//http://mrl.nyu.edu/~perlin/noise/
	//http://mrl.nyu.edu/~perlin/noise/
	var _randomSeed = seed;
	// _randomSeed = (_randomSeed * 9301 + 49297) % 233280;
	// var rnd = _randomSeed / 233280;
	return {
		nextNumber : function(minInt, maxInt){
			var max = maxInt || minInt;
			var min = maxInt ? minInt : 0;

			_randomSeed = (_randomSeed * 9301 + 49297) % 233280;
			var rnd = _randomSeed / 233280;
			return min + rnd * (max - min);
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

