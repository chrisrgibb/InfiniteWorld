

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

