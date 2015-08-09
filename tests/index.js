var requirejs = require('requirejs');

requirejs.config({

	nodeRequire: require
});

requirejs(['../src/level/levelgen/noise.js'],
function   (Random) {
    //foo and bar are loaded according to requirejs
    //config, but if not found, then node's require
    //is used to load the module.
    // console.log(foo);

    var rand = new Random(4);
    randomIntsShouldBeEvenlyDistributed(rand);

});

function randomIntsShouldBeEvenlyDistributed(rand){
	var range = 5,
		odds = {},
		percentages = {},
		sampleSize = 10000;


	for(var i = 0; i <= range; i++){
		odds[i] = 0;
	}


	for(var i = 0; i < sampleSize; i++){
		var randomNumber = rand.nextInt(0, range);
		odds[randomNumber]++;
	}
	var total = 0

	var mean = 20;

	var sum = 0;
	
	for(var key in odds){
		var percent = (odds[key] / sampleSize ) * 100;
		// var percent = odds[key]
		var deviation = (percent - mean) * (percent - mean);
		sum += deviation;
	}

	var variance = sum / range;

	var standardDeviation = Math.sqrt(variance)

	console.log(standardDeviation);




}