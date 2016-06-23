/**
* The UI for the game
*/
define(function(require, exports, module) {

    var handlers = require('./eventhandlers');
    var controlPanel = require('./controlPanel');
    var Game = require('../game/Game');
    var Debugger = require('../extras/debugger');
    var optionsManager = require('../level/levelgen/useroptions');


 

    var topDownOptions = {
        startAt : 7,
        width : 16,
        height : {
            max : 100,
            min : 80    
        }
    };

    var userDefinedOptions = {
        direction : 1,
        seedValue : parseInt(localStorage['infinite.alexkidd.randomSeed']) || 6,
        isRandom : localStorage['infinite.alexkidd.generateRandomLevel'] === "true",
        isBozo : true,
        topDownOptions : topDownOptions
    };


    
    // 
    // Seed int  range slider and number input
    // horizontal or vertical boolean
    // generate random level
    module.exports = {
        /** 
         *  Sets up the eventhandlers and starts the Game
        */
        init : function () {
            window.debug = new Debugger();
		    window.Game = Game;
            
            handlers.init(optionsManager);

            Game.startGame(userDefinedOptions);
        }
    };
});