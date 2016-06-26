define(function(require, exports, module){
	var Random = require('./utils/noise');
	var Map = require('../Map');
	var themes = require('./settings/themes');
	var CreateSections = require('./helpers/createsections');
	var Options = require('./settings/options');
	// var HeightCalculator = require('./helpers/heightcalculator')
	var TopDownLevel = require('./topdownlevel/topdownlevel');
	var Sidewayslevel = require('./sidewayslevel')

	/**
	*	MAIN LOOP
	*   calls all the functions to create a new map and returns it
	*
	* 
	*/

	var rand = new Random(3);
	/**
	 * @param  {any} mapOptions
	 */
	function createNewMap(mapOptions){

		CreateSections.reset();

		// random seed used to calculate everything from
		var rand = new Random(mapOptions.seedValue);
			
		var start = Date.now();
		
		// this is where we create the level
		var levelData = buildMap(Options.theme, mapOptions, rand);
		var map = new Map(levelData);

		var end = Date.now();
		var seconds = (end - start) / 1000;
		console.log("took " + seconds + " seconds to generate");
		
		return {
			map : map,
			levelData : levelData
		};
	}

	/**
	 * @param  {any} theme
	 * @param  {any} seed
	 * @param  {any} direction
	 * @param  {any} rand
	 * @param  {any} options
	 */
	function buildMap(theme, options,rand) {
		if (options.direction === "vertical") { 
			return TopDownLevel.buildMap(theme, options, rand);
		}
		return Sidewayslevel.buildMap(theme, Options, rand);
	}

	module.exports = {
		createNewMap : createNewMap
	};
});


