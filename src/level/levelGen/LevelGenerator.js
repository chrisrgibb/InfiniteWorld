// define(['./utils/noise', '../Map', './settings/themes','./helpers/createsections', './settings/options', './sidewayslevel', './topdownlevel/topdownlevel'],
// 	function(Random, Map, themes , CreateSections, Options, Sidewayslevel, TopDownLevel){

define(function(require, exports, module){
	var Random = require('./utils/noise');
	var Map = require('../Map');
	var themes = require('./settings/themes');
	var CreateSections = require('./helpers/createsections');
	var Options = require('./settings/options');
	var HeightCalculator = require('./helpers/heightcalculator')
	var TopDownLevel = require('./topdownlevel/topdownlevel');
	var Sidewayslevel = require('./sidewayslevel');

	/**
	*	MAIN LOOP
	*   calls all the functions to create a new map and returns it
	*
	* 
	*/

	var rand = new Random(3);

	function createNewMap(mapOptions, options2){

		CreateSections.reset();

		// random seed used to calculate everything from
		var seedValue = parseInt(mapOptions.seedValue),
			rand = new Random(seedValue),
			direction = mapOptions.direction || (parseInt(localStorage['infinite.alexkidd.direction']) || 0);

		var start = Date.now();
		
		// this is where we create the level
		var levelData = buildMap(Options.theme, seedValue, direction, rand, options2),
			map = new Map(levelData);

		var end = Date.now();
		var seconds = (end - start) / 1000;
		console.log("took " + seconds + " seconds to generate");
		
		return {
			map : map,
			levelData : levelData
		};
	}

	/**
	*
	*
	*/
	function buildMap(theme, seed, direction, rand, options) {
		if(direction === Options.direction.vertical || direction === "vertical"){
			return TopDownLevel.buildMap(theme, seed, Options, rand);
		}
		return Sidewayslevel.buildMap(theme, seed, Options, rand);
	}

	module.exports = {
		createNewMap : createNewMap
	};
});


