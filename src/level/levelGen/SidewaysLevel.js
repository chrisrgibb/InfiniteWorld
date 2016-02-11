define(['./helpers/createsections', './tilecreater', './settings/options', './helpers/heightcalculator', '../../game/enemies/enemyfactory', './helpers/helpers'],
function (SectionCreator, TileCreater, Options, HeightCalculator, Enemyfactory, Helpers){

	var rand,
	heights;
	/****
	*
	*
	*/
	function getSections(length){
		heights = [{
			x : Options.gapAtStartOfLevel,
			y : Options.groundLevel
		}];

		// var SectionHelper = new Helpers.SectionHelper

		// var sections = SectionHelper.createIndexs()

		var halp = new Helpers.SectionHelper(rand);


		var sizes = halp.createIndexs(length, 4, 9, Options.gapAtStartOfLevel);

		var lengths = [];
		var index = Options.gapAtStartOfLevel + rand.nextInt(0, 4);

		while(index < length){
			var oneLength = rand.nextInt(4, 9);

			var height = HeightCalculator.getNewHeight(heights, oneLength, rand);
			heights.push(height);

			lengths.push({
				x : index,
				length : oneLength,
				type : "",
				height : height
			});
			// make sure it doesn't overshoot the length of the level
			if(index + oneLength >  length) {
				oneLength = length - index;
			}
			index += oneLength;
		}

		return lengths;
	}

	/* takes in a object literal with a list of key and the ratios of those keys
	* examples   {
					"oil" : 20
					"water" : 10
				}

	  returns an object with random odds that looks like this
		{
			"oil"   : [0,   0.33333],
			"water" : [0.3333333, 1]
		}
	*
	*/ 

	function calculateOdds(config){
		var total = 0;
		var calculatedOdds = {};
		for (var key in config){
			total += config[key];
		}
		var lastValue = 0;
		for(var key in config){
			var value = config[key] / total;
			value += lastValue;
			calculatedOdds[key] = [lastValue, value];
			lastValue = value;
		}
		return calculatedOdds;
	}

	function getValueFromOdds(value, odds){
		for(var key in odds){
			var min = odds[key][0],
				max = odds[key][1];
			if(value >= min	&& value < max){
				return key;
			}
		}
		return null;
	}

	function addEnemy(section, enemies, height) {
		var groundLevel = 9;
		var y = height || groundLevel;
		
		// enemies.push(Enemyfactory.getScorpion(section.x+2, y));
		enemies.push(Enemyfactory.getFrog(section.x+2, y));
	}


	return {
		buildMap : function(theme, seed, options, randomgenerator){
			rand = randomgenerator;
			var height = Options.height,
				length = rand.nextInt(40, 80),
				tilecreater = new TileCreater(0,length,0, theme),
				withGround = true,
				tiles = tilecreater.getBlankMap(length, height, withGround);

			SectionCreator.setDefaults(theme, tilecreater, seed);

			var enemies = [];
			// splits level up into sections
			var sections = getSections(length);

			var len = sections.length;

			var myOdds = {
				0 : 10, // flat
				1 : 2, // gap
				2 : 3, // blob,
				3 : 2, //platform
				// 4 : 10 // random shit
			}


			for(var i = 0; i < len; i++){
				var section = sections[i];
				//debugger;
				var odds = calculateOdds(myOdds);
				var vallls = parseInt(getValueFromOdds(rand.nextNumber(0, 1), odds));

				var option = vallls;
				
				switch(option){
					case 0:
						// flat
						// max length 

						console.log("not gap");
						// decorate(section, tilecreater);
						SectionCreator.decorate(section.x, 12, section.length);
						addEnemy(section, enemies);

						section.type = "notgap";	
						break;	
					case 1:
						// gap
						// createGap(section, tilecreater);
						SectionCreator.createGap(section.x, 12, section.length);
						section.type = "gap";
						break;
					case 2:
						// 
						console.log("also not");
						// addBlobs(section, tilecreater);
						addEnemy(section, enemies);
						section.type = "blobs";
						break;
					case 3:
						// max lenght : 
						SectionCreator.createPlatform(section.x , 8, section.length);
						addEnemy(section, enemies, 8 -1);
						break;
					case 4:
						SectionCreator.createRandomIsh(section.x, 8, section.length);
						break;
					case 5:
						// simple sections
						// var height = heights[i];
						SectionCreator.createSimple(section.x, heights[i], section.length);
						break;
					case 6:
						SectionCreator.funkyShape(section.x, 12, section.length)
						// square shape
						break;	

					case 7:
						// CreateSections.apply2dNoise(section.x, 7, section.length);
						break;
					case 8:
						SectionCreator.heightMap(section.x, 8, section.length);
						break;
				}
			}
					
			var mapData =  {
				tiles : tiles,
				backgroundColor : theme.background,
				nodes : heights,
				length : length,
				sections : sections,
				enemies : enemies,
				direction : 0 // 0 for LR, 1 for topdown, 2 for RL, 3 for anything
			};

			return mapData;
		}
	}
})
